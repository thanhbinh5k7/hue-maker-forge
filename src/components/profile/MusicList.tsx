import { Play, Bookmark, MoreHorizontal } from "lucide-react";

interface MusicTrack {
  id: string;
  title: string;
  thumbnail_url?: string;
  thumbnailUrl?: string;
  used_by_videos?: number;
  usedByVideos?: number;
  duration: string;
}

interface MusicListProps {
  tracks: MusicTrack[];
}

const MusicList = ({ tracks }: MusicListProps) => {
  if (tracks.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Chưa có nhạc nào
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={track.thumbnail_url || track.thumbnailUrl}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{track.title}</h3>
            <p className="text-sm text-muted-foreground">
              Used by {track.used_by_videos ?? track.usedByVideos ?? 0} video{(track.used_by_videos ?? track.usedByVideos ?? 0) !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-muted-foreground">{track.duration}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
