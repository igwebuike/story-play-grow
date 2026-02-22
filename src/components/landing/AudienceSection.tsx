import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap } from "lucide-react";

const AudienceSection = () => {
  return (
    <section id="parents" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 border border-primary/15 rounded-3xl p-8 md:p-10"
          >
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-display font-extrabold text-2xl text-foreground">For Parents</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Teach your child to read at home — even if you're not a teacher. Our guided system makes it simple.
            </p>
            <Button className="mt-6 bg-gradient-hero text-primary-foreground font-display font-bold rounded-full px-6 shadow-hero hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </motion.div>

          <motion.div
            id="schools"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-secondary/5 border border-secondary/15 rounded-3xl p-8 md:p-10"
          >
            <GraduationCap className="h-8 w-8 text-secondary mb-4" />
            <h3 className="font-display font-extrabold text-2xl text-foreground">For Schools</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              License the BeautifulMinds system and give your students a proven literacy framework that works with your existing devices.
            </p>
            <Button variant="outline" className="mt-6 border-secondary text-secondary font-display font-bold rounded-full px-6 hover:bg-secondary/10 transition-colors">
              Request School Access
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
