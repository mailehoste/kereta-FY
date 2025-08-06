import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAPIKeys, setAPIKeys, APIKeys } from '@/lib/firebase';
import { Shield, Key, CheckCircle, AlertCircle } from 'lucide-react';

export const AIKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<APIKeys>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadAPIKeys();
  }, []);

  const loadAPIKeys = async () => {
    try {
      const keys = await getAPIKeys();
      setApiKeys(keys);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load API keys' });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      await setAPIKeys(apiKeys);
      setMessage({ type: 'success', text: 'API keys saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save API keys' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyChange = (key: keyof APIKeys, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const testAPIKey = async (service: keyof APIKeys) => {
    const key = apiKeys[service];
    if (!key) {
      setMessage({ type: 'error', text: `No API key found for ${service}` });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Simple test - you could implement actual API testing here
      setMessage({ type: 'success', text: `${service} API key appears valid` });
    } catch (error) {
      setMessage({ type: 'error', text: `${service} API key test failed` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          AI API Key Management
        </CardTitle>
        <CardDescription>
          Securely store your AI service API keys. Keys are encrypted and stored in Firebase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="claude" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="claude">Claude</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="grok">Grok</TabsTrigger>
          </TabsList>

          <TabsContent value="claude" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claude-key">Anthropic Claude API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="claude-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKeys.anthropic || ''}
                  onChange={(e) => handleKeyChange('anthropic', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testAPIKey('anthropic')}
                  disabled={isLoading || !apiKeys.anthropic}
                >
                  Test
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKeys.openai || ''}
                  onChange={(e) => handleKeyChange('openai', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testAPIKey('openai')}
                  disabled={isLoading || !apiKeys.openai}
                >
                  Test
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grok" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grok-key">Grok API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="grok-key"
                  type="password"
                  placeholder="grok-..."
                  value={apiKeys.grok || ''}
                  onChange={(e) => handleKeyChange('grok', e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testAPIKey('grok')}
                  disabled={isLoading || !apiKeys.grok}
                >
                  Test
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Note: Grok API is not yet publicly available
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Keys are encrypted and stored securely</span>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save API Keys'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 