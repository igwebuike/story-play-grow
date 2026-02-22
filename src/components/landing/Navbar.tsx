import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2 font-display font-extrabold text-xl text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          BeautifulMinds
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#parents" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Parents</a>
          <a href="#schools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Schools</a>
          <Button size="sm" className="bg-gradient-hero text-primary-foreground shadow-hero font-display font-bold rounded-full px-6">
            Get Early Access
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>How It Works</a>
              <a href="#features" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Features</a>
              <a href="#parents" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Parents</a>
              <a href="#schools" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Schools</a>
              <Button className="bg-gradient-hero text-primary-foreground font-display font-bold rounded-full w-full">Get Early Access</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
