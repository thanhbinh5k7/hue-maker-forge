-- Add verified_badge_url field to profile_settings for custom badge (blue tick, GIF, etc.)
ALTER TABLE public.profile_settings 
ADD COLUMN IF NOT EXISTS verified_badge_url text DEFAULT '';

-- Update existing row
UPDATE public.profile_settings SET verified_badge_url = '' WHERE verified_badge_url IS NULL;