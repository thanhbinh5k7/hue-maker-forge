import { useState } from "react";
import { Grid3X3, Repeat2, Bookmark, Music, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "music" | "grid" | "payment" | "reposts" | "saved";

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showPayment?: boolean;
}

const ProfileTabs = ({ activeTab, onTabChange, showPayment = false }: ProfileTabsProps) => {
  const tabs = [
    { id: "music" as TabType, icon: Music, label: "Music" },
    { id: "grid" as TabType, icon: Grid3X3, label: "Posts" },
    { id: "reposts" as TabType, icon: Repeat2, label: "Reposts" },
    { id: "saved" as TabType, icon: Bookmark, label: "Saved" },
    ...(showPayment ? [{ id: "payment" as TabType, icon: CreditCard, label: "Payment" }] : []),
  ];

  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center py-3 relative transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-foreground rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
