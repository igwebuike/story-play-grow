import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Library, BookOpen, Globe, BookMarked, Search } from "lucide-react";

const sources = [
  {
    icon: Globe,
    name: "African Storybook",
    desc: "A powerful collection of free children's storybooks with strong African cultural representation and multiple African languages. Ideal for early reading and local relevance.",
    tags: ["African stories", "multilingual", "child literacy"],
    link: "#library-african-storybook",
  },
  {
    icon: BookOpen,
    name: "StoryWeaver",
    desc: "A large free children's story platform with illustrated books for early readers across many languages and reading levels.",
    tags: ["leveled stories", "illustrated", "literacy-first"],
    link: "#library-storyweaver",
  },
  {
    icon: Library,
    name: "Open Library",
    desc: "A broad open book catalog that can support expanded discovery of children's books and classics.",
    tags: ["open catalog", "children's books", "discovery"],
    link: "#library-open-library",
  },
  {
    icon: BookMarked,
    name: "Project Gutenberg",
    desc: "A public domain source for classic children's literature and timeless stories.",
    tags: ["classics", "public domain", "free books"],
    link: "#library-gutenberg",
  },
  {
    icon: Search,
    name: "Google Books free ebook discovery",
    desc: "Useful for metadata, discovery, and selected free ebook availability where applicable.",
    tags: ["discovery", "metadata", "free ebooks"],
    link: "#library-google-books",
  },
];

const LibrarySection = () => {
  return (
    <section id="library" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            A Growing Library for <span className="text-gradient-primary">Young Readers</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            BeautifulMinds is being designed to connect children with engaging, age-appropriate reading content — including free storybooks, public domain classics, and African children's stories.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sources.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-background rounded-2xl p-6 shadow-soft border border-border flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-4 text-primary font-display font-semibold self-start rounded-full">
                <a href={s.link}>Explore Source →</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          Content availability may vary by source. BeautifulMinds will curate beginner-friendly reading experiences rather than simply listing books.
        </motion.p>
      </div>
    </section>
  );
};

export default LibrarySection;
