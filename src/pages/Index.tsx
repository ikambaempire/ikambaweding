import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import PricingPreview from "@/components/PricingPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <PricingPreview />
      <CTASection />
      <Footer />
      <Link
        to="/admin"
        className="fixed bottom-4 right-4 z-10 text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
      >
        Admin
      </Link>
    </div>
  );
};

export default Index;
