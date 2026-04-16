import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Camera } from "lucide-react";
import YouTubeBackground from "@/components/YouTubeBackground";
import AnimatedText from "@/components/AnimatedText";
import FloatingIcons from "@/components/FloatingIcons";
import logo from "@/assets/logo.png";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <YouTubeBackground />
    <FloatingIcons />

    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center mb-4"
      >
        <img src={logo} alt="Ikamba Wedding Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight mb-2"
      >
        IKAMBA <span className="text-primary">WEDDING</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-sm md:text-base text-primary-foreground/60 uppercase tracking-[0.3em] mb-6"
      >
        We capture your love story
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mb-10"
      >
        <AnimatedText />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-full" asChild>
          <Link to="/portfolio">
            <Camera size={20} className="mr-2" />
            View Portfolio
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 py-6 rounded-full" asChild>
          <Link to="/booking">
            <Play size={20} className="mr-2" />
            Book Now
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
