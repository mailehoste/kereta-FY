# API Setup Guide for Real AI Chat

## Quick Setup for Real AI Responses

### 1. Get Your API Keys

#### OpenAI GPT-4 (Recommended for fast responses)
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (starts with `sk-`)

#### Anthropic Claude (Alternative)
1. Go to https://console.anthropic.com/
2. Create a new API key
3. Copy the key (starts with `sk-ant-`)

### 2. Configure in Your App

1. **Start your app**: `npm run dev`
2. **Go to Settings**: Navigate to `http://localhost:5173/settings`
3. **Add API Keys**: 
   - Click on the "OpenAI" or "Claude" tab
   - Paste your API key
   - Click "Test" to verify
   - Click "Save API Keys"

### 3. Test the AI Chat

1. **Click the green WhatsApp AI chat widget** (bottom right)
2. **Type a question** in the top input field
3. **Press Enter** or click the bot icon
4. **Get instant AI response**!

## Environment Variables (Optional)

If you want to pre-configure API keys, create a `.env` file:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Troubleshooting

### "API key not found" Error
- Go to Settings page (`/settings`)
- Add your API key
- Test the key
- Save the configuration

### Slow Responses
- Try switching between OpenAI and Claude
- Check your internet connection
- API response times vary by service

### No Response
- Verify API key is correct
- Check browser console for errors
- Ensure Firebase is configured

## Features

✅ **Real AI Responses** - No more demo mode  
✅ **Fast Response Times** - Optimized for speed  
✅ **Multiple AI Models** - Switch between OpenAI and Claude  
✅ **WhatsApp Integration** - Send AI responses to WhatsApp  
✅ **PDPA Compliant** - Privacy protection included  

## Cost Information

- **OpenAI GPT-4**: ~$0.03 per 1K tokens
- **Anthropic Claude**: ~$0.015 per 1K tokens
- **Typical chat**: ~$0.01-0.05 per conversation

Start with a small credit ($5-10) to test the functionality! 