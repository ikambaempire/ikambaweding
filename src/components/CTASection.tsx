import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

const CTASection = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Ready to Tell Your <span className="text-primary">Love Story</span>?
        </h2>
        <p className="text-muted-foreground mb-8">
          Let's create something beautiful together. Book your wedding coverage today and let us capture every magical moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold" asChild>
            <Link to="/booking">
              <Calendar size={20} className="mr-2" />
              Book Your Date
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-8 py-6 text-base font-semibold" asChild>
            <a href="https://wa.me/250780000000" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} className="mr-2" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
