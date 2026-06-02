import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import productsData from "../data/products.json";
import ProductCard from "./ProductCard";

interface BestSellersCarouselProps {
  onViewProduct: (product: (typeof productsData)[0]) => void;
}

export default function BestSellersCarousel({
  onViewProduct,
}: BestSellersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const bestSellers = productsData.slice(0, 5);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-20">
      {/* Header Deck Frame */}
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight shrink-0">
            Best Sellers
          </h2>
          <div className="h-px bg-white/10 w-full hidden sm:block" />
        </div>

        <div className="flex items-center gap-6 pl-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#555555] uppercase whitespace-nowrap">
            All Time
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-white/10 hover:border-white text-[#8A8A8A] hover:text-white rounded-full transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-white/10 hover:border-white text-[#8A8A8A] hover:text-white rounded-full transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {bestSellers.map((product) => (
          <div
            key={`best-${product.id}`}
            className="snap-start shrink-0 w-[75%] sm:w-[45%] md:w-[30%] lg:w-[23%]">
            <ProductCard product={product} onViewProduct={onViewProduct} />
          </div>
        ))}
      </div>
    </section>
  );
}
