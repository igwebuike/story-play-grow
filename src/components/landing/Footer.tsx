import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-display font-extrabold text-foreground">BeautifulMinds</span>
          </div>
          <p className="text-sm text-muted-foreground">Empowering confident readers worldwide.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#schools" className="hover:text-foreground transition-colors">Schools</a>
            <a href="#parents" className="hover:text-foreground transition-colors">Parents</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
