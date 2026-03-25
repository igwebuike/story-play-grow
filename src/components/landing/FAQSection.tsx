import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is BeautifulMinds?",
    a: "BeautifulMinds is a joyful early reading platform that helps children learn to read through stories, sounds, pictures, and play — using a simple, step-by-step approach designed for beginners.",
  },
  {
    q: "Who is it for?",
    a: "It is designed for parents, schools, tutors, and literacy partners who want to help young children build reading confidence in a warm, encouraging way.",
  },
  {
    q: "Will it include African storybooks?",
    a: "Yes. The platform is being designed to include free children's story sources, including African story content, culturally relevant reading materials, and multilingual story collections.",
  },
  {
    q: "Is it only for schools?",
    a: "No. BeautifulMinds is built for both families and schools. Parents can use it at home, and educators can use it in classrooms or tutoring settings.",
  },
  {
    q: "Can parents join early?",
    a: "Absolutely. We are opening early access to parents, families, and caregivers who want to give their children a joyful head start in reading.",
  },
  {
    q: "Are the books free?",
    a: "BeautifulMinds curates content from trusted free and open sources. Availability may vary, but the goal is to make quality reading content accessible to as many children as possible.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-3xl md:text-4xl text-foreground text-center"
        >
          Frequently Asked <span className="text-gradient-primary">Questions</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-2xl border border-border px-5"
              >
                <AccordionTrigger className="font-display font-bold text-foreground text-left hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
