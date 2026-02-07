import { Bell, Share2, ChevronLeft, ChevronDown, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface ProfileHeaderProps {
  avatarUrl: string;
  displayName: string;
  username: string;
  isTop?: boolean;
  following: number;
  followers: number;
  likes: number;
  bio: string;
  websiteUrl?: string;
  subscription?: boolean;
}

const ProfileHeader = ({
  avatarUrl,
  displayName,
  username,
  isTop = false,
  following,
  followers,
  likes,
  bio,
  websiteUrl,
  subscription = false,
}: ProfileHeaderProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col items-center px-4 pt-4 pb-6 animate-fade-in">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between mb-6">
        <button className="p-2 -ml-2 hover:bg-muted rounded-full transition-all duration-300 active:scale-95">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 active:scale-95">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 active:scale-95">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative mb-4 group">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-border transition-all duration-300 group-hover:ring-primary group-hover:ring-4">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Name & Username */}
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
        {isTop && (
          <span className="flex items-center gap-0.5 bg-[hsl(var(--badge-top))] text-[hsl(var(--badge-top-foreground))] text-xs font-semibold px-2 py-0.5 rounded-sm">
            <Crown className="w-3 h-3" />
            TOP
          </span>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">@{username}</p>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-5">
        <div className="text-center group cursor-pointer">
          <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{following}</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center group cursor-pointer">
          <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{formatNumber(followers)}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center group cursor-pointer">
          <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{formatNumber(likes)}</p>
          <p className="text-xs text-muted-foreground">Likes</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-5">
        <Button variant="follow" size="follow" className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Follow
        </Button>
        <Button variant="message" size="action" className="transition-all duration-300 hover:scale-105">
          Message
        </Button>
        <Button variant="icon" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180">
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Bio */}
      <div className="text-center space-y-1">
        <p className="text-sm text-foreground">{bio}</p>
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-sm text-foreground hover:text-primary hover:underline transition-colors"
          >
            <span className="text-muted-foreground">🔗</span>
            {websiteUrl.replace("https://", "")}
          </a>
        )}
        {subscription && (
          <p className="flex items-center justify-center gap-1 text-sm text-primary font-medium">
            <span>💎</span>
            Subscription
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
