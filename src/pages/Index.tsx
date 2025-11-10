import { Hero } from "@/components/Hero";
import { AIAssistant } from "@/components/AIAssistant";
import { DiscoverSection } from "@/components/DiscoverSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
  <AIAssistant />
      <DiscoverSection />
      <Footer />
    </div>
  );
};

export default Index;
