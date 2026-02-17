
import React, { useState, useRef, useEffect } from 'react';
import { analyzeDrugInteractions, chatWithPharmacist, findNearbyDoctors, FileData } from '../services/geminiService';
import { DrugInteractionResult, Severity, ChatMessage, Doctor } from '../types';
import ChatInputBox from '../components/ChatInputBox';

const Dashboard: React.FC = () => {
  const [medications, setMedications] = useState<string[]>(['']);
  const [analysisResult, setAnalysisResult] = useState<DrugInteractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [suggestedDoctors, setSuggestedDoctors] = useState<Doctor[]>([]);
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleMedChange = (index: number, value: string) => {
    const newMeds = [...medications];
    newMeds[index] = value;
    setMedications(newMeds);
  };

  const addMedField = () => {
    setMedications([...medications, '']);
  };

  const removeMedField = (index: number) => {
    if (medications.length > 1) {
      const newMeds = medications.filter((_, i) => i !== index);
      setMedications(newMeds);
    }
  };

  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  const runAnalysis = async () => {
    const activeMeds = medications.filter(m => m.trim() !== '');
    if (activeMeds.length < 2) {
      alert("Please enter at least two medications to check for interactions.");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);
    setSuggestedDoctors([]);
    
    try {
      const result = await analyzeDrugInteractions(activeMeds);
      setAnalysisResult(result);

      if (result.severity === Severity.SEVERE) {
        setIsFetchingDoctors(true);
        try {
          const pos = await getUserLocation();
          const doctors = await findNearbyDoctors(pos.coords.latitude, pos.coords.longitude);
          setSuggestedDoctors(doctors);
        } catch (locErr) {
          console.error("Could not fetch location or doctors:", locErr);
          // Silently fail doctor suggestion if location isn't available
        } finally {
          setIsFetchingDoctors(false);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error analyzing medications. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() && !selectedFile) return;

    const currentFile = selectedFile;
    const currentInput = userInput;

    let displayMessage = currentInput;
    if (currentFile) {
      displayMessage = currentInput ? `${currentInput} [File: ${currentFile.name}]` : `[File: ${currentFile.name}]`;
    }

    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: displayMessage }];
    setChatMessages(newMessages);
    setUserInput('');
    setSelectedFile(null); 
    setChatLoading(true);

    try {
      let fileData: FileData | undefined;
      if (currentFile) {
        const base64 = await fileToBase64(currentFile);
        fileData = {
          data: base64,
          mimeType: currentFile.type
        };
      }

      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithPharmacist(currentInput, history, fileData);
      setChatMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error(err);
      setChatMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I'm having trouble processing that request. Please try again later." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.SEVERE: return 'text-red-500 bg-red-500/10 border-red-500/30';
      case Severity.MODERATE: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case Severity.MILD: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-green-500 bg-green-500/10 border-green-500/30';
    }
  };

  const getSeverityIcon = (sev: Severity) => {
    switch (sev) {
      case Severity.SEVERE: return 'dangerous';
      case Severity.MODERATE: return 'warning';
      case Severity.MILD: return 'info';
      default: return 'check_circle';
    }
  };

  return (
    <div className="pt-28 pb-12 min-h-screen px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Input & Results */}
      <div className="lg:col-span-7 space-y-6">
        <section className="bg-card-dark border border-border-dark rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white capitalize">medicine combination checker</h2>
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">v2.0 ENGINE</div>
          </div>
          
          <div className="space-y-4">
            {medications.map((med, idx) => (
              <div key={idx} className="relative group">
                <input 
                  type="text" 
                  value={med}
                  onChange={(e) => handleMedChange(idx, e.target.value)}
                  placeholder={`Medication name #${idx + 1}`}
                  className="w-full bg-slate-900 border-border-dark rounded-xl py-3 px-4 focus:ring-primary focus:border-primary text-white transition-all"
                />
                {medications.length > 1 && (
                  <button 
                    onClick={() => removeMedField(idx)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-red-500"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            ))}
            
            <button 
              onClick={addMedField}
              className="flex items-center gap-2 text-primary text-sm font-bold hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Add another medication
            </button>
          </div>

          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="w-full mt-8 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Analysing...</>
            ) : (
              <><span className="material-symbols-outlined">shield_with_heart</span> Check for Interactions</>
            )}
          </button>
        </section>

        {analysisResult && (
          <section className="bg-card-dark border border-border-dark rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Safety Analysis Report</h3>
                <p className="text-sm text-text-muted">Analyzed Medications: {analysisResult.drugs.join(', ')}</p>
              </div>
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold ${getSeverityColor(analysisResult.severity)}`}>
                <span className="material-symbols-outlined">{getSeverityIcon(analysisResult.severity)}</span>
                {analysisResult.severity} Risk
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Interaction Details</h4>
                <p className="text-white leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-border-dark/50">
                  {analysisResult.interactionDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">warning</span> Potential Side Effects
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.sideEffects.map((effect, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">medical_services</span> Clinical Recommendation
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{analysisResult.recommendation}"
                  </p>
                </div>
              </div>

              {/* High Risk: Suggested Doctors */}
              {analysisResult.severity === Severity.SEVERE && (
                <div className="pt-8 border-t border-border-dark/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">emergency</span> Suggested Nearby Doctors
                    </h4>
                    {isFetchingDoctors && (
                      <div className="flex items-center gap-2 text-[10px] text-text-muted">
                        <div className="w-3 h-3 border border-text-muted/30 border-t-primary rounded-full animate-spin"></div>
                        Finding help...
                      </div>
                    )}
                  </div>
                  
                  {suggestedDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {suggestedDoctors.map((doc, idx) => (
                        <a 
                          key={idx} 
                          href={doc.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group bg-slate-800/50 border border-border-dark p-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                              <span className="material-symbols-outlined">medical_services</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{doc.name}</p>
                              <p className="text-[10px] text-text-muted">Click for Directions</p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-text-muted text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  ) : !isFetchingDoctors && (
                    <p className="text-xs text-text-muted italic bg-slate-900/30 p-3 rounded-lg border border-border-dark/30">
                      We recommend seeking immediate medical advice. Please consult your local emergency services or primary care physician.
                    </p>
                  )}
                </div>
              )}

              <div className="pt-6 border-t border-border-dark/30">
                <h4 className="text-xs font-bold text-text-muted uppercase mb-3">Clinical Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.sources.map((source, idx) => (
                    <span key={idx} className="bg-slate-800 text-[10px] text-text-muted px-2 py-1 rounded border border-border-dark">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Right Column: Chatbot */}
      <div className="lg:col-span-5 flex flex-col h-[calc(100vh-9rem)]">
        <div className="bg-card-dark border border-border-dark rounded-2xl flex flex-col flex-grow overflow-hidden shadow-2xl">
          <div className="bg-slate-900 p-6 border-b border-border-dark flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
            </div>
            <div>
              <h3 className="text-white font-bold leading-none">AI Pharmacist Assistant</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1 animate-pulse">Online</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {chatMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">forum</span>
                <p className="text-sm">Ask any question about your medications, dosages, or general pharmaceutical concerns.</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                {msg.role === 'assistant' && (
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                  </div>
                )}
                <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-primary/20 text-white rounded-tr-none border-primary/30' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border-border-dark'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start gap-3">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                </div>
                <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-none border border-border-dark flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <ChatInputBox 
            value={userInput}
            onChange={setUserInput}
            onSubmit={handleChatSubmit}
            isLoading={chatLoading}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
