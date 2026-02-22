import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AudienceSection from "@/components/landing/AudienceSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import OfferSection from "@/components/landing/OfferSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AudienceSection />
        <TestimonialSection />
        <OfferSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
