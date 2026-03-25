import { motion } from "framer-motion";
import { Sparkles, Footprints, HandHeart } from "lucide-react";

const cards = [
  {
    icon: Sparkles,
    title: "Stories that spark curiosity",
    text: "Children engage more when reading begins with delight, imagination, and familiarity.",
    bg: "bg-accent/20",
    iconColor: "text-accent-foreground",
  },
  {
    icon: Footprints,
    title: "Guided learning in small steps",
    text: "BeautifulMinds supports early readers with simple, structured progress they can build on.",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: HandHeart,
    title: "Support for home and school",
    text: "Parents and educators can use the same system to encourage reading with confidence.",
    bg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

const BetterWaySection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            A Better Way to <span className="text-gradient-primary">Begin Reading</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Most children do not struggle because they cannot learn. They struggle because reading is often introduced with too much pressure and too little joy.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${card.bg} rounded-3xl p-7 text-center`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card shadow-soft mb-4">
                <card.icon className={`h-7 w-7 ${card.iconColor}`} />
              </div>
              <h3 className="font-display font-extrabold text-lg text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BetterWaySection;
