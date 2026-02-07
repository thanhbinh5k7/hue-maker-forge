-- Create profile settings table (single row for main profile)
CREATE TABLE public.profile_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL DEFAULT 'One',
  username TEXT NOT NULL DEFAULT 'user',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  following INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  website_url TEXT DEFAULT '',
  is_top BOOLEAN DEFAULT false,
  has_subscription BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thumbnail_url TEXT NOT NULL,
  is_video BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create music tracks table
CREATE TABLE public.music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  used_by_videos INTEGER DEFAULT 0,
  duration TEXT DEFAULT '01:00',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payment info table
CREATE TABLE public.payment_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name TEXT DEFAULT '',
  account_number TEXT DEFAULT '',
  account_holder TEXT DEFAULT '',
  momo_number TEXT DEFAULT '',
  zalopay_number TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_info ENABLE ROW LEVEL SECURITY;

-- Public read policies (everyone can view profile data)
CREATE POLICY "Anyone can view profile settings" 
ON public.profile_settings FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view posts" 
ON public.posts FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view music tracks" 
ON public.music_tracks FOR SELECT 
USING (true);

-- Payment info is private - only authenticated admins can view
CREATE POLICY "Only authenticated can view payment" 
ON public.payment_info FOR SELECT 
TO authenticated
USING (true);

-- Admin write policies
CREATE POLICY "Authenticated users can update profile settings" 
ON public.profile_settings FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert profile settings" 
ON public.profile_settings FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage posts" 
ON public.posts FOR ALL 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage music" 
ON public.music_tracks FOR ALL 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage payment" 
ON public.payment_info FOR ALL 
TO authenticated
USING (true);

-- Insert default profile settings
INSERT INTO public.profile_settings (display_name, username, bio, following, followers, likes, is_top, has_subscription)
VALUES ('One', 'tb__________________tb', '@✳️', 90, 154000, 154800, true, true);

-- Insert default payment info
INSERT INTO public.payment_info (bank_name, account_number, account_holder)
VALUES ('', '', '');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profile_settings_updated_at
BEFORE UPDATE ON public.profile_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_info_updated_at
BEFORE UPDATE ON public.payment_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();