import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIChat } from '@/hooks/use-ai-chat';
import { AIModel } from '@/types/ai';
import { Bot, Send, Settings, X, MessageCircle, Sparkles } from 'lucide-react';

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const AIChatWidget = ({ isOpen, onClose, onToggle }: AIChatWidgetProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    isLoading,
    error,
    config,
    sendMessage,
    clearMessages,
    updateConfig,
  } = useAIChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'claude':
        return '🤖';
      case 'openai':
        return '🧠';
      case 'grok':
        return '🚀';
      default:
        return '🤖';
    }
  };

  const getModelName = (model: string) => {
    switch (model) {
      case 'claude':
        return 'Claude';
      case 'openai':
        return 'GPT-4';
      case 'grok':
        return 'Grok';
      default:
        return 'AI';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-6 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Sparkles className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-32 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-2xl border-0">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">AI Chat Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {showSettings && (
            <div className="mt-3 p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">Model:</span>
                <Select
                  value={config.selectedModel}
                  onValueChange={(value: AIModel) => updateConfig({ selectedModel: value })}
                >
                  <SelectTrigger className="w-32 h-8 bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="openai">GPT-4</SelectItem>
                    <SelectItem value="grok">Grok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-medium mb-2">Welcome to AI Chat!</p>
                  <p className="text-sm mb-3">Start a conversation with your AI assistant. You can switch between different AI models using the settings.</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      💡 <strong>Tip:</strong> Configure your API keys in{' '}
                      <a href="/settings" className="text-blue-600 hover:underline font-medium">Settings</a>{' '}
                      for full functionality, or try the demo mode!
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {!message.isUser && message.model && (
                        <Badge variant="secondary" className="text-xs">
                          {getModelIcon(message.model)} {getModelName(message.model)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-50 text-red-800 rounded-2xl rounded-bl-md border border-red-200 px-4 py-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {messages.length > 0 && (
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{messages.length} messages</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearMessages}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear chat
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 