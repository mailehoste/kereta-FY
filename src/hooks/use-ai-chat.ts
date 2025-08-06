import { useState, useCallback } from 'react';
import { Message, AIModel, AIResponse, ChatConfig } from '@/types/ai';
import { aiServices } from '@/lib/ai-services';
import { getAPIKeys } from '@/lib/firebase';

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ChatConfig>({
    selectedModel: 'claude',
    temperature: 0.7,
    maxTokens: 1000,
  });

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Get API keys from Firebase
      const apiKeys = await getAPIKeys();
      const selectedService = aiServices[config.selectedModel];
      
      if (!selectedService) {
        throw new Error(`AI service ${config.selectedModel} not found`);
      }

      const apiKey = apiKeys[config.selectedModel as keyof typeof apiKeys];
      if (!apiKey) {
        throw new Error(`API key for ${config.selectedModel} not found. Please configure your API keys in Settings.`);
      }

      const response: AIResponse = await selectedService.sendMessage(text, apiKey);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        model: response.model,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${errorMessage}`,
        isUser: false,
        timestamp: new Date(),
        model: config.selectedModel,
      };
      
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, [config.selectedModel]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<ChatConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  return {
    messages,
    isLoading,
    error,
    config,
    sendMessage,
    clearMessages,
    updateConfig,
  };
}; 