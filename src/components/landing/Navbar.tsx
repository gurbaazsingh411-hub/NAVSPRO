import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HEADER_OFFSET_PX = 80;

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Why Assessment", href: "#why" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.history.replaceState(null, "", href);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NAVSPRO</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="story-link text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              For Schools
            </Button>
            <Button size="sm">Start Assessment</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => onNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    For Schools
                  </Button>
                  <Button className="w-full">Start Assessment</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
