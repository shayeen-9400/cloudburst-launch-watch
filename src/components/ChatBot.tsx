import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  MessageSquare,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Cloudburst Detection Assistant. I can help you understand the system, interpret alerts, and answer questions about launch safety. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined responses for common questions
  const responses = {
    "red": "🔴 Red on the map indicates SEVERE cloudburst activity with high intensity. These areas pose significant risk for launch operations and should be avoided.",
    "green": "🟢 Green represents MILD cloudburst activity with low intensity. These areas are generally safe for launch operations with minimal weather-related risks.",
    "yellow": "🟡 Yellow shows MODERATE cloudburst activity. While not as dangerous as red zones, caution is advised for launch operations in these areas.",
    "safe": "Safe zones are marked in green and have minimal cloudburst activity. Current safe launch facilities include Thumba Equatorial and Balasore Test Range.",
    "unsafe": "Unsafe zones are marked in red with severe weather activity. ISRO Sriharikota is currently unsafe due to high cloudburst activity in the Bay of Bengal region.",
    "update": "The map updates every 30 seconds with real-time satellite data from our weather monitoring network. The system provides continuous 24/7 surveillance.",
    "launch": "Launch recommendations are based on weather patterns, satellite data, and cloudburst intensity. We analyze atmospheric conditions in a 50km radius around each facility.",
    "help": "I can explain map colors, discuss launch safety, provide zone updates, explain weather patterns, and answer questions about the detection system.",
    "cloudburst": "Cloudbursts are sudden, intense rainfall events that can dump large amounts of water in a short time. Our satellites detect these using advanced weather radar and prediction algorithms."
  };

  const quickQuestions = [
    "What does red mean on the map?",
    "Is my region safe for launching?",
    "How often is the map updated?",
    "Explain the color coding system"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keywords in responses
    for (const [key, response] of Object.entries(responses)) {
      if (input.includes(key)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about our cloudburst detection system. Could you be more specific about what you'd like to know?",
      "Great question! Our system monitors weather patterns across India and the Indian Ocean. Is there a particular aspect you'd like me to explain?",
      "I'm here to help with any questions about launch safety, weather patterns, or how our detection system works. What specific information do you need?",
      "Our system provides real-time weather monitoring for launch operations. Would you like to know about current conditions or how the system works?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-end justify-end p-6">
      <Card className="w-96 h-[32rem] bg-card/95 backdrop-blur border-border/50 shadow-glow-primary animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/20 animate-glow-pulse">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm text-foreground">AI Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-full pb-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="p-1.5 rounded-full bg-primary/20 flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-xs p-3 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-muted text-foreground mr-4'
                }`}>
                  <p>{message.content}</p>
                  <div className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="p-1.5 rounded-full bg-secondary/20 flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="p-1.5 rounded-full bg-primary/20 flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-primary animate-glow-pulse" />
                </div>
                <div className="bg-muted text-foreground p-3 rounded-lg mr-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3 h-3 text-secondary" />
                <span className="text-xs text-muted-foreground">Quick Questions:</span>
              </div>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full justify-start text-xs h-8 border-border/30 hover:border-primary hover:shadow-glow-primary transition-all"
                  >
                    <HelpCircle className="w-3 h-3 mr-2" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about weather patterns, launch safety..."
              className="flex-1 bg-input border-border focus:border-primary focus:shadow-glow-primary transition-all text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-primary hover:shadow-glow-primary transition-all"
              disabled={!inputMessage.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;