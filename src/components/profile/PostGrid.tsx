import { Play, Repeat2 } from "lucide-react";

interface Post {
  id: string;
  thumbnailUrl: string;
  isVideo?: boolean;
  isRepost?: boolean;
  date?: string;
  views?: number;
}

interface PostGridProps {
  posts: Post[];
  showReposts?: boolean;
}

const PostGrid = ({ posts, showReposts = false }: PostGridProps) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views.toString();
  };

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative aspect-[3/4] bg-muted overflow-hidden group cursor-pointer"
        >
          <img
            src={post.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Video indicator */}
          {post.isVideo && (
            <div className="absolute top-2 right-2">
              <div className="w-5 h-5 bg-black/40 backdrop-blur-sm rounded flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
          )}
          
          {/* Repost indicator */}
          {(showReposts || post.isRepost) && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
              <Repeat2 className="w-4 h-4" />
              {post.date && <span>{post.date}</span>}
            </div>
          )}
          
          {/* Views */}
          {post.views && !showReposts && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-medium">
              <Play className="w-3 h-3 fill-white" />
              {formatViews(post.views)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
