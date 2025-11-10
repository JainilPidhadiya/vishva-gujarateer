import { Card } from "@/components/ui/card";
import { Bot, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AIAssistant = () => {
  return (
    <section className="py-16 bg-sand/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-2 border-secondary/20 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-secondary p-4 flex items-center gap-3">
            <div className="bg-secondary-foreground/10 p-2 rounded-full">
              <Bot className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-foreground">AI Travel Assistant</h3>
              <p className="text-xs text-secondary-foreground/80">Your personal Gujarat guide</p>
            </div>
          </div>

          {/* Chat Content */}
          <div className="p-6 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
            <div className="flex gap-3">
              <div className="bg-secondary/10 p-2 rounded-full h-fit">
                <Bot className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                  <p className="text-sm text-foreground mb-3">
                    I'd be happy to help you plan your Gujarat adventure! Let me suggest a 5-day itinerary:
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-primary mb-1">Day 1: Ahmedabad</p>
                      <p className="text-muted-foreground">Visit Sabarmati Ashram, explore old city markets, and try local cuisine</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-primary mb-1">Day 2: Statue of Unity</p>
                      <p className="text-muted-foreground">Marvel at the world's tallest statue and surrounding attractions</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-primary mb-1">Day 3: Dwarka</p>
                      <p className="text-muted-foreground">Explore ancient temples and coastal beauty</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-primary mb-1">Day 4: Gir National Park</p>
                      <p className="text-muted-foreground">Safari to spot Asiatic lions in their natural habitat</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-primary mb-1">Day 5: Rann of Kutch</p>
                      <p className="text-muted-foreground">Experience the magical white desert at sunset</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-2 pl-11">
              <Button variant="outline" size="sm" className="rounded-full text-xs">
                Plan An Adventure Trip
              </Button>
              <Button variant="outline" size="sm" className="rounded-full text-xs">
                Dive Deeper In Culture
              </Button>
            </div>
            <div className="flex justify-start gap-2 pl-11">
              <Button variant="outline" size="sm" className="rounded-full text-xs">
                Top 10 Must-See Spots
              </Button>
              <Button variant="outline" size="sm" className="rounded-full text-xs">
                Best Restaurants For All
              </Button>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask me anything about Gujarat..."
                className="flex-1 rounded-full bg-muted border-0"
              />
              <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
