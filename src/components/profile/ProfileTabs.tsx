import { Grid3X3, Bookmark, Music, CreditCard, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "music" | "grid" | "payment" | "threads";

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showPayment?: boolean;
}

const ProfileTabs = ({ activeTab, onTabChange, showPayment = false }: ProfileTabsProps) => {
  const tabs = [
    { id: "music" as TabType, icon: Music, label: "Music" },
    { id: "grid" as TabType, icon: Grid3X3, label: "Posts" },
    { id: "threads" as TabType, icon: MessageSquare, label: "Threads" },
    ...(showPayment ? [{ id: "payment" as TabType, icon: CreditCard, label: "Payment" }] : []),
  ];

  return (
    <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center py-3.5 relative transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-300",
                isActive && "scale-110"
              )} />
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 gradient-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
