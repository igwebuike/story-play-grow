import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, BookOpen, Star } from "lucide-react";

const perks = [
  { icon: Gift, label: "Free starter reading pack" },
  { icon: BookOpen, label: "First story library access" },
  { icon: Star, label: "Founding member pricing" },
];

const OfferSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-gradient-hero rounded-3xl p-8 md:p-12 text-center text-primary-foreground shadow-hero"
        >
          <p className="text-3xl mb-2">🎁</p>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl">Early users get:</h2>
          <div className="mt-6 flex flex-col gap-3">
            {perks.map((p) => (
              <div key={p.label} className="flex items-center justify-center gap-3">
                <p.icon className="h-5 w-5 opacity-80" />
                <span className="font-display font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="mt-8 bg-card text-foreground font-display font-bold rounded-full px-8 text-base h-14 hover:bg-card/90 transition-colors shadow-card"
          >
            Join Early Access List
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
