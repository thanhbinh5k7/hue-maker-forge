import { useState } from "react";
import { Play, Repeat2, X } from "lucide-react";

interface Post {
  id: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  isVideo?: boolean;
  is_video?: boolean;
  isRepost?: boolean;
  date?: string | null;
  views?: number;
  videoUrl?: string;
  video_url?: string;
}

interface PostGridProps {
  posts: Post[];
  showReposts?: boolean;
}

const PostGrid = ({ posts, showReposts = false }: PostGridProps) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const formatViews = (views: number) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K";
    return views.toString();
  };

  // Convert various video URLs to embeddable format
  const getEmbedUrl = (url: string) => {
    // TikTok
    const tiktokMatch = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (tiktokMatch) return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
    
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    
    // YouTube Shorts
    const ytShorts = url.match(/youtube\.com\/shorts\/([\w-]+)/);
    if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}?autoplay=1`;

    return url;
  };

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        {showReposts ? "Chưa có repost nào" : "Chưa có bài viết nào"}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post, index) => {
          const thumbnailUrl = post.thumbnailUrl || post.thumbnail_url;
          const isVideo = post.isVideo ?? post.is_video ?? true;
          const videoUrl = post.videoUrl || post.video_url;

          return (
            <div
              key={post.id}
              onClick={() => videoUrl && setActiveVideo(videoUrl)}
              className={`relative aspect-[3/4] bg-muted overflow-hidden group animate-fade-in block ${videoUrl ? 'cursor-pointer' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={thumbnailUrl}
                alt=""
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />

              {isVideo && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-black/40 backdrop-blur-sm rounded flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                    <Play className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              )}

              {(showReposts || post.isRepost) && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-primary-foreground text-xs">
                  <Repeat2 className="w-4 h-4" />
                  {post.date && <span>{post.date}</span>}
                </div>
              )}

              {post.views !== undefined && !showReposts && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-primary-foreground text-xs font-medium">
                  <Play className="w-3 h-3 fill-primary-foreground" />
                  {formatViews(post.views)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video overlay modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-md h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(activeVideo)}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostGrid;
