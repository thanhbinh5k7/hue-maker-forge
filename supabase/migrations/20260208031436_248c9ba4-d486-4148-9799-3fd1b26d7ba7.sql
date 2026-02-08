-- Create threads table for thread-style posts (text + images)
CREATE TABLE public.threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view threads" 
ON public.threads 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage threads" 
ON public.threads 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_threads_updated_at
BEFORE UPDATE ON public.threads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add audio_url column to music_tracks for MP3 files
ALTER TABLE public.music_tracks 
ADD COLUMN audio_url TEXT DEFAULT '';

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio', 'audio', true);

-- Storage policies for audio uploads
CREATE POLICY "Audio files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio');

CREATE POLICY "Authenticated users can upload audio" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Authenticated users can delete audio" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'audio');