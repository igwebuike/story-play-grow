import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roles = ["I'm a Parent", "I'm a School / Educator", "I'm a Partner"];

const WaitlistSection = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <section id="early-access" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
            Join the <span className="text-gradient-primary">Early Access</span> List
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We are onboarding families, schools, and partners step by step. Join the list to get updates as BeautifulMinds grows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 max-w-md mx-auto"
        >
          {/* Role selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`text-sm font-display font-semibold px-4 py-2 rounded-full border transition-colors ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Placeholder form — replace action with real endpoint */}
          <form
            action="#early-access-submit"
            method="POST"
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="rounded-xl h-12 font-body"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="rounded-xl h-12 font-body"
            />
            <Input
              type="text"
              name="organization"
              placeholder="Organization (optional)"
              className="rounded-xl h-12 font-body"
            />
            {/* Hidden field for role */}
            <input type="hidden" name="role" value={selectedRole} />

            <Button
              type="submit"
              size="lg"
              className="mt-2 bg-gradient-hero text-primary-foreground font-display font-bold rounded-full h-14 shadow-hero hover:opacity-90 transition-opacity w-full"
            >
              Join Early Access
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            We are rolling out carefully so we can onboard people well, one step at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
