import ProductCard from "./ProductCard";
import productsData from "../data/products.json";

interface FeaturedCollectionProps {
  onNavigateToAll: () => void;
}

export default function FeaturedCollection({
  onNavigateToAll,
}: FeaturedCollectionProps) {
  const mainProduct = productsData[0];
  const sideProductTop = productsData[1];
  const sideProductBottom = productsData[2];

  return (
    <section className="bg-[#0D0D0D] py-20 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-10">
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-tight">
            Collection
          </h2>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#D4AF37] uppercase">
            SS26 — FEATURED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5 items-stretch mb-12">
          <div className="lg:col-span-3 flex">
            {mainProduct && (
              <ProductCard product={mainProduct} isLarge={true} />
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-5 justify-between">
            {sideProductTop && (
              <ProductCard product={sideProductTop} isLarge={false} />
            )}
            {sideProductBottom && (
              <ProductCard product={sideProductBottom} isLarge={false} />
            )}
          </div>
        </div>

        <div className="flex justify-center w-full mt-8">
          <button
            onClick={onNavigateToAll}
            className="px-10 py-4 bg-transparent text-white border border-white/15 font-sans font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:border-white hover:bg-white/5 cursor-pointer">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
