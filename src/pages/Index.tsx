import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PostGrid from "@/components/profile/PostGrid";
import MusicList from "@/components/profile/MusicList";

type TabType = "grid" | "reposts" | "saved" | "music";

// Mock data
const mockPosts = [
  { id: "1", thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop", isVideo: true, views: 125000 },
  { id: "2", thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop", isVideo: true, views: 89000 },
  { id: "3", thumbnailUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop", isVideo: true, views: 234000 },
  { id: "4", thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", isVideo: true, views: 56000 },
  { id: "5", thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop", isVideo: true, views: 178000 },
  { id: "6", thumbnailUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop", isVideo: true, views: 445000 },
  { id: "7", thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop", isVideo: true, views: 92000 },
  { id: "8", thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", isVideo: true, views: 167000 },
  { id: "9", thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop", isVideo: true, views: 298000 },
];

const mockReposts = [
  { id: "r1", thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop", isRepost: true, date: "3d" },
  { id: "r2", thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop", isRepost: true, date: "4d" },
  { id: "r3", thumbnailUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop", isRepost: true, date: "4d" },
  { id: "r4", thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop", isRepost: true, date: "Jan 26" },
  { id: "r5", thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop", isRepost: true, date: "Jan 25" },
  { id: "r6", thumbnailUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop", isRepost: true, date: "Jan 25" },
];

const mockSaved = [
  { id: "s1", thumbnailUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop", isVideo: true },
  { id: "s2", thumbnailUrl: "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=400&h=600&fit=crop", isVideo: true },
  { id: "s3", thumbnailUrl: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=400&h=600&fit=crop", isVideo: true },
];

const mockMusic = [
  { id: "m1", title: "Dù Có Cách Em ...", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", usedByVideos: 75, duration: "01:00" },
  { id: "m2", title: "Nắng Lung Linh - Vietj ...", thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop", usedByVideos: 42, duration: "01:00" },
  { id: "m3", title: "Em Ơi Stop (Extended) ...", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", usedByVideos: 7, duration: "01:00" },
  { id: "m4", title: "Cùng Anh (Extended) ...", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", usedByVideos: 2, duration: "01:00" },
  { id: "m5", title: "Ghé Vào Dilema ...", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", usedByVideos: 2, duration: "01:00" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("grid");

  const renderContent = () => {
    switch (activeTab) {
      case "grid":
        return <PostGrid posts={mockPosts} />;
      case "reposts":
        return <PostGrid posts={mockReposts} showReposts />;
      case "saved":
        return <PostGrid posts={mockSaved} />;
      case "music":
        return <MusicList tracks={mockMusic} />;
      default:
        return <PostGrid posts={mockPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <ProfileHeader
        avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
        displayName="One"
        username="tb__________________tb"
        isTop={true}
        following={90}
        followers={154000}
        likes={154800}
        bio="@✳️"
        websiteUrl="https://ipinfo.io/json"
        subscription={true}
      />
      
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showMusic={true}
      />
      
      <div className="pb-20">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
