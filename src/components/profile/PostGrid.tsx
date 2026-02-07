import { Play, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  isVideo?: boolean;
  is_video?: boolean;
  isRepost?: boolean;
  date?: string | null;
  views?: number;
}

interface PostGridProps {
  posts: Post[];
  showReposts?: boolean;
}

const PostGrid = ({ posts, showReposts = false }: PostGridProps) => {
  const navigate = useNavigate();

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views.toString();
  };

  const handlePostClick = (postId: string) => {
    navigate(`/video/${postId}`);
  };

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        {showReposts ? "Chưa có repost nào" : "Chưa có bài viết nào"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts.map((post, index) => {
        const thumbnailUrl = post.thumbnailUrl || post.thumbnail_url;
        const isVideo = post.isVideo ?? post.is_video ?? true;
        
        return (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="relative aspect-[3/4] bg-muted overflow-hidden group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={thumbnailUrl}
              alt=""
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity" />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
            
            {/* Video indicator */}
            {isVideo && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-black/40 backdrop-blur-sm rounded flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                  <Play className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
            )}
            
            {/* Repost indicator */}
            {(showReposts || post.isRepost) && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-primary-foreground text-xs">
                <Repeat2 className="w-4 h-4" />
                {post.date && <span>{post.date}</span>}
              </div>
            )}
            
            {/* Views */}
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
  );
};

export default PostGrid;
