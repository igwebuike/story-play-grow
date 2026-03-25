import { BookOpen, Mail, Twitter, Facebook, Instagram } from "lucide-react";

const footerLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#library", label: "Library" },
  { href: "#parents", label: "Parents" },
  { href: "#schools", label: "Schools" },
  { href: "#partners", label: "Partners" },
  { href: "#early-access", label: "Early Access" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-display font-extrabold text-foreground">BeautifulMinds</span>
          </div>

          <p className="text-sm text-muted-foreground">Helping children learn to read with joy.</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#social-twitter" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#social-facebook" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#social-instagram" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#contact-email" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Soft-launching for early access and pilot onboarding
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
