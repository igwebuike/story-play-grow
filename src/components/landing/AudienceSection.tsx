import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Check } from "lucide-react";

const AudienceSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            id="parents"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background border border-border rounded-3xl p-8 md:p-10"
          >
            <Heart className="h-8 w-8 text-primary mb-4" />
            <span className="text-xs font-display font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">Parents & Schools</span>
            <h3 className="mt-4 font-display font-extrabold text-2xl text-foreground">For Parents</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Help your child build reading confidence at home with a simple, joyful starting point.
            </p>
            <ul className="mt-4 space-y-2">
              {["Easy to begin", "Child-friendly experience", "Encouraging, not overwhelming"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 bg-gradient-hero text-primary-foreground font-display font-bold rounded-full px-6 shadow-hero hover:opacity-90 transition-opacity"
            >
              <a href="#early-access">Join Parent Early Access</a>
            </Button>
          </motion.div>

          <motion.div
            id="schools"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background border border-border rounded-3xl p-8 md:p-10"
          >
            <GraduationCap className="h-8 w-8 text-secondary mb-4" />
            <span className="text-xs font-display font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">Schools & Educators</span>
            <h3 className="mt-4 font-display font-extrabold text-2xl text-foreground">For Schools & Educators</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Support early readers with a warm, structured platform designed for guided use in classrooms, tutoring, and literacy support settings.
            </p>
            <ul className="mt-4 space-y-2">
              {["Early-reader friendly", "Flexible for schools and tutors", "Built for future scale"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="mt-6 border-secondary text-secondary font-display font-bold rounded-full px-6 hover:bg-secondary/10 transition-colors"
            >
              <a href="#partners">Partner With Us</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
