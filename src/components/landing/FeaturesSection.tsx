import { motion } from "framer-motion";
import { BookOpenCheck, Mic, Gamepad2, Library, Printer, BarChart3 } from "lucide-react";

const features = [
  { icon: BookOpenCheck, label: "Interactive reading lessons" },
  { icon: Mic, label: "Voice practice feedback" },
  { icon: Gamepad2, label: "Fun learning games" },
  { icon: Library, label: "Digital story library" },
  { icon: Printer, label: "Printable worksheets" },
  { icon: BarChart3, label: "Parent progress dashboard" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-3xl md:text-4xl text-foreground text-center"
        >
          Everything Your Child <span className="text-gradient-primary">Needs</span>
        </motion.h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-4 bg-background rounded-2xl p-5 shadow-soft"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
