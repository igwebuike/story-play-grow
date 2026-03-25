import { motion } from "framer-motion";
import { BookOpen, Globe2, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, text: "African folktales and moral stories" },
  { icon: Globe2, text: "Multilingual and local-language potential" },
  { icon: Users, text: "Reading experiences that reflect real communities and cultures" },
];

const AfricanStoriesSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
              Stories Children Can <span className="text-gradient-warm">See Themselves In</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              BeautifulMinds aims to include African storybooks and culturally familiar stories so more children can learn with content that feels joyful, relevant, and close to home.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <h.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="font-display font-semibold text-foreground">{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-warm rounded-3xl p-8 md:p-10 text-primary-foreground"
          >
            <p className="text-xs font-display font-bold uppercase tracking-wider opacity-80">Featured Inspiration</p>
            <h3 className="mt-2 font-display font-extrabold text-2xl">African Storybook Collection</h3>
            <p className="mt-3 opacity-90 leading-relaxed">
              A strong foundation for culturally relevant early reading, especially for families, schools, and literacy communities across Africa.
            </p>
            <a
              href="#library-african-storybook"
              className="inline-block mt-6 bg-card text-foreground font-display font-bold rounded-full px-6 py-2.5 text-sm hover:bg-card/90 transition-colors shadow-soft"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AfricanStoriesSection;
