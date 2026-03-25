import { motion } from "framer-motion";
import { BookOpenCheck, Sparkles, Volume2, BarChart3, Heart, GraduationCap } from "lucide-react";

const features = [
  { icon: BookOpenCheck, label: "Story-based learning", desc: "Stories designed to make reading feel inviting and natural." },
  { icon: Sparkles, label: "Beginner-friendly reading flow", desc: "A simple experience for children just starting out." },
  { icon: Volume2, label: "Visual and sound support", desc: "Pictures, prompts, and audio-friendly learning support." },
  { icon: BarChart3, label: "Progress-ready design", desc: "Built to support future reading levels, milestones, and tracking." },
  { icon: Heart, label: "Parent-friendly experience", desc: "Easy for families to use at home." },
  { icon: GraduationCap, label: "School-friendly structure", desc: "Useful for teachers, tutors, and literacy programs." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28">
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
              className="bg-card rounded-2xl p-5 shadow-soft border border-border"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{f.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
