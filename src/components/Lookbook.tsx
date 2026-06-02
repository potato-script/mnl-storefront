import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LOOKBOOK_CAMPAIGNS from "../data/lookbookData.json";

export default function Lookbook() {
  const [activeSeason, setActiveSeason] = useState("SS26");

  const filteredCampaigns = LOOKBOOK_CAMPAIGNS.filter(
    (item) => item.season === activeSeason,
  );

  const getGridStyles = (itemSize: string, _index?: number) => {
    if (activeSeason === "AW25" || activeSeason === "PRE-FALL") {
      return "md:col-span-6 aspect-[4/5]";
    }
    switch (itemSize) {
      case "small-tall":
        return "md:col-span-4 aspect-[3/4]";
      case "small-wide":
        return "md:col-span-5 aspect-[4/3] md:self-end";
      case "medium":
        return "md:col-span-7 aspect-[16/10]";
      case "large":
      default:
        return "md:col-span-8 aspect-[4/3]";
    }
  };

  return (
    <section
      id="lookbook"
      className="bg-[#0D0D0D] py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
              Visual Campaign Archives
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-white">
              EDITORIAL <br className="hidden sm:inline" />
              LOOKBOOK
            </h2>
          </div>

          <div className="flex bg-[#121212] p-1.5 rounded-xl border border-white/5 font-mono text-[10px] tracking-widest uppercase">
            {["AW25", "SS26", "PRE-FALL"].map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeSeason === season
                    ? "bg-white text-[#0D0D0D] font-bold shadow-md"
                    : "text-[#8A8A8A] hover:text-white"
                }`}>
                {season}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-h-125">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((item, index) => {
              const currentGridStyles = getGridStyles(item.size, index);

              return (
                <a
                  href={`/lookbook/${item.id}`}
                  key={item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${currentGridStyles} block`}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative w-full h-full overflow-hidden bg-[#161616] rounded-2xl border border-white/5 flex flex-col justify-end cursor-pointer">
                    <div className="absolute inset-0 w-full h-full z-0 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 ease-out">
                      <img
                        src={`${item.image}&auto=format&fm=webp&q=80`}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>

                    <div className="relative z-10 p-6 md:p-8 w-full flex items-end justify-between transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase block">
                          {item.subtitle}
                        </span>
                        <h3 className="font-display font-black text-lg md:text-2xl text-white tracking-tight">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[10px] text-white block pt-1">
                          📍 {item.location}
                        </span>
                      </div>

                      <div className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center bg-[#0D0D0D]/80 backdrop-blur-xs text-[#8A8A8A] group-hover:bg-white group-hover:text-[#0D0D0D] group-hover:border-white transition-all duration-500 transform group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </a>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
