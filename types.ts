
export enum Severity {
  NONE = 'None',
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SEVERE = 'Severe'
}

export interface Doctor {
  name: string;
  address?: string;
  uri: string;
}

export interface DrugInteractionResult {
  drugs: string[];
  severity: Severity;
  interactionDescription: string;
  recommendation: string;
  sideEffects: string[];
  sources: string[];
  nearbyDoctors?: Doctor[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  severity?: Severity;
}
