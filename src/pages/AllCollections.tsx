import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import BestSellersCarousel from "../components/BestSellersCarousel";

interface AllCollectionsProps {
  onBackToHome?: () => void;
}

export default function AllCollections({ onBackToHome }: AllCollectionsProps) {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof productsData)[0] | null
  >(null);

  const handleViewProduct = useCallback((product: (typeof productsData)[0]) => {
    setSelectedProduct(product);
  }, []);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 min-h-screen bg-[#0D0D0D]">
      <div className="flex justify-between items-baseline mb-16 border-b border-white/5 pb-6">
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-white">
          ALL COLLECTIONS
        </h1>
        <button
          onClick={onBackToHome}
          className="text-xs font-mono tracking-widest text-[#8A8A8A] hover:text-white transition-colors uppercase cursor-pointer">
          ← Back to Home
        </button>
      </div>

      <BestSellersCarousel onViewProduct={handleViewProduct} />

      <div className="mb-8">
        <h2 className="font-mono text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
          Catalog Matrix // All Items
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewProduct={handleViewProduct}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
