import { motion } from "framer-motion";
import { Camera, Award, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const stats = [
  { icon: Camera, value: "500+", label: "Weddings Covered" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Heart, value: "100%", label: "Happy Couples" },
  { icon: Users, value: "10+", label: "Team Members" },
];

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20 pb-12">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ikamba Wedding is a premier wedding photography and cinematography studio based in Kigali, Rwanda. 
            We are passionate about telling love stories through stunning visuals that couples will cherish for a lifetime.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card border border-border rounded-xl p-6"
            >
              <s.icon size={28} className="text-primary mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our <span className="text-primary">Story</span></h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a passion for capturing the beauty of love, Ikamba Wedding has grown to become one of Rwanda's most trusted wedding coverage teams. We believe every wedding is unique, and our approach reflects that — no two wedding films or photo collections look the same.
              </p>
              <p>
                Our team combines artistic vision with technical expertise, using the latest equipment and techniques to deliver stunning results. From intimate ceremonies to grand celebrations, we adapt our style to match your vision.
              </p>
              <p>
                We take pride in our work and the relationships we build with every couple. Your trust means everything to us, and we strive to exceed expectations with every project.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <CTASection />
    <Footer />
  </div>
);

export default AboutPage;
