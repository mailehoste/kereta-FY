# WhatsApp AI Chat Widget

A comprehensive AI chat widget that integrates multiple AI models (Claude, OpenAI, Grok) with WhatsApp functionality, featuring PDPA compliance and secure API key management.

## Features

### 🤖 AI Chat Integration
- **Multiple AI Models**: Support for Claude, OpenAI GPT-4, and Grok (coming soon)
- **Real-time Chat**: Instant AI responses with typing indicators
- **Model Switching**: Easy switching between different AI models
- **Message History**: Persistent chat history with timestamps
- **Error Handling**: Graceful error handling for API failures

### 📱 WhatsApp Integration
- **Direct WhatsApp Messaging**: Send messages directly to WhatsApp
- **PDPA Compliance**: Built-in privacy compliance modal
- **Pre-filled Messages**: Customizable default messages
- **Dual Input System**: Separate inputs for AI chat and WhatsApp

### 🔐 Security & Compliance
- **Secure API Key Storage**: Firebase-based encrypted storage
- **PDPA Compliance**: Full compliance with Personal Data Protection Act
- **Privacy Protection**: User consent collection and data protection
- **Encrypted Communication**: Secure API key transmission

### 🎨 Modern UI/UX
- **Floating Widgets**: Non-intrusive floating chat widgets
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Professional animations and transitions
- **Dark/Light Mode**: Adaptive to system theme

## Architecture

### Component Structure
```
src/
├── components/
│   ├── AIChatWidget.tsx          # Main AI chat widget
│   ├── WhatsAppAIChat.tsx        # WhatsApp + AI integration
│   ├── AIKeyManager.tsx          # API key management
│   └── ui/                       # Reusable UI components
├── hooks/
│   └── use-ai-chat.ts           # AI chat logic hook
├── lib/
│   ├── firebase.ts              # Firebase configuration
│   └── ai-services.ts           # AI service implementations
├── types/
│   └── ai.ts                    # TypeScript type definitions
└── pages/
    └── SettingsPage.tsx         # Settings management page
```

### Key Components

#### 1. AIChatWidget
- Standalone AI chat interface
- Model selection and configuration
- Real-time message handling
- Error state management

#### 2. WhatsAppAIChat
- Combined AI + WhatsApp functionality
- PDPA compliance modal
- Dual input system (AI chat + WhatsApp)
- Message formatting and encoding

#### 3. AIKeyManager
- Secure API key storage
- Key validation and testing
- Firebase integration
- User-friendly interface

#### 4. useAIChat Hook
- Centralized AI chat logic
- Message state management
- API service integration
- Error handling

## Setup Instructions

### 1. Environment Variables
Create a `.env` file with Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Firebase Setup
1. Create a Firebase project
2. Enable Firestore Database
3. Set up security rules for API key storage
4. Configure authentication if needed

### 3. API Keys
Get API keys from:
- **Anthropic Claude**: https://console.anthropic.com/
- **OpenAI**: https://platform.openai.com/
- **Grok**: Coming soon

### 4. Installation
```bash
npm install
npm run dev
```

## Usage

### Basic AI Chat
1. Click the AI chat widget (purple button)
2. Select your preferred AI model
3. Start chatting with the AI
4. Messages are processed in real-time

### WhatsApp Integration
1. Click the WhatsApp AI chat widget (green button)
2. Use the AI chat input for AI responses
3. Use the WhatsApp input for direct messaging
4. Accept PDPA compliance terms
5. Send messages directly to WhatsApp

### API Key Management
1. Navigate to `/settings`
2. Enter your API keys for each service
3. Test keys for validity
4. Save securely to Firebase

## API Services

### Claude Service
```typescript
const claudeService: AIService = {
  name: 'Claude',
  model: 'claude',
  sendMessage: async (message: string, apiKey: string) => {
    // Claude API implementation
  }
};
```

### OpenAI Service
```typescript
const openaiService: AIService = {
  name: 'OpenAI',
  model: 'openai',
  sendMessage: async (message: string, apiKey: string) => {
    // OpenAI API implementation
  }
};
```

### Grok Service (Coming Soon)
```typescript
const grokService: AIService = {
  name: 'Grok',
  model: 'grok',
  sendMessage: async (message: string, apiKey: string) => {
    // Grok API implementation (when available)
  }
};
```

## PDPA Compliance

The widget includes comprehensive PDPA compliance:

### Privacy Statement
- Clear privacy policy display
- Data protection information
- User consent collection

### Consent Management
- Terms of Use agreement
- Privacy Policy acceptance
- Marketing communication consent
- Granular consent options

### Data Protection
- Encrypted API key storage
- Secure data transmission
- User data minimization
- Right to data deletion

## Customization

### Styling
The widgets use Tailwind CSS and can be customized:
```css
/* Custom widget colors */
.ai-chat-widget {
  @apply bg-gradient-to-r from-purple-500 to-blue-500;
}

.whatsapp-widget {
  @apply bg-gradient-to-r from-green-500 to-blue-500;
}
```

### Configuration
Modify AI settings in `src/hooks/use-ai-chat.ts`:
```typescript
const config: ChatConfig = {
  selectedModel: 'claude',
  temperature: 0.7,
  maxTokens: 1000,
};
```

### Adding New AI Models
1. Add service to `src/lib/ai-services.ts`
2. Update types in `src/types/ai.ts`
3. Add UI components for model selection
4. Test integration

## Security Considerations

### API Key Security
- Keys stored encrypted in Firebase
- No client-side exposure
- Secure transmission protocols
- Regular key rotation

### Data Privacy
- Minimal data collection
- User consent tracking
- Data retention policies
- GDPR/PDPA compliance

### Error Handling
- Graceful API failures
- User-friendly error messages
- Fallback mechanisms
- Logging and monitoring

## Performance Optimization

### Code Splitting
- Lazy-loaded components
- Dynamic imports for AI services
- Optimized bundle size

### Caching
- Message history caching
- API response caching
- Configuration persistence

### Real-time Updates
- Efficient state management
- Optimistic UI updates
- Background processing

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify API key format
   - Check service availability
   - Test key validity

2. **Firebase Connection**
   - Verify environment variables
   - Check Firebase rules
   - Test network connectivity

3. **Widget Not Loading**
   - Check component imports
   - Verify CSS dependencies
   - Clear browser cache

### Debug Mode
Enable debug logging:
```typescript
const DEBUG = import.meta.env.DEV;
if (DEBUG) {
  console.log('AI Chat Debug:', { messages, config });
}
```

## Future Enhancements

### Planned Features
- [ ] Grok API integration
- [ ] Voice message support
- [ ] File upload capabilities
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Custom AI training

### Technical Improvements
- [ ] WebSocket real-time chat
- [ ] Offline message queuing
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] A/B testing framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide 