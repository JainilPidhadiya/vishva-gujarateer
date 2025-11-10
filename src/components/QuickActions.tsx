import { Button } from "@/components/ui/button";
import { Plane, Train, Car, Home, Navigation } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Plane, label: "All Modes", variant: "default" as const },
    { icon: Train, label: "Temples", variant: "outline" as const },
    { icon: Car, label: "Beaches", variant: "outline" as const },
    { icon: Home, label: "Heritage", variant: "outline" as const },
    { icon: Navigation, label: "Add On", variant: "outline" as const },
  ];

  return (
    <section className="py-8 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className={`rounded-full gap-2 ${
                  action.variant === 'default' 
                    ? 'bg-primary hover:bg-primary/90 shadow-warm' 
                    : 'hover:border-primary hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
