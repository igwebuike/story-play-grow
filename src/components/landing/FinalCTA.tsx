import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
            Give your child the gift that changes every future opportunity:
          </h2>
          <p className="mt-4 text-xl font-display font-bold text-gradient-primary">
            The ability to read confidently.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-gradient-hero text-primary-foreground font-display font-bold rounded-full px-10 text-base h-14 shadow-hero hover:opacity-90 transition-opacity"
          >
            👉 Start Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
