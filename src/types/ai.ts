export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  model?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type AIModel = 'claude' | 'openai' | 'grok';

export interface AIResponse {
  text: string;
  model: AIModel;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIService {
  name: string;
  model: AIModel;
  sendMessage: (message: string, apiKey: string) => Promise<AIResponse>;
}

export interface ChatConfig {
  selectedModel: AIModel;
  temperature?: number;
  maxTokens?: number;
} 