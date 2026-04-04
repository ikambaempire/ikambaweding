
-- Create media table to track uploaded files
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public read access
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Everyone can view media
CREATE POLICY "Media is publicly viewable" ON public.media FOR SELECT USING (true);

-- Only authenticated or anonymous can insert (we'll handle admin check in app)
CREATE POLICY "Anyone can insert media" ON public.media FOR INSERT WITH CHECK (true);

-- Anyone can delete media (admin-gated in app)
CREATE POLICY "Anyone can delete media" ON public.media FOR DELETE USING (true);

-- Create public storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit) VALUES ('media', 'media', true, 4294967296);

-- Allow public read access to media bucket
CREATE POLICY "Media files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Allow uploads to media bucket
CREATE POLICY "Anyone can upload media files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');

-- Allow deletes from media bucket
CREATE POLICY "Anyone can delete media files" ON storage.objects FOR DELETE USING (bucket_id = 'media');
