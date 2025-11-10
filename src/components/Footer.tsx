import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for Gujarat Tourism
            <span className="mx-2">|</span>
            © 2023 Gujarat Travel Planner
          </p>
        </div>
      </div>
    </footer>
  );
};
