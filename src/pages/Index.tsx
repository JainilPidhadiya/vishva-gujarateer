import { Hero } from "@/components/Hero";
import { AIAssistant } from "@/components/AIAssistant";
import { QuickActions } from "@/components/QuickActions";
import { DiscoverSection } from "@/components/DiscoverSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AIAssistant />
      <QuickActions />
      <DiscoverSection />
      <Footer />
    </div>
  );
};

export default Index;
