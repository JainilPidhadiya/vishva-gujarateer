import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Send, Loader2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendChatMessage, type Message } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Gujarat travel assistant. I can help you plan your trip, suggest destinations, create itineraries, and answer any questions about Gujarat. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs for stable scrolling
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { toast } = useToast();

  const scrollToBottom = (smooth = true) => {
    const el = messagesContainerRef.current;
    if (el) {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
        return;
      } catch (e) {
        // ignore and fallback to scrollIntoView
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "end" });
  };

  useEffect(() => {
    // small timeout ensures DOM updated before scrolling
    const t = setTimeout(() => scrollToBottom(true), 50);
    return () => clearTimeout(t);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };

    // Add user message first for immediate UI feedback
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage([...messages, userMessage]);

      if (response && response.trim()) {
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (err) {
      toast({
        title: "Error",
        description:
          "Failed to get response. Make sure your Flask server is running at " +
          (import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (question: string) => {
    setInput(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-16 bg-sand/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-2 border-secondary/20 shadow-xl overflow-hidden flex flex-col h-[600px]">
          {/* Header (fixed) */}
          <div className="bg-secondary p-4 flex items-center gap-3 flex-shrink-0">
            <div className="bg-secondary-foreground/10 p-2 rounded-full">
              <Bot className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-foreground">AI Travel Assistant</h3>
              <p className="text-xs text-secondary-foreground/80">Your personal Gujarat guide</p>
            </div>
          </div>

          {/* Messages (scrollable) */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6" style={{ paddingBottom: 96 }}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className={`${message.role === "assistant" ? "bg-secondary/10" : "bg-primary/10"} p-2 rounded-full flex-shrink-0`}>
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4 text-secondary" />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`${message.role === "assistant" ? "bg-muted" : "bg-primary/10"} rounded-2xl ${
                        message.role === "assistant" ? "rounded-tl-none" : "rounded-tr-none"
                      } p-4`}>
                        <p className="text-sm text-foreground whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 items-start">
                    <div className="bg-secondary/10 p-2 rounded-full flex-shrink-0">
                      <Bot className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} className="h-px" />

                {messages.length === 1 && (
                  <div className="flex justify-start gap-2 pl-11 flex-wrap mt-4">
                    <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => handleQuickAction("Plan an adventure trip for 5 days")}>
                      Plan An Adventure Trip
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => handleQuickAction("Tell me about Gujarat's culture and traditions")}>
                      Dive Deeper In Culture
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => handleQuickAction("What are the top 10 must-see spots in Gujarat?")}>
                      Top 10 Must-See Spots
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => handleQuickAction("Recommend the best restaurants in Gujarat")}>
                      Best Restaurants
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input (fixed) */}
          <div className="border-t border-border p-4 flex-shrink-0 bg-background">
            <div className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything about Gujarat..." className="flex-1 rounded-full bg-muted border-0" disabled={isLoading} />
              <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/90" onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};