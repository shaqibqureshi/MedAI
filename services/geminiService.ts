
import { GoogleGenAI, Type } from "@google/genai";
import { DrugInteractionResult, Severity, Doctor } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const findNearbyDoctors = async (lat: number, lng: number): Promise<Doctor[]> => {
  const model = 'gemini-2.5-flash-lite-latest';
  
  const response = await ai.models.generateContent({
    model,
    contents: "Find 3 highly-rated general practitioners or emergency clinics near my current location for an urgent medical consultation.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });

  const doctors: Doctor[] = [];
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  
  if (chunks) {
    for (const chunk of chunks) {
      if (chunk.maps) {
        doctors.push({
          name: chunk.maps.title || 'Nearby Medical Center',
          uri: chunk.maps.uri,
          address: '' // Address often included in title or retrieved via URI
        });
      }
    }
  }

  // Fallback if grounding didn't return specific map chunks but text might contain info
  // though grounding chunks are preferred for URLs.
  return doctors.slice(0, 3);
};

export const analyzeDrugInteractions = async (drugs: string[]): Promise<DrugInteractionResult> => {
  const model = 'gemini-3-pro-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the drug interaction between the following medications: ${drugs.join(', ')}. 
    Act as a professional pharmaceutical safety expert. Check for clinical interactions, severity, and side effects.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          drugs: { type: Type.ARRAY, items: { type: Type.STRING } },
          severity: { 
            type: Type.STRING, 
            description: "Severity must be exactly one of: None, Mild, Moderate, Severe" 
          },
          interactionDescription: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
          sources: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["drugs", "severity", "interactionDescription", "recommendation", "sideEffects", "sources"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as DrugInteractionResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to analyze medications. Please try again.");
  }
};

export interface FileData {
  data: string;
  mimeType: string;
}

export const chatWithPharmacist = async (
  message: string, 
  history: { role: 'user' | 'assistant', content: string }[],
  file?: FileData
) => {
  const model = 'gemini-3-flash-preview';
  
  // Format history for generateContent (Gemini expects 'model' instead of 'assistant')
  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Create the new message parts
  const newParts: any[] = [];
  if (file) {
    newParts.push({
      inlineData: {
        data: file.data,
        mimeType: file.mimeType
      }
    });
  }
  
  // Always add text if it exists, or a default prompt if only a file is sent
  newParts.push({ text: message || (file ? "Please analyze this attached document/image in the context of pharmaceutical safety." : "") });

  // Add the current message to the contents
  contents.push({
    role: 'user',
    parts: newParts
  });

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: "You are MediSafe AI, a professional pharmaceutical assistant. Provide accurate medical information about drug interactions, dosages, and side effects. You can analyze images of prescriptions or medical reports if provided. Always remind the user to consult with a doctor for final medical decisions. Keep responses concise and clinical but friendly.",
    },
  });

  return response.text;
};
