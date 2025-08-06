import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { AIService, AIResponse } from '@/types/ai';

// Claude Service
export const claudeService: AIService = {
  name: 'Claude',
  model: 'claude',
  sendMessage: async (message: string, apiKey: string): Promise<AIResponse> => {
    const anthropic = new Anthropic({
      apiKey,
    });

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307', // Faster model for quick responses
        max_tokens: 500, // Reduced for faster responses
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7, // Balanced creativity and speed
      });

      return {
        text: response.content[0].type === 'text' ? response.content[0].text : '',
        model: 'claude',
        usage: {
          promptTokens: response.usage?.input_tokens || 0,
          completionTokens: response.usage?.output_tokens || 0,
          totalTokens: response.usage?.input_tokens + response.usage?.output_tokens || 0,
        },
      };
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to get response from Claude');
    }
  },
};

// OpenAI Service
export const openaiService: AIService = {
  name: 'OpenAI',
  model: 'openai',
  sendMessage: async (message: string, apiKey: string): Promise<AIResponse> => {
    const openai = new OpenAI({
      apiKey,
    });

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Faster model for quick responses
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 500, // Reduced for faster responses
        temperature: 0.7, // Balanced creativity and speed
        stream: false, // Disable streaming for faster response
      });

      return {
        text: response.choices[0]?.message?.content || '',
        model: 'openai',
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from OpenAI');
    }
  },
};

// Grok Service (Note: Grok API is not publicly available yet, this is a placeholder)
export const grokService: AIService = {
  name: 'Grok',
  model: 'grok',
  sendMessage: async (message: string, apiKey: string): Promise<AIResponse> => {
    // Placeholder implementation - Grok API is not publicly available
    // This would be implemented when Grok API becomes available
    throw new Error('Grok API is not yet publicly available');
    
    // Future implementation would look something like:
    // const response = await fetch('https://api.grok.ai/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'grok-beta',
    //     messages: [{ role: 'user', content: message }],
    //   }),
    // });
  },
};

export const aiServices: Record<string, AIService> = {
  claude: claudeService,
  openai: openaiService,
  grok: grokService,
}; 