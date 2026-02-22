import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
          <blockquote className="font-display font-bold text-xl md:text-2xl text-foreground leading-relaxed italic">
            "This method helped a child who couldn't read start reading confidently in weeks."
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">— Early tester, parent of a 5-year-old</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
