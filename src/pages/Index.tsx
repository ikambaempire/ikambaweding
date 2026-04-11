import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import WelcomeSection from "@/components/WelcomeSection";
import FeaturedWork from "@/components/FeaturedWork";
import ServicesPreview from "@/components/ServicesPreview";
import QuoteSection from "@/components/QuoteSection";
import PricingPreview from "@/components/PricingPreview";
import CTASection from "@/components/CTASection";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlideshow />
      <WelcomeSection />
      <FeaturedWork />
      <ServicesPreview />
      <QuoteSection />
      <PricingPreview />
      <CTASection />
      <InstagramCTA />
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
