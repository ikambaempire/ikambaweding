
-- Create wedding_folders table
CREATE TABLE public.wedding_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  access_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wedding_folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Folders are publicly viewable" ON public.wedding_folders
  FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert folders" ON public.wedding_folders
  FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update folders" ON public.wedding_folders
  FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete folders" ON public.wedding_folders
  FOR DELETE TO public USING (true);

-- Add folder_id and category to media table
ALTER TABLE public.media ADD COLUMN folder_id UUID REFERENCES public.wedding_folders(id) ON DELETE CASCADE;
ALTER TABLE public.media ADD COLUMN category TEXT NOT NULL DEFAULT 'uncategorized';

-- Allow updates on media
CREATE POLICY "Anyone can update media" ON public.media
  FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  package TEXT NOT NULL,
  venue TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bookings" ON public.bookings
  FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can view bookings" ON public.bookings
  FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update bookings" ON public.bookings
  FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete bookings" ON public.bookings
  FOR DELETE TO public USING (true);
