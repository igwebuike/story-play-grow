import { motion } from "framer-motion";
import { Sparkles, Image, Volume2, Type, Eye, BookOpen, BookMarked } from "lucide-react";

const steps = [
  { icon: Sparkles, label: "Curiosity-driven stories", color: "text-secondary" },
  { icon: Image, label: "Picture reading", color: "text-primary" },
  { icon: Volume2, label: "Sound recognition", color: "text-accent-foreground" },
  { icon: Type, label: "Letter blends", color: "text-secondary" },
  { icon: Eye, label: "Sight words", color: "text-primary" },
  { icon: BookOpen, label: "Sentence building", color: "text-secondary" },
  { icon: BookMarked, label: "Real story practice", color: "text-primary" },
];

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            BeautifulMinds <span className="text-gradient-primary">fixes that.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our method helps children learn to read naturally through a proven progression:
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 bg-background rounded-2xl p-4 shadow-soft"
            >
              <step.icon className={`h-5 w-5 shrink-0 ${step.color}`} />
              <span className="font-display font-semibold text-sm text-foreground">{step.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-muted-foreground font-display font-semibold"
        >
          It's not guessing. It's a <span className="text-gradient-primary">structured literacy path</span> disguised as fun.
        </motion.p>
      </div>
    </section>
  );
};

export default SolutionSection;
