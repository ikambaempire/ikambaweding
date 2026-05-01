
INSERT INTO public.packages (name, subtitle, price, features, is_popular, is_published, sort_order)
SELECT * FROM (VALUES
  ('Essential', 'Perfect for intimate ceremonies', 'Contact Us',
   ARRAY['4 Hours Coverage','1 Photographer','200+ Edited Photos','Online Gallery','Digital Delivery','Basic Retouching'],
   false, true, 1),
  ('Premium', 'Our most popular package', 'Contact Us',
   ARRAY['8 Hours Coverage','2 Photographers','500+ Edited Photos','Wedding Film (5-10 min)','Drone Coverage','Photo Album (30 pages)','Online Gallery','Advanced Retouching'],
   true, true, 2),
  ('Luxury', 'The complete wedding experience', 'Contact Us',
   ARRAY['Full Day Coverage','3 Photographers + Videographer','Unlimited Photos','Cinematic Film (15-20 min)','Drone + Same-Day Edit','Premium Album (50 pages)','Framed Prints (3)','Engagement Session Included','Online Gallery','Priority Delivery'],
   false, true, 3)
) AS v(name, subtitle, price, features, is_popular, is_published, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.packages);
