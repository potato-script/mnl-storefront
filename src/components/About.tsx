import { ArrowRight } from "lucide-react";

interface AboutProps {
  onReadStory?: () => void;
}

export default function About({ onReadStory }: AboutProps) {
  return (
    <section
      id="about"
      className="bg-[#0D0D0D] py-24 border-t border-white/5 scroll-mt-20 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#121212] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="relative col-span-1 md:col-span-6 min-h-80 md:min-h-125 bg-[#161616] flex flex-col items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-white/5 group overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80"
                alt="Manila Street Editorial Context"
                loading="lazy"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 p-8 md:p-16 flex flex-col justify-between bg-[#111111]">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D4AF37]" />
                <span className="font-mono text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  Our Story
                </span>
              </div>

              <h3 className="font-display font-extrabold italic text-2xl md:text-4xl text-white tracking-tight leading-tight">
                “The city doesn't wait. <br />
                <span className="text-[#D4AF37]">Neither do we.”</span>
              </h3>

              <div className="space-y-4 font-sans text-sm text-[#8A8A8A] leading-relaxed tracking-wide">
                <p className="hidden md:block">
                  Born from the streets of Quezon City, MNL Clothing was built
                  for those who move with quiet confidence. Not chasing trends —
                  setting them. Every piece is designed with intention, crafted
                  for those who know what they want before it's popular.
                </p>
                <p className="block md:hidden">
                  Born from the streets of QC. Built for those who move with
                  quiet confidence and dress with intention.
                </p>
              </div>

              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (onReadStory) onReadStory();
                }}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white hover:text-[#D4AF37] transition-colors font-bold uppercase pt-2 group cursor-pointer">
                Read Our Full Story
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="hidden md:flex items-center gap-12 border-t border-white/5 pt-10 mt-12">
              <div className="space-y-1">
                <p className="font-display font-black text-2xl text-white tracking-tight">
                  2024
                </p>
                <p className="font-mono text-[9px] tracking-widest text-[#666] uppercase">
                  Founded in QC
                </p>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div className="space-y-1">
                <p className="font-display font-black text-2xl text-[#D4AF37] tracking-tight">
                  100%
                </p>
                <p className="font-mono text-[9px] tracking-widest text-[#666] uppercase">
                  Local Brand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
