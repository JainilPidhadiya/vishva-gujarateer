import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { generateItinerary, type SearchParams } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Hero = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: "",
    activity: "",
    date: "",
    budget: "",
  });
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchParams.destination && !searchParams.activity) {
      toast({
        title: "Missing Information",
        description: "Please enter at least a destination or activity",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateItinerary(searchParams);
      setItinerary(result);
      setShowItinerary(true);
      
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized Gujarat itinerary is ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Make sure your Flask server is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                value={searchParams.destination}
                onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <Search className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="What do you want to do?"
                value={searchParams.activity}
                onChange={(e) => setSearchParams(prev => ({ ...prev, activity: e.target.value }))}
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <Calendar className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="When do you want to go?"
                value={searchParams.date}
                onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
              <DollarSign className="text-primary h-5 w-5 flex-shrink-0" />
              <Input 
                placeholder="Budget"
                value={searchParams.budget}
                onChange={(e) => setSearchParams(prev => ({ ...prev, budget: e.target.value }))}
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? "Planning..." : "Plan My Adventure"}
          </Button>
        </div>
      </div>

      {/* Itinerary Dialog */}
      <Dialog open={showItinerary} onOpenChange={setShowItinerary}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">Your Gujarat Itinerary</DialogTitle>
            <DialogDescription>
              Personalized travel plan based on your preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {itinerary.map((day, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Day {day.day}: {day.title}</h3>
                <p className="text-sm text-muted-foreground">{day.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
