import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Music2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app would fetch based on id
  const video = {
    id,
    videoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=900&fit=crop",
    user: {
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      username: "tb__________________tb",
      displayName: "One",
    },
    caption: "Làm gì có ai không lạc lối... ✨ #viral #fyp #xuhuong",
    likes: 154800,
    comments: 2340,
    shares: 890,
    saves: 12500,
    music: "Original Sound - One",
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-black relative max-w-md mx-auto">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <img
          src={video.videoUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors active:scale-95">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-32 z-10 flex flex-col items-center gap-5">
        {/* Avatar */}
        <div className="relative">
          <img
            src={video.user.avatar}
            alt={video.user.displayName}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        </div>

        {/* Like */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-primary/80 transition-all duration-300 group-active:scale-90">
            <Heart className="w-7 h-7 text-white group-hover:fill-white transition-all" />
          </div>
          <span className="text-white text-xs font-medium">{formatNumber(video.likes)}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 group-active:scale-90">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatNumber(video.comments)}</span>
        </button>

        {/* Save */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 group-active:scale-90">
            <Bookmark className="w-7 h-7 text-white group-hover:fill-white transition-all" />
          </div>
          <span className="text-white text-xs font-medium">{formatNumber(video.saves)}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 group-active:scale-90">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatNumber(video.shares)}</span>
        </button>

        {/* Music Disc */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex items-center justify-center animate-spin-slow">
          <div className="w-4 h-4 rounded-full bg-gray-600" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-16 z-10 p-4 pb-6">
        {/* Username */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-bold">@{video.user.username}</span>
          <Button variant="follow" size="sm" className="h-7 px-4 text-xs rounded-md">
            Follow
          </Button>
        </div>

        {/* Caption */}
        <p className="text-primary-foreground text-sm mb-3 line-clamp-2">{video.caption}</p>

        {/* Music */}
        <div className="flex items-center gap-2">
          <Music2 className="w-4 h-4 text-white" />
          <div className="overflow-hidden">
            <p className="text-white text-sm whitespace-nowrap animate-marquee">
              {video.music}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
