import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
            Gujarat Travel Planner
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 drop-shadow-md">
            Explore the Magic of Gujarat with AI Travel Planner
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <MapPin className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="Where do you want to go?"
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <Search className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="What do you want to do?"
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <Calendar className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="When do you want to go?"
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <DollarSign className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="Budget"
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
            Plan My Adventure
          </Button>
        </div>
      </div>
    </section>
  );
};
