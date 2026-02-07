-- Add contact_url field to profile_settings for Message button
ALTER TABLE public.profile_settings 
ADD COLUMN IF NOT EXISTS contact_url text DEFAULT '';

-- Update existing row with empty contact_url
UPDATE public.profile_settings SET contact_url = '' WHERE contact_url IS NULL;