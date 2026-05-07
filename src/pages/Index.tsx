import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import StoryShowcase from "@/components/StoryShowcase";
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
      <StoryShowcase />
      <FeaturedWork />
      <ServicesPreview />
      <QuoteSection />
      <PricingPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
