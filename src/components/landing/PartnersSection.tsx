import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Handshake } from "lucide-react";

const partnerCards = [
  {
    icon: Users,
    title: "Families joining early access",
    desc: "Be among the first families to try BeautifulMinds and help shape the experience.",
    cta: "Join as a Family",
    href: "#early-access",
  },
  {
    icon: GraduationCap,
    title: "Schools and educators piloting the experience",
    desc: "Bring joyful early reading to your classroom or tutoring program.",
    cta: "Pilot With Us",
    href: "#early-access",
  },
  {
    icon: Handshake,
    title: "Literacy and reading partners",
    desc: "Collaborate with us on expanding access to quality reading experiences.",
    cta: "Partner With Us",
    href: "#early-access",
  },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            Built for Thoughtful <span className="text-gradient-primary">Early Growth</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            BeautifulMinds is starting small and intentionally. We are opening early access bit by bit to families, schools, educators, and literacy-minded partners who want to help children learn to read with joy.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {partnerCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-soft text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mt-4 text-primary font-display font-semibold rounded-full"
              >
                <a href={card.href}>{card.cta} →</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
