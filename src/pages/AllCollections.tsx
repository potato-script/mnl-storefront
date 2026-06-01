import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

interface AllCollectionsProps {
  onBackToHome: () => void;
}

export default function AllCollections({ onBackToHome }: AllCollectionsProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] text-white pt-32 pb-24 px-6 md:px-12 selection:bg-[#D4AF37] selection:text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 border-b border-white/5 pb-8">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#8A8A8A] hover:text-white w-fit transition-colors duration-300 mb-4">
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            BACK TO HIGHLIGHTS
          </button>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter">
              ALL COLLECTIONS
            </h1>
            <p className="font-mono text-xs text-[#D4AF37] tracking-[0.18em] uppercase">
              SHOWING {productsData.length} ARCHIVAL PIECES
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productsData.map((product) => (
            <div key={product.id} className="h-90 md:h-105 flex flex-col">
              <ProductCard product={product} isLarge={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
