import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PostGrid from "@/components/profile/PostGrid";
import MusicList from "@/components/profile/MusicList";
import PaymentCard from "@/components/profile/PaymentCard";
import BottomNav from "@/components/BottomNav";

type TabType = "music" | "grid" | "payment" | "reposts" | "saved";

interface ProfileSettings {
  display_name: string;
  username: string;
  bio: string;
  avatar_url: string;
  following: number;
  followers: number;
  likes: number;
  website_url: string;
  is_top: boolean;
  has_subscription: boolean;
}

interface Post {
  id: string;
  thumbnail_url: string;
  is_video: boolean;
  views: number;
  date: string | null;
}

interface MusicTrack {
  id: string;
  title: string;
  thumbnail_url: string;
  used_by_videos: number;
  duration: string;
}

interface PaymentInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  momo_number: string;
  zalopay_number: string;
  notes: string;
}

// Fallback data
const defaultProfile: ProfileSettings = {
  display_name: "One",
  username: "tb__________________tb",
  bio: "@✳️",
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  following: 90,
  followers: 154000,
  likes: 154800,
  website_url: "https://ipinfo.io/json",
  is_top: true,
  has_subscription: true,
};

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("music");
  const [activeNavTab, setActiveNavTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  // Data from database
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfile);
  const [posts, setPosts] = useState<Post[]>([]);
  const [music, setMusic] = useState<MusicTrack[]>([]);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profile_settings")
        .select("*")
        .single();
      if (profileData) {
        setProfile({
          display_name: profileData.display_name,
          username: profileData.username,
          bio: profileData.bio || "",
          avatar_url: profileData.avatar_url || defaultProfile.avatar_url,
          following: profileData.following || 0,
          followers: profileData.followers || 0,
          likes: profileData.likes || 0,
          website_url: profileData.website_url || "",
          is_top: profileData.is_top || false,
          has_subscription: profileData.has_subscription || false,
        });
      }

      // Fetch posts
      const { data: postsData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (postsData) {
        setPosts(postsData.map(p => ({
          id: p.id,
          thumbnail_url: p.thumbnail_url,
          is_video: p.is_video ?? true,
          views: p.views ?? 0,
          date: p.date,
        })));
      }

      // Fetch music
      const { data: musicData } = await supabase
        .from("music_tracks")
        .select("*")
        .order("created_at", { ascending: false });
      if (musicData) {
        setMusic(musicData.map(m => ({
          id: m.id,
          title: m.title,
          thumbnail_url: m.thumbnail_url,
          used_by_videos: m.used_by_videos ?? 0,
          duration: m.duration || "01:00",
        })));
      }

      // Fetch payment (may fail if not authenticated)
      try {
        const { data: paymentData } = await supabase
          .from("payment_info")
          .select("*")
          .single();
        if (paymentData) {
          setPayment({
            bank_name: paymentData.bank_name || "",
            account_number: paymentData.account_number || "",
            account_holder: paymentData.account_holder || "",
            momo_number: paymentData.momo_number || "",
            zalopay_number: paymentData.zalopay_number || "",
            notes: paymentData.notes || "",
          });
        }
      } catch {
        // Payment info not accessible for unauthenticated users
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavChange = (tab: string) => {
    setActiveNavTab(tab);
    if (tab === "profile") {
      navigate("/");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "music":
        return <MusicList tracks={music} />;
      case "grid":
        return <PostGrid posts={posts.map(p => ({ ...p, thumbnailUrl: p.thumbnail_url, isVideo: p.is_video }))} />;
      case "payment":
        return <PaymentCard payment={payment} />;
      case "reposts":
        return <PostGrid posts={[]} showReposts />;
      case "saved":
        return <PostGrid posts={[]} />;
      default:
        return <MusicList tracks={music} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <ProfileHeader
        avatarUrl={profile.avatar_url || defaultProfile.avatar_url}
        displayName={profile.display_name}
        username={profile.username}
        isTop={profile.is_top}
        following={profile.following}
        followers={profile.followers}
        likes={profile.likes}
        bio={profile.bio}
        websiteUrl={profile.website_url}
        subscription={profile.has_subscription}
      />
      
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showPayment={true}
      />
      
      <div className="pb-24">
        {renderContent()}
      </div>

      <BottomNav activeTab={activeNavTab} onTabChange={handleNavChange} />
    </div>
  );
};

export default Index;
