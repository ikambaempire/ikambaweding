import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import StorySection from "@/components/StorySection";
import FeaturedWork from "@/components/FeaturedWork";
import ServicesPreview from "@/components/ServicesPreview";
import QuoteSection from "@/components/QuoteSection";
import PricingPreview from "@/components/PricingPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <StorySection />
      <FeaturedWork />
      <ServicesPreview />
      <QuoteSection />
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
