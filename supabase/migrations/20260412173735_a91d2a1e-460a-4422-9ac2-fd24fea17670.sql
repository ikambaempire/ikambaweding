
-- Credits table
CREATE TABLE public.user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL UNIQUE,
  credits integer NOT NULL DEFAULT 3,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view their credits" ON public.user_credits FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert credits" ON public.user_credits FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update credits" ON public.user_credits FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Generated designs table
CREATE TABLE public.generated_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL,
  event_type text NOT NULL,
  style text NOT NULL,
  names text,
  event_date text,
  location text,
  custom_message text,
  uploaded_images text[] NOT NULL DEFAULT '{}',
  generated_image_url text,
  prompt_used text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.generated_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view designs" ON public.generated_designs FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert designs" ON public.generated_designs FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can delete designs" ON public.generated_designs FOR DELETE TO public USING (true);

-- Storage bucket for invitation uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('invitations', 'invitations', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload invitation images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'invitations');
CREATE POLICY "Anyone can view invitation images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'invitations');
CREATE POLICY "Anyone can delete invitation images" ON storage.objects FOR DELETE TO public USING (bucket_id = 'invitations');
