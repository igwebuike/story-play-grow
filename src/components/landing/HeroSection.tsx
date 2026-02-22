import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-children-reading.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-soft -z-10" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Help Your Child Learn to Read With{" "}
              <span className="text-gradient-primary">Joy</span> — Not Pressure
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-lg">
              BeautifulMinds is a proven step-by-step reading system that turns beginners into confident readers through stories, sounds, pictures, and play.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-hero font-display font-bold rounded-full px-8 text-base h-14 hover:opacity-90 transition-opacity">
                👉 Get Early Access
              </Button>
              <Button variant="ghost" size="lg" className="font-display font-semibold text-primary rounded-full px-8 text-base h-14 hover:bg-primary/5">
                For Schools & Educators <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-card">
              <img
                src={heroImage}
                alt="Happy children reading colorful storybooks together"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent rounded-2xl animate-float opacity-60" />
            <div className="absolute -top-4 -right-4 w-14 h-14 bg-secondary rounded-full animate-float opacity-50" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
