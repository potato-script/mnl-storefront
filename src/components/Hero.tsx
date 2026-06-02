import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react"; 

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80",
];

const TICKER_ITEMS = [
  "STREETWEAR",
  "MADE IN MANILA",
  "SS26 DROP",
  "MNL CLOTHING",
  "MINIMALIST",
  "QUEZON CITY",
  "EDGY",
];

export default function Hero() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex(
        (prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeaturedCollection = () => {
    const targetSection =
      document.getElementById("shop") ||
      document.getElementById("collections-section");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#0D0D0D] overflow-hidden flex flex-col justify-between pt-24">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIndex}
            src={BACKGROUND_IMAGES[currentImgIndex]}
            alt="MNL Campaign Editorial"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-b from-[#0D0D0D]/70 via-transparent to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 my-auto max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#D4AF37] uppercase block mb-4">
            SS26 COLLECTION — MANILA, PH
          </span>

          <h1 className="font-display font-extrabold text-[2.75rem] md:text-[5.5rem] leading-[1.05] text-white tracking-tighter mb-8">
            Wear the <br />
            <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">
              city's
            </span>{" "}
            edge.
          </h1>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToFeaturedCollection();
              }}
              className="px-8 py-4 bg-white text-[#0D0D0D] font-sans font-bold text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#0D0D0D] cursor-pointer z-10">
              VIEW FEATURED ITEMS
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                const lookbookSec = document.getElementById("lookbook");
                if (lookbookSec)
                  lookbookSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-8 py-4 bg-transparent text-white border border-white/20 font-sans font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:border-white hover:bg-white/5 cursor-pointer z-10 flex items-center gap-2">
              <span>View Lookbook</span>

              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-[#0D0D0D] border-y border-white/5 py-4 overflow-hidden select-none">
        <div className="flex w-max min-w-full">
          <div className="animate-marquee-infinite gap-12 whitespace-nowrap pr-12">
            {TICKER_ITEMS.map((item, idx) => (
              <div
                key={`primary-${idx}`}
                className="flex items-center gap-12 font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
                <span>{item}</span>
                <span className="inline-block w-1 h-1 bg-[#D4AF37] rounded-full" />
              </div>
            ))}
          </div>

          <div
            className="animate-marquee-infinite gap-12 whitespace-nowrap pr-12"
            aria-hidden="true">
            {TICKER_ITEMS.map((item, idx) => (
              <div
                key={`duplicate-${idx}`}
                className="flex items-center gap-12 font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
                <span>{item}</span>
                <span className="inline-block w-1 h-1 bg-[#D4AF37] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
