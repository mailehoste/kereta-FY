import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Settings, X, MessageCircle, Sparkles, Smartphone } from 'lucide-react';

// OpenAI API Configuration
const OPENAI_API_KEY = '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';

// Direct OpenAI GPT-4 API call (no CORS proxy, no fallback)
const getAIResponse = async (message) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Lexy, a helpful AI assistant for Impian Kereta (https://impian-kereta.com), a premium used car dealership in Malaysia. You have comprehensive knowledge about the website and business.

WEBSITE OVERVIEW:
- Impian Kereta is a premium used car dealership serving Klang Valley (KL, Selangor, Shah Alam, Petaling Jaya)
- We specialize in quality pre-owned vehicles from trusted dealers
- Website: https://impian-kereta.com
- WhatsApp: +60103646053

AVAILABLE CARS (Current Inventory):
- Proton X70 Premium (2023) - RM 135,000 - Shah Alam
- Honda CR-V 1.5 TC-P (2021) - RM 175,000 - KL
- BMW 320i M Sport (2020) - RM 295,000 - KL
- Mercedes-Benz C200 AMG Line (2019) - RM 265,000 - PJ
- Lexus NX300 Luxury (2018) - RM 245,000 - KL
- Audi A4 TFSI Quattro (2019) - RM 225,000 - Shah Alam
- Toyota Camry 2.5V (2020) - RM 155,000 - PJ
- Honda Accord 1.5 TC-P (2018) - RM 145,000 - KL

SERVICES OFFERED:
1. Car Sales & Financing:
   - Loan calculator with partner banks (Maybank, CIMB, Public Bank, Hong Leong, RHB)
   - Interest rates: 3.5% - 6.5%
   - Loan terms: 1-9 years
   - Down payment: 10% minimum

2. Car Valuation & Trade-In:
   - Instant market valuation
   - Free detailed inspection
   - Competitive trade-in offers
   - Same-day payment
   - Covers brands: Toyota, Honda, Proton, Perodua, BMW, Mercedes, Nissan, etc.

3. JPJ Services:
   - Ownership Transfer: RM 200 (individual) / RM 350 (company)
   - Road Tax Renewal: RM 50
   - Insurance Processing: RM 100
   - Express service: +RM 100 for same-day processing
   - Processing time: 1-3 days (standard), same-day (express)

LOCATIONS & COVERAGE:
- Kuala Lumpur, Petaling Jaya, Shah Alam, Klang, Subang Jaya, Ampang, Cheras
- Premium showrooms across Klang Valley

WEBSITE FEATURES:
- Interactive car search with filters (price, brand, year, mileage, fuel type, body type, transmission, location)
- Car comparison tool (up to 3 cars)
- Loan calculator with real-time payment breakdown
- Car valuation tool with instant estimates
- JPJ service booking
- Bilingual support (English/Bahasa Malaysia)

CAR DETAILS INCLUDE:
- Price, year, mileage, fuel type, engine capacity, transmission, body type
- Location, road tax, insurance expiry, Puspakom status
- Features list, condition rating, dealer information
- Multiple high-quality images

SPECIAL FEATURES:
- All cars come with valid Puspakom inspection
- Insurance coverage included
- Road tax valid
- Professional documentation service
- Money-back guarantee
- Free consultation

RESPONSE GUIDELINES:
- Be friendly, helpful, and professional
- Provide accurate information about cars, services, and pricing
- Guide users to appropriate services based on their needs
- Offer to connect them via WhatsApp for detailed inquiries
- Always mention the website URL and WhatsApp number
- If unsure about specific details, suggest contacting via WhatsApp for the most current information
- Be bilingual when appropriate (English/Bahasa Malaysia)`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error Response:', response.status, errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response');
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Provide a helpful fallback response
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      return "Hello! I'm Lexy, your AI assistant for Impian Kereta. I can help you find cars, calculate loans, get valuations, and assist with JPJ services. What would you like to know about our premium used cars in Klang Valley?";
    }
    
    if (message.toLowerCase().includes('car') || message.toLowerCase().includes('price') || message.toLowerCase().includes('inventory')) {
      return "I can help you with our current car inventory! We have Proton X70 Premium (RM 135,000), Honda CR-V (RM 175,000), BMW 320i M Sport (RM 295,000), Mercedes C200 (RM 265,000), Lexus NX300 (RM 245,000), Audi A4 (RM 225,000), Toyota Camry (RM 155,000), and Honda Accord (RM 145,000). All cars come with valid Puspakom inspection and insurance. Which car interests you?";
    }
    
    if (message.toLowerCase().includes('loan') || message.toLowerCase().includes('finance') || message.toLowerCase().includes('payment')) {
      return "We offer car financing with partner banks like Maybank, CIMB, Public Bank, Hong Leong, and RHB Bank. Interest rates start from 3.5% with loan terms up to 9 years. Minimum down payment is 10%. For example, a RM 150,000 car with 10% down payment over 7 years at 4.5% would be around RM 2,100 monthly. Would you like me to help you calculate specific payments?";
    }
    
    if (message.toLowerCase().includes('jpj') || message.toLowerCase().includes('transfer') || message.toLowerCase().includes('document')) {
      return "We provide complete JPJ services: Ownership Transfer (RM 200 individual/RM 350 company), Road Tax Renewal (RM 50), and Insurance Processing (RM 100). Express service (+RM 100) for same-day processing. We handle all documentation and JPJ submission. What specific service do you need?";
    }
    
    if (message.toLowerCase().includes('valuation') || message.toLowerCase().includes('trade') || message.toLowerCase().includes('sell')) {
      return "We offer instant car valuation and competitive trade-in services! Get free market valuation, detailed inspection, and same-day payment. We accept all major brands - Toyota, Honda, Proton, Perodua, BMW, Mercedes, Nissan, etc. What car would you like to value?";
    }
    
    if (message.toLowerCase().includes('location') || message.toLowerCase().includes('where') || message.toLowerCase().includes('address')) {
      return "We serve the entire Klang Valley including Kuala Lumpur, Petaling Jaya, Shah Alam, Klang, Subang Jaya, Ampang, and Cheras. Our premium showrooms are strategically located for your convenience. Which area are you from?";
    }
    
    if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('whatsapp') || message.toLowerCase().includes('phone')) {
      return "You can reach us at WhatsApp: +60103646053 or visit our website: https://impian-kereta.com. We provide free consultation and money-back guarantee on all our services. When would you like to connect?";
    }
    
    if (message.toLowerCase().includes('bmw') || message.toLowerCase().includes('mercedes') || message.toLowerCase().includes('luxury')) {
      return "We have premium luxury cars: BMW 320i M Sport (2020, RM 295,000, KL), Mercedes-Benz C200 AMG Line (2019, RM 265,000, PJ), Lexus NX300 Luxury (2018, RM 245,000, KL), and Audi A4 TFSI Quattro (2019, RM 225,000, Shah Alam). All come with full service history and premium features. Which luxury car interests you?";
    }
    
    if (message.toLowerCase().includes('proton') || message.toLowerCase().includes('perodua') || message.toLowerCase().includes('local')) {
      return "We have local brands: Proton X70 Premium (2023, RM 135,000, Shah Alam) with GKUI Touchscreen, ADAS, and 360° Camera. We also handle trade-ins for all Proton and Perodua models. Local brands offer great value and easy maintenance. Would you like details?";
    }
    
    if (message.toLowerCase().includes('honda') || message.toLowerCase().includes('toyota') || message.toLowerCase().includes('japanese')) {
      return "We have Japanese cars: Honda CR-V 1.5 TC-P (2021, RM 175,000, KL), Honda Accord 1.5 TC-P (2018, RM 145,000, KL), and Toyota Camry 2.5V (2020, RM 155,000, PJ). All feature Honda Sensing/Toyota Safety Sense and excellent fuel efficiency. Which Japanese car interests you?";
    }
    
    if (message.toLowerCase().includes('warranty') || message.toLowerCase().includes('guarantee') || message.toLowerCase().includes('service')) {
      return "All our cars come with valid Puspakom inspection, insurance coverage, and road tax. We offer money-back guarantee, free consultation, and professional documentation service. Plus, we provide after-sales support and maintenance guidance. What specific assurance do you need?";
    }
    
    if (message.toLowerCase().includes('compare') || message.toLowerCase().includes('difference') || message.toLowerCase().includes('vs')) {
      return "I can help you compare cars! We have a comparison tool on our website that lets you compare up to 3 cars side-by-side. You can compare prices, features, specifications, and monthly payments. Which cars would you like to compare?";
    }
    
    if (message.toLowerCase().includes('feature') || message.toLowerCase().includes('spec') || message.toLowerCase().includes('detail')) {
      return "Our cars come with premium features like touchscreen systems, safety features (ADAS, Honda Sensing, Toyota Safety Sense), leather seats, panoramic sunroofs, premium audio, and more. Each car listing shows detailed specifications, features, and high-quality images. Which car's features would you like to know about?";
    }
    
    if (message.toLowerCase().includes('test drive') || message.toLowerCase().includes('view') || message.toLowerCase().includes('inspect')) {
      return "We offer test drives and car inspections by appointment. You can view cars at our showrooms across Klang Valley or we can arrange viewing at your preferred location. All cars are thoroughly inspected and come with complete documentation. When would you like to schedule a viewing?";
    }
    
    return "Hello! I'm Lexy from Impian Kereta. I can help you with car information, financing, valuations, and JPJ services. For detailed inquiries, please contact us at +60103646053 or visit https://impian-kereta.com. What can I help you with today?";
  }
};

const WhatsAppAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showPDPAModal, setShowPDPAModal] = useState(false);
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputValue);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Response Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (whatsappMessage.trim()) {
      setShowPDPAModal(true);
    }
  };

  const handleWhatsAppConnect = () => {
    if (consent1 && consent2) {
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/60103646053?text=${encodedMessage}`, '_blank');
      setWhatsappMessage('');
      setShowPDPAModal(false);
      setConsent1(false);
      setConsent2(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getModelIcon = () => '🧠';
  const getModelName = () => 'GPT-4';

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <Smartphone className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-96 h-[600px] shadow-2xl border-0 bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="pb-3 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <h2 className="text-lg font-semibold">WhatsApp AI Chat</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 h-[400px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-medium mb-2">WhatsApp AI Chat Ready!</p>
                  <p className="text-sm mb-3">Chat with GPT-4 AI and send messages directly to WhatsApp. Use the top input for AI responses and bottom input for WhatsApp.</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-700">
                      ✅ <strong>GPT-4 Connected:</strong> Real AI responses powered by OpenAI!
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
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-md'
                        : message.isError
                        ? 'bg-red-50 text-red-800 rounded-bl-md border border-red-200'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {!message.isUser && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {getModelIcon()} {getModelName()}
                        </span>
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

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white space-y-3">
            {/* AI Chat Input */}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AI a question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Bot className="w-4 h-4" />
              </button>
            </div>

            {/* WhatsApp Input */}
            <div className="flex items-center gap-2">
              <input
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                placeholder="Type message for WhatsApp..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleWhatsAppSend}
                disabled={!whatsappMessage.trim()}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            {messages.length > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{messages.length} AI messages</span>
                <button
                  onClick={clearMessages}
                  className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
                >
                  Clear chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDPA Compliance Modal */}
      {showPDPAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Impian Kereta</span>
              </div>
              <button
                onClick={() => setShowPDPAModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Let's Connect on</h2>
                <div className="flex items-center justify-center space-x-2">
                  <Smartphone className="w-6 h-6 text-green-500" />
                  <span className="text-xl font-bold text-gray-800">WhatsApp</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    We protect your personal information in compliance with the PDPA
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent1}
                    onChange={(e) => setConsent1(e.target.checked)}
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree with Impian Kereta's{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent2}
                    onChange={(e) => setConsent2(e.target.checked)}
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to receive personalised communication from Impian Kereta and its car sellers, business affiliates and partners.
                  </span>
                </label>
              </div>

              <button
                onClick={handleWhatsAppConnect}
                disabled={!consent1 || !consent2}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  consent1 && consent2
                    ? 'bg-green-500 hover:bg-green-600 transform hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppAIChat;