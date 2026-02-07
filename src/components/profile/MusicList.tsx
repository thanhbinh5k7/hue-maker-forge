import { Play, Bookmark, MoreHorizontal } from "lucide-react";

interface MusicTrack {
  id: string;
  title: string;
  artist?: string;
  thumbnailUrl: string;
  usedByVideos: number;
  duration: string;
}

interface MusicListProps {
  tracks: MusicTrack[];
}

const MusicList = ({ tracks }: MusicListProps) => {
  return (
    <div className="divide-y divide-border">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={track.thumbnailUrl}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{track.title}</h3>
            <p className="text-sm text-muted-foreground">
              Used by {track.usedByVideos} video{track.usedByVideos !== 1 ? "s" : ""}
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
