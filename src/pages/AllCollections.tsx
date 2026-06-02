import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import BestSellersCarousel from "../components/BestSellersCarousel";

interface AllCollectionsProps {
  onBackToHome?: () => void;
}

const ITEMS_PER_PAGE = 12;

export default function AllCollections({ onBackToHome }: AllCollectionsProps) {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof productsData)[0] | null
  >(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handleViewProduct = useCallback((product: (typeof productsData)[0]) => {
    setSelectedProduct(product);
  }, []);

  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return productsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

      <div className="mb-8" id="catalog-matrix-title">
        <h2 className="font-mono text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
          Catalog Matrix // Page {currentPage} of {totalPages}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewProduct={handleViewProduct}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 gap-6 font-mono">
          <span className="text-xs text-[#666]">
            SHOWING{" "}
            {Math.min(
              (currentPage - 1) * ITEMS_PER_PAGE + 1,
              productsData.length,
            )}
            -{Math.min(currentPage * ITEMS_PER_PAGE, productsData.length)} OF{" "}
            {productsData.length} UNITS
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/5 bg-[#121212] text-[#8A8A8A] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-xl border border-white/5 text-xs">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg cursor-pointer transition-all duration-300 ${
                      currentPage === page
                        ? "bg-white text-[#0D0D0D] font-bold"
                        : "text-[#8A8A8A] hover:text-white"
                    }`}>
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/5 bg-[#121212] text-[#8A8A8A] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
