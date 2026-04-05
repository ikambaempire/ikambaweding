import { motion } from "framer-motion";
import { Camera, Video, Heart, Sparkles, Users, Calendar, Palette, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const allServices = [
  { icon: Camera, title: "Wedding Photography", desc: "Professional photography capturing every precious moment — from the first look to the last dance. We blend candid and posed styles for a complete visual story." },
  { icon: Video, title: "Wedding Cinematography", desc: "Cinematic wedding films that capture the emotions, sounds, and atmosphere of your special day. Delivered in stunning 4K resolution." },
  { icon: Heart, title: "Pre-Wedding Shoots", desc: "Romantic engagement and pre-wedding sessions at beautiful locations. Perfect for save-the-date cards and wedding invitations." },
  { icon: Sparkles, title: "Traditional Ceremonies", desc: "Specialized coverage of traditional Rwandan wedding ceremonies, preserving the beauty of cultural celebrations." },
  { icon: Users, title: "Bridal & Couple Portraits", desc: "Stunning studio and outdoor portraits for the bride, groom, and couple. Creative compositions with professional lighting." },
  { icon: Calendar, title: "Full Day Coverage", desc: "Comprehensive coverage from morning preparations through the ceremony, reception, and evening celebrations." },
  { icon: Palette, title: "Photo Editing & Retouching", desc: "Professional color grading and retouching to ensure every image looks its absolute best while maintaining a natural feel." },
  { icon: Music, title: "Highlight Films", desc: "Short-form cinematic highlight films perfect for sharing on social media, capturing the essence of your wedding day in 3-5 minutes." },
];

const ServicesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20 pb-12">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Everything you need to capture and preserve your wedding memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {allServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <CTASection />
    <Footer />
  </div>
);

export default ServicesPage;
