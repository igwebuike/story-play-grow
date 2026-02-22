import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Most children struggle with reading not because they can't learn…
          </p>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
            but because they're taught in ways that{" "}
            <span className="text-secondary">remove curiosity.</span>
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
              <p className="font-display font-bold text-lg text-foreground">
                When reading feels like <span className="text-secondary">pressure</span>,
              </p>
              <p className="mt-1 text-muted-foreground">children shut down.</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
              <p className="font-display font-bold text-lg text-foreground">
                When reading feels like <span className="text-gradient-primary">play</span>,
              </p>
              <p className="mt-1 text-muted-foreground">they open up.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
