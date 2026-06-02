import React from "react";

interface FooterProps {
  onNavigate?: (view: "home" | "collections" | "story") => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: "home" | "collections" | "story",
    hash?: string,
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0D0D0D] text-white border-t border-white/5 font-sans antialiased pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-display font-black text-2xl tracking-tighter text-white uppercase">
              MNL<span className="text-[#D4AF37]">.</span>
            </h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed max-w-sm">
              Architectural streetwear forged against the asphalt matrix of
              Quezon City. Built to outlast trends, engineered for utility.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-[#666666] uppercase font-bold">
              Directory
            </p>
            <ul className="space-y-2 text-xs font-medium text-[#8A8A8A]">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, "home")}
                  className="hover:text-white transition-colors cursor-pointer">
                  Home Base
                </a>
              </li>
              <li>
                <a
                  href="/#shop"
                  onClick={(e) => handleLinkClick(e, "home", "shop")}
                  className="hover:text-white transition-colors cursor-pointer">
                  Shop Capsules
                </a>
              </li>
              <li>
                <a
                  href="/#lookbook"
                  onClick={(e) => handleLinkClick(e, "home", "lookbook")}
                  className="hover:text-white transition-colors cursor-pointer">
                  Lookbook Archives
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-[#666666] uppercase font-bold">
              Catalog
            </p>
            <ul className="space-y-2 text-xs font-medium text-[#8A8A8A]">
              <li>
                <a
                  href="/collections"
                  onClick={(e) => handleLinkClick(e, "collections")}
                  className="hover:text-white transition-colors cursor-pointer">
                  All Collections
                </a>
              </li>
              <li>
                <a
                  href="/story"
                  onClick={(e) => handleLinkClick(e, "story")}
                  className="hover:text-white transition-colors cursor-pointer">
                  Editorial Story
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-[10px] text-[#666666] tracking-wider uppercase">
            © {currentYear} Mark Andrew (Potato) Duza. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-[#444444] tracking-widest uppercase">
            MNL CLOTHING // DESIGNED LOCALLY
          </p>
        </div>
      </div>
    </footer>
  );
}
