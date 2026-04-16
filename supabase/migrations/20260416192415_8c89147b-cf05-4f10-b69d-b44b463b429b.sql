CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subtitle text,
  price text NOT NULL DEFAULT 'Contact Us',
  features text[] NOT NULL DEFAULT '{}',
  is_popular boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert packages" ON public.packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update packages" ON public.packages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete packages" ON public.packages FOR DELETE USING (true);

INSERT INTO public.packages (name, subtitle, price, features, is_popular, sort_order) VALUES
('Essential', 'Perfect for intimate ceremonies', 'Contact Us', ARRAY['4 Hours Coverage','1 Photographer','200+ Edited Photos','Online Gallery','Digital Delivery','Basic Retouching'], false, 1),
('Premium', 'Our most popular package', 'Contact Us', ARRAY['8 Hours Coverage','2 Photographers','500+ Edited Photos','Wedding Film (5-10 min)','Drone Coverage','Photo Album (30 pages)','Online Gallery','Advanced Retouching'], true, 2),
('Luxury', 'The complete wedding experience', 'Contact Us', ARRAY['Full Day Coverage','3 Photographers + Videographer','Unlimited Photos','Cinematic Film (15-20 min)','Drone + Same-Day Edit','Premium Album (50 pages)','Framed Prints (3)','Engagement Session Included','Online Gallery','Priority Delivery'], false, 3);