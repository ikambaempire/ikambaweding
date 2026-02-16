import {
  MapPin,
  Camera,
  Video,
  Palette,
  UtensilsCrossed,
  Sparkles,
  Mic,
  Car,
  Speaker,
  CalendarHeart,
} from "lucide-react";

export interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

export const categories: Category[] = [
  { id: "venues", label: "Venues", icon: MapPin, count: 24 },
  { id: "photographers", label: "Photographers", icon: Camera, count: 18 },
  { id: "videographers", label: "Videographers", icon: Video, count: 12 },
  { id: "decorators", label: "Decorators", icon: Palette, count: 15 },
  { id: "catering", label: "Catering", icon: UtensilsCrossed, count: 20 },
  { id: "makeup", label: "Makeup Artists", icon: Sparkles, count: 14 },
  { id: "mc-entertainment", label: "MC & Entertainment", icon: Mic, count: 10 },
  { id: "car-hire", label: "Car Hire", icon: Car, count: 8 },
  { id: "sound-lighting", label: "Sound & Lighting", icon: Speaker, count: 11 },
  { id: "planners", label: "Wedding Planners", icon: CalendarHeart, count: 9 },
];

export interface Vendor {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  location: string;
  featured: boolean;
  description: string;
}

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Inema Gardens",
    category: "venues",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    rating: 4.9,
    reviewCount: 47,
    startingPrice: 500000,
    location: "Kigali",
    featured: true,
    description: "A stunning open-air garden venue perfect for elegant outdoor weddings with panoramic views of the hills of Kigali.",
  },
  {
    id: "2",
    name: "Lens of Love Photography",
    category: "photographers",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600",
    rating: 4.8,
    reviewCount: 62,
    startingPrice: 300000,
    location: "Kigali",
    featured: true,
    description: "Capturing your most precious moments with artistry and passion. Specializing in candid and editorial wedding photography.",
  },
  {
    id: "3",
    name: "Royal Decor Rwanda",
    category: "decorators",
    image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600",
    rating: 4.7,
    reviewCount: 35,
    startingPrice: 400000,
    location: "Kigali",
    featured: true,
    description: "Transforming venues into breathtaking spaces with elegant floral arrangements, draping, and custom decor themes.",
  },
  {
    id: "4",
    name: "Saveur Catering",
    category: "catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    rating: 4.6,
    reviewCount: 28,
    startingPrice: 250000,
    location: "Kigali",
    featured: false,
    description: "Exquisite culinary experiences blending local Rwandan flavors with international cuisine for your special day.",
  },
  {
    id: "5",
    name: "Glow Beauty Studio",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600",
    rating: 4.9,
    reviewCount: 53,
    startingPrice: 150000,
    location: "Kigali",
    featured: true,
    description: "Professional bridal makeup and styling that enhances your natural beauty for a flawless wedding day look.",
  },
  {
    id: "6",
    name: "Kigali Film Studio",
    category: "videographers",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600",
    rating: 4.7,
    reviewCount: 22,
    startingPrice: 350000,
    location: "Kigali",
    featured: false,
    description: "Cinematic wedding films that tell your love story with emotion and artistry, using the latest equipment.",
  },
  {
    id: "7",
    name: "MC King Entertainment",
    category: "mc-entertainment",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600",
    rating: 4.5,
    reviewCount: 19,
    startingPrice: 200000,
    location: "Kigali",
    featured: false,
    description: "High-energy MC and DJ services that keep your guests entertained and the dance floor alive all night.",
  },
  {
    id: "8",
    name: "VIP Rides Rwanda",
    category: "car-hire",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600",
    rating: 4.8,
    reviewCount: 31,
    startingPrice: 180000,
    location: "Kigali",
    featured: true,
    description: "Luxury wedding car hire with chauffeur service. From classic Rolls Royce to modern Mercedes Benz fleet.",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Aline & Jean-Pierre",
    text: "Royal Knot made our wedding planning so effortless. We found the perfect venue and photographer all in one place. The booking process was seamless!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=200",
  },
  {
    id: "2",
    name: "Grace & Patrick",
    text: "As vendors, Royal Knot has transformed our business. We get more bookings and the platform handles everything from inquiries to payments. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200",
  },
  {
    id: "3",
    name: "Diane & Emmanuel",
    text: "The budget tracker and vendor messaging saved us so much time. We planned our entire wedding from our phones. Everything was perfect on our big day!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200",
  },
];
