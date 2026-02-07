import { Bell, Share2, ChevronLeft, ChevronDown, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface ProfileHeaderProps {
  avatarUrl: string;
  displayName: string;
  username: string;
  isVerified?: boolean;
  verifiedBadgeUrl?: string;
  following: number;
  followers: number;
  likes: number;
  bio: string;
  websiteUrl?: string;
  subscription?: boolean;
  contactUrl?: string;
}

const ProfileHeader = ({
  avatarUrl,
  displayName,
  username,
  isVerified = false,
  verifiedBadgeUrl,
  following,
  followers,
  likes,
  bio,
  websiteUrl,
  subscription = false,
  contactUrl,
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
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-48 gradient-primary opacity-10 pointer-events-none" />
      
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between mb-6 relative z-10">
        <button className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-all duration-300 active:scale-95 glass">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="p-2 hover:bg-muted/50 rounded-full transition-all duration-300 active:scale-95 glass">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded-full transition-all duration-300 active:scale-95 glass">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Avatar with gradient ring */}
      <div className="relative mb-4 group">
        <div className="absolute -inset-1 gradient-primary rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-background">
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
        {isVerified && (
          verifiedBadgeUrl ? (
            <img 
              src={verifiedBadgeUrl} 
              alt="Verified" 
              className="w-5 h-5 object-contain"
            />
          ) : (
            <BadgeCheck className="w-5 h-5 text-blue-500" />
          )
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">@{username}</p>

      {/* Stats with gradient hover */}
      <div className="flex items-center gap-6 mb-5">
        <div className="text-center group cursor-pointer transition-transform hover:scale-105">
          <p className="text-lg font-bold text-foreground group-hover:gradient-text transition-all">{following}</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="text-center group cursor-pointer transition-transform hover:scale-105">
          <p className="text-lg font-bold text-foreground group-hover:gradient-text transition-all">{formatNumber(followers)}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="text-center group cursor-pointer transition-transform hover:scale-105">
          <p className="text-lg font-bold text-foreground group-hover:gradient-text transition-all">{formatNumber(likes)}</p>
          <p className="text-xs text-muted-foreground">Likes</p>
        </div>
      </div>

      {/* Action Buttons with enhanced gradients */}
      <div className="flex items-center gap-3 mb-5">
        <Button 
          variant="follow" 
          size="follow" 
          className="transition-all duration-300 hover:scale-105 shadow-glow hover:shadow-lg"
        >
          Follow
        </Button>
        {contactUrl ? (
          <a href={contactUrl} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="message" 
              size="action" 
              className="transition-all duration-300 hover:scale-105 gradient-border glass"
            >
              Message
            </Button>
          </a>
        ) : (
          <Button 
            variant="message" 
            size="action" 
            className="transition-all duration-300 hover:scale-105 gradient-border glass"
          >
            Message
          </Button>
        )}
        <Button 
          variant="icon" 
          size="icon" 
          className="rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 glass"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Bio */}
      <div className="text-center space-y-1.5">
        <p className="text-sm text-foreground font-medium">{bio}</p>
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <span>🔗</span>
            <span className="group-hover:underline">{websiteUrl.replace("https://", "")}</span>
          </a>
        )}
        {subscription && (
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold gradient-text">
            <span>💎</span>
            Subscription
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
