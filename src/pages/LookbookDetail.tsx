import { ArrowLeft } from "lucide-react";
import LOOKBOOK_CAMPAIGNS from "../data/lookbookData.json";

export default function LookbookDetail() {
  const pathParts = window.location.pathname.split("/");
  const campaignId = pathParts[pathParts.length - 1];

  const campaign = LOOKBOOK_CAMPAIGNS.find((item) => item.id === campaignId);

  if (!campaign) {
    return (
      <div className="h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white font-mono">
        <p className="text-sm text-zinc-500 mb-4">CAMPAIGN NOT FOUND</p>
        <a href="/" className="text-xs text-[#D4AF37] underline">
          RETURN TO HOME
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white antialiased selection:bg-[#D4AF37] selection:text-[#0D0D0D]">
      <header className="p-6 md:p-12 max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="/#lookbook"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8A8A8A] hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          BACK TO ARCHIVES
        </a>
        <span className="font-mono text-xs tracking-[0.3em] text-zinc-600">
          {campaign.season} EDITION
        </span>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 py-12 items-center">
        <div className="overflow-hidden rounded-2xl border border-white/5 aspect-3/4">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <span className="font-mono text-xs tracking-[0.25em] text-[#D4AF37] uppercase block">
            {campaign.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
            {campaign.title}
          </h1>
          <p className="font-mono text-sm text-[#8A8A8A]">
            Captured on Location:{" "}
            <span className="text-white font-sans font-bold ml-1">
              {campaign.location}
            </span>
          </p>
          <div className="w-16 h-px bg-white/10 my-8" />
          <p className="font-serif italic text-lg text-zinc-400 leading-relaxed max-w-md">
            "An exploration of modern utility and structural form. Built to
            withstand environmental friction."
          </p>
        </div>
      </main>
    </div>
  );
}
