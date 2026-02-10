import { useState, useRef } from "react";
import { Play, Pause, Bookmark, MoreHorizontal, Music2 } from "lucide-react";

interface MusicTrack {
  id: string;
  title: string;
  thumbnail_url?: string;
  thumbnailUrl?: string;
  used_by_videos?: number;
  usedByVideos?: number;
  duration: string;
  audio_url?: string;
}

interface MusicListProps {
  tracks: MusicTrack[];
}

const MusicList = ({ tracks }: MusicListProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (track: MusicTrack) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (track.audio_url) {
      const audio = new Audio(track.audio_url);
      audio.play();
      audio.onended = () => setPlayingId(null);
      audioRef.current = audio;
      setPlayingId(track.id);
    }
  };

  if (tracks.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <Music2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có nhạc nào</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {tracks.map((track, index) => {
        const isPlaying = playingId === track.id;
        return (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-all duration-300 cursor-pointer animate-fade-in group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-soft group-hover:shadow-medium transition-shadow">
              <img
                src={track.thumbnail_url || track.thumbnailUrl}
                alt={track.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <div className={`w-10 h-10 rounded-full ${isPlaying ? 'bg-red-500' : 'gradient-primary'} flex items-center justify-center shadow-glow`}>
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate transition-colors ${isPlaying ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{track.title}</h3>
              <p className="text-sm text-muted-foreground">
                {track.used_by_videos ?? track.usedByVideos ?? 0} video sử dụng
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{track.duration}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
              <button className="p-2.5 hover:bg-muted rounded-xl transition-colors">
                <Bookmark className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2.5 hover:bg-muted rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MusicList;
