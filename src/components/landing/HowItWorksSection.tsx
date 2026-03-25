import { motion } from "framer-motion";
import { Search, RefreshCw, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "Step 1",
    title: "Discover",
    description: "Children explore age-appropriate stories, sounds, and picture-based reading activities.",
    bg: "bg-accent/30",
    iconColor: "text-accent-foreground",
  },
  {
    icon: RefreshCw,
    step: "Step 2",
    title: "Practice",
    description: "They build confidence through repetition, word recognition, and playful reading support.",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    step: "Step 3",
    title: "Grow",
    description: "Parents and educators help children continue progressing at a comfortable pace.",
    bg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${s.bg} rounded-3xl p-6 text-center`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card shadow-soft mb-4">
                <s.icon className={`h-7 w-7 ${s.iconColor}`} />
              </div>
              <p className="text-xs font-display font-bold uppercase tracking-wider text-muted-foreground">{s.step}</p>
              <h3 className="mt-1 font-display font-extrabold text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
