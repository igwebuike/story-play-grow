import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import BetterWaySection from "@/components/landing/BetterWaySection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LibrarySection from "@/components/landing/LibrarySection";
import AfricanStoriesSection from "@/components/landing/AfricanStoriesSection";
import AudienceSection from "@/components/landing/AudienceSection";
import PartnersSection from "@/components/landing/PartnersSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BetterWaySection />
        <HowItWorksSection />
        <FeaturesSection />
        <LibrarySection />
        <AfricanStoriesSection />
        <AudienceSection />
        <PartnersSection />
        <WaitlistSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
