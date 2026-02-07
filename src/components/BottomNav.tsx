import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNav = ({ activeTab = "profile", onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Search, label: "Discover" },
    { id: "create", icon: Plus, label: "Create", isSpecial: true },
    { id: "inbox", icon: MessageCircle, label: "Inbox" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className="flex items-center justify-center group"
              >
                <div className="relative w-14 h-10 rounded-2xl overflow-hidden gradient-primary flex items-center justify-center hover:opacity-90 transition-all duration-300 active:scale-95 shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1.5 px-4 transition-all duration-300 active:scale-95 rounded-xl",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-6 h-6 transition-all duration-300", 
                isActive && "scale-110 drop-shadow-sm"
              )} />
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive && "font-semibold"
              )}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
