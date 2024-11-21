'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  Bot, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { generateAIResponse } from '@/lib/ai-chat';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message to chat instead of showing toast
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        content: "Hi! I'm here to help you with any technical issues you're experiencing. Feel free to describe what's happening, and I'll guide you through the solution.",
        role: 'assistant',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={handleOpen}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "bg-background border rounded-lg shadow-lg transition-all duration-200",
            isMinimized ? "h-14 w-80" : "w-96 h-[600px]"
          )}
        >
          {/* Header */}
          <div className="h-14 border-b flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">Support Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <ScrollArea
                ref={scrollAreaRef}
                className="flex-1 p-4 h-[488px]"
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[85%]",
                          message.role === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="h-14 border-t p-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}