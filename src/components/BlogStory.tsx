import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Share2,
  X,
  LucideMessageSquareWarning,
} from "lucide-react";

interface BlogStoryProps {
  onBackToHome?: () => void;
}

export default function BlogStory({ onBackToHome }: BlogStoryProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="bg-[#0D0D0D] min-h-screen text-white pt-32 pb-24 font-sans selection:bg-[#D4AF37] selection:text-[#0D0D0D] relative">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="fixed top-24 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-96 bg-[#121212]/95 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-xl shadow-2xl shadow-black/90 flex items-start gap-3.5">
            <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] shrink-0">
              <LucideMessageSquareWarning className="w-4 h-4" />
            </div>

            <div className="space-y-1 pr-4">
              <p className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                SYSTEM NOTIFICATION
              </p>
              <p className="text-xs text-[#E5E5E5] leading-relaxed">
                You are now reading{" "}
                <span className="text-[#D4AF37] font-medium">
                  Store's Blog Post
                </span>
                . Keep in mind that this page is still under construction.
              </p>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-[#666] hover:text-white transition-colors cursor-pointer p-0.5 shrink-0"
              aria-label="Dismiss notification">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-12">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8A8A8A] hover:text-white transition-colors group uppercase cursor-pointer">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      <header className="max-w-4xl mx-auto px-6 md:px-8 text-left space-y-6">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs tracking-widest text-[#8A8A8A]">
          <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
            <MapPin className="w-3.5 h-3.5" /> QUEZON CITY // PH
          </span>
          <span className="text-white/10">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> 4 MIN READ
          </span>
          <span className="text-white/10">•</span>
          <span>EST. 2024</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[1.05] text-white">
          The City Doesn’t Wait. <br />
          <span className="italic text-[#D4AF37]">Neither Do We.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#8A8A8A] font-light max-w-3xl leading-relaxed">
          An editorial look into the asphalt, the infrastructure, and the
          uncompromising design ethos driving MNL Clothing from the heart of QC
          to the global streetwear.
        </p>

        <div className="flex items-center justify-between pt-6 border-y border-white/5 py-4 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#161616] border border-white/10 rounded-full flex items-center justify-center font-mono text-xs text-[#D4AF37] font-bold">
              MNL
            </div>
            <div>
              <p className="text-xs font-mono tracking-wider text-white uppercase font-bold">
                Editorial Collective
              </p>
              <p className="text-[11px] font-mono text-[#666]">
                PUBLISHED // JUNE 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-[#8A8A8A] hover:text-white border border-white/5 hover:border-white/20 bg-[#121212] rounded-lg transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 md:px-12 my-12">
        <div className="relative h-100 md:h-150 bg-[#121212] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          <img
            src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
            alt="Quezon City Urban Skyline"
            className="w-full h-full object-cover object-center mix-blend-luminosity brightness-75 scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0D0D0D] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 font-mono text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/5">
            Fig 01 // Description
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 font-sans text-base md:text-lg text-[#B3B3B3] leading-relaxed space-y-8 tracking-wide">
        <p className="text-white font-medium text-xl md:text-2xl leading-relaxed italic border-l-2 border-[#D4AF37] pl-4 md:pl-6 my-8">
          "Streetwear in Manila isn’t a style portfolio—it’s armor. The heat,
          the sudden downpours, the relentless movement of transit
          infrastructure require garments built with aggressive structural
          intent."
        </p>

        <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight pt-6 uppercase">
          01 // Title
        </h2>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto quos
          temporibus autem consectetur eveniet sequi natus. Laboriosam cum,
          eligendi numquam tempora exercitationem, unde distinctio obcaecati hic
          dolorum quaerat veniam voluptate.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
          aliquam cupiditate mollitia alias doloribus consequuntur eveniet rem
          error provident in non dolore hic, iure, facilis cumque, possimus iste
          sint quod!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12 pt-4">
          <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden p-2 space-y-3">
            <div className="h-64 bg-[#161616] rounded-lg overflow-hidden relative">
              <img
                src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
                alt="Studio Detail"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
            </div>
            <p className="font-mono text-[10px] tracking-wider text-[#666] px-2 uppercase">
              Fig 02 // Description
            </p>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden p-2 space-y-3">
            <div className="h-64 bg-[#161616] rounded-lg overflow-hidden relative">
              <img
                src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
                alt="QC Street"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
            </div>
            <p className="font-mono text-[10px] tracking-wider text-[#666] px-2 uppercase">
              Fig 03 // Description
            </p>
          </div>
        </div>

        <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight pt-6 uppercase">
          02 // Title
        </h2>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non hic
          mollitia consequuntur numquam aliquid quo qui cumque perferendis
          libero minus eligendi quos quae quia, provident distinctio nulla sint
          magnam dolorem?
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          molestias distinctio voluptas soluta cupiditate quae minima dolor
          ratione quo minus magnam, nisi ullam reprehenderit maiores veritatis
          impedit atque sed quasi.
        </p>

        <blockquote>
          <p className="text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase block mt-12 mb-2">
            // Brand Credo //
          </p>
          <p className="text-xl font-display font-bold italic text-white bg-[#121212] border border-white/5 p-6 rounded-xl shadow-inner">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            ipsam libero optio! Iusto labore repellendus ipsum similique saepe
            animi necessitatibus, sint est dicta hic? Tenetur necessitatibus
            quaerat similique soluta corporis.
          </p>
        </blockquote>

        <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight pt-6 uppercase">
          03 // Title
        </h2>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
          ipsum, fugiat possimus deleniti dignissimos cupiditate optio hic ea
          beatae saepe odio voluptates temporibus nulla deserunt. Rerum fugit
          nobis necessitatibus consequuntur.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et molestiae
          vitae modi officia quos quia iusto quas facere, cumque inventore porro
          aperiam provident impedit aliquid quasi unde illum ipsam ducimus.
        </p>
      </article>

      <footer className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-white/5 text-center">
        <p className="font-mono text-xs text-[#666] tracking-widest uppercase mb-6">
          End of Blog // MNL Clothing
        </p>
        <button
          onClick={onBackToHome}
          className="bg-white hover:bg-[#D4AF37] text-[#0D0D0D] font-mono text-xs font-bold tracking-[0.2em] px-8 py-4 rounded-xl transition-all uppercase duration-300 transform active:scale-98 shadow-xl cursor-pointer">
          Return to Home
        </button>
      </footer>
    </main>
  );
}
