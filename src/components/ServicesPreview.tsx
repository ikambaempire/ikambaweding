import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Video, Heart, Sparkles, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Camera, title: "Wedding Photography", desc: "Timeless photos capturing every emotion and detail of your special day." },
  { icon: Video, title: "Wedding Cinematography", desc: "Cinematic films that tell the story of your love beautifully." },
  { icon: Heart, title: "Pre-Wedding Shoots", desc: "Beautiful engagement and pre-wedding photography sessions." },
  { icon: Sparkles, title: "Event Coverage", desc: "Complete coverage of ceremonies, receptions, and celebrations." },
  { icon: Users, title: "Bridal Portraits", desc: "Stunning individual and couple portraits to treasure forever." },
  { icon: Calendar, title: "Full Day Coverage", desc: "From preparation to the last dance — we capture it all." },
];

const ServicesPreview = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Professional wedding photography and cinematography services tailored to your vision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-8">
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default ServicesPreview;
