import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp, ShoppingBag, User } from "lucide-react";

interface NavbarProps {
  currentView?: "home" | "collections";
  onNavigate?: (view: "home" | "collections") => void;
}

export default function Navbar({
  currentView = "home",
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const navLinks = [
    { label: "Featured", href: "#shop", view: "home" as const },
    { label: "Lookbook", href: "#lookbook", view: "home" as const },
    { label: "About", href: "#about", view: "home" as const },
    { label: "Contact", href: "#contact", view: "home" as const },
  ];

  useEffect(() => {
    if (currentView === "collections") {
      setActiveLink("Collections");
    } else {
      setActiveLink(null);
    }
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    let observer: IntersectionObserver;

    if (currentView === "home") {
      const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentView === "home") {
            const id = entry.target.getAttribute("id");
            const matchingLink = navLinks.find(
              (link) => link.href === `#${id}`,
            );
            if (matchingLink) {
              setActiveLink(matchingLink.label);
            }
          }
        });
      }, observerOptions);

      navLinks.forEach((link) => {
        if (link.href.startsWith("#")) {
          const el = document.getElementById(link.href.replace("#", ""));
          if (el) observer.observe(el);
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, [currentView]);

  const handleLinkClick = (link: (typeof navLinks)[number]) => {
    setIsMobileMenuOpen(false);
    setActiveLink(link.label);

    if (onNavigate) {
      onNavigate(link.view);
    }

    if (link.view === "home") {
      setTimeout(() => {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentView === "home") {
      setActiveLink(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,backdrop-filter] duration-300 ${
          isScrolled
            ? "bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6 border-b border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              if (onNavigate) onNavigate("home");
            }}
            className="font-display font-extrabold text-xl tracking-tighter text-white z-50">
            MNL
            <span className="font-display font-extrabold text-xl tracking-tighter text-[#D4AF37]">
              Clothing
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 font-sans text-xs uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className={`transition-colors duration-300 relative py-1 ${
                  activeLink === link.label
                    ? "text-white font-medium"
                    : "text-[#8A8A8A] hover:text-white"
                }`}>
                {link.label}
                {activeLink === link.label && (
                  <motion.span
                    layoutId="desktopActiveUnderline"
                    className="absolute bottom-0 left-0 w-full h-px bg-[#D4AF37]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6 text-white border-l border-white/10 pl-6">
            <button className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer group">
              <ShoppingBag
                className="w-4 h-4 group-hover:scale-105 transition-transform"
                strokeWidth={2}
              />
              <span className="font-mono text-xs tracking-wider">(0)</span>
            </button>
            <button
              className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
              aria-label="Account">
              <User className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 md:hidden p-1 focus:outline-none z-50"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}>
            <AnimatePresence mode="wait">
              {!isMobileMenuOpen ? (
                <motion.div
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="close-icon"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
                className="absolute top-full left-0 right-0 mt-4 mx-6 p-6 bg-[#0D0D0D]/95 backdrop-blur-lg border border-white/5 rounded-b-2xl rounded-t-none flex flex-col justify-between min-h-95 md:hidden z-40 shadow-2xl shadow-black/50">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#8A8A8A] uppercase block mb-4">
                    Navigate
                  </span>
                  <div className="w-full h-px bg-white/5 mb-4" />

                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link);
                        }}
                        className={`font-display text-xl tracking-tight transition-colors duration-300 w-fit ${
                          activeLink === link.label
                            ? "text-[#D4AF37] font-medium"
                            : "text-white hover:text-[#D4AF37]"
                        }`}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 space-y-4">

                  <div className="flex items-center justify-between gap-4">
                    <button className="flex items-center gap-3 text-white hover:text-[#D4AF37] text-sm font-sans tracking-wide transition-colors">
                      <User
                        className="w-4 h-4 text-[#8A8A8A]"
                        strokeWidth={2}
                      />
                      <span>Account Profile</span>
                    </button>

                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3.5 py-2 rounded-xl transition-all text-xs font-mono">
                      <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>Cart: 0</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-12 p-3.5 bg-[#1A1A1A]/80 hover:bg-white text-white hover:text-[#0D0D0D] border border-white/10 rounded-full cursor-pointer backdrop-blur-md transition-colors duration-300 shadow-xl"
            aria-label="Scroll to top">
            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
