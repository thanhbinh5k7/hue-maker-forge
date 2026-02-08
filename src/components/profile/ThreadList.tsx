import { Heart, MessageCircle, Share2, MoreHorizontal, FileText } from "lucide-react";

interface Thread {
  id: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  created_at: string;
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList = ({ threads }: ThreadListProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Vừa xong";
    if (diffHours < 24) return `${diffHours}h trước`;
    if (diffDays < 7) return `${diffDays}d trước`;
    return date.toLocaleDateString("vi-VN");
  };

  if (threads.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có thread nào</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {threads.map((thread, index) => (
        <div
          key={thread.id}
          className="p-4 hover:bg-muted/30 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Content */}
          <p className="text-foreground whitespace-pre-wrap mb-3 leading-relaxed">
            {thread.content}
          </p>

          {/* Images Grid */}
          {thread.images && thread.images.length > 0 && (
            <div
              className={`grid gap-2 mb-3 ${
                thread.images.length === 1
                  ? "grid-cols-1"
                  : thread.images.length === 2
                  ? "grid-cols-2"
                  : thread.images.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              {thread.images.slice(0, 4).map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`relative rounded-xl overflow-hidden ${
                    thread.images.length === 3 && imgIndex === 0
                      ? "row-span-2"
                      : ""
                  } ${
                    thread.images.length === 1 ? "aspect-video" : "aspect-square"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {thread.images.length > 4 && imgIndex === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        +{thread.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">{formatDate(thread.created_at)}</span>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group">
                <Heart className="w-4 h-4 group-hover:fill-red-500 transition-all" />
                <span className="text-xs">{formatNumber(thread.likes)}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{formatNumber(thread.comments)}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="hover:text-primary transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
