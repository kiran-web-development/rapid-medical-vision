
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Hello! How can I assist you today?',
  sender: 'bot',
  timestamp: new Date()
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save chat history to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Load chat history from sessionStorage on component mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
  }, []);

  // Show welcome message on page load/refresh
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    if (!hasShownWelcome) {
      setIsOpen(true);
      sessionStorage.setItem('hasShownWelcome', 'true');
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'm here to help with any questions about AI Health.",
        "Would you like to know more about our services?",
        "Is there anything specific you'd like to learn about our platform?",
        "I can help you navigate through our diagnostic tools.",
        "Feel free to ask me anything about our medical AI technology."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className="rounded-full h-14 w-14 shadow-lg"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl z-40 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">AI Health Assistant</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white hover:bg-primary/80"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Textarea
                className="min-h-10 max-h-24 resize-none flex-1"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handleSendMessage} className="h-10">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
