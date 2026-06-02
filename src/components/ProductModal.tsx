import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShoppingBag, ShieldCheck, Truck } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  tag: string | null;
  style: string;
  image: string;
  description: string;
  sizes: string[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#121212] border border-white/5 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#0D0D0D]/60 hover:bg-white text-white hover:text-[#0D0D0D] border border-white/10 p-2.5 rounded-full z-20 cursor-pointer transition-colors duration-300">
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Media Production Frame */}
          <div className="relative aspect-3/4 w-full bg-[#1A1A1A] overflow-hidden">
            {product.tag && (
              <span className="absolute top-4 left-4 bg-white text-[#0D0D0D] font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 z-10 font-bold rounded-xs">
                {product.tag}
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 object-center"
            />
          </div>

          <div className="p-6 md:p-12 flex flex-col justify-between text-white bg-[#121212]">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8A8A8A] uppercase block mb-2">
                MNL Clothing // {product.style}
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3">
                {product.title}
              </h2>
              <p className="font-sans font-semibold text-lg text-[#D4AF37] mb-6">
                ₱{product.price.toLocaleString()}
              </p>

              <div className="w-full h-px bg-white/5 mb-6" />

              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block">
                    Available Sizes
                  </span>
                  {selectedSize === "OS" && (
                    <span className="text-[10px] font-mono text-[#D4AF37]/80 lowercase italic">
                      One Size Fits All
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 px-4 border text-xs font-mono rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer min-w-11 ${
                        selectedSize === size
                          ? "border-white bg-white text-[#0D0D0D] font-bold shadow-lg"
                          : "border-white/10 bg-transparent text-[#8A8A8A] hover:border-white/40 hover:text-white"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block">
                  Product Overview
                </span>
                <p className="text-[#8A8A8A] font-sans text-xs leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full py-4 bg-white hover:bg-[#D4AF37] text-[#0D0D0D] font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer group">
                <ShoppingBag
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  strokeWidth={2.5}
                />
                Add To Cart — {selectedSize}
              </button>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Manila Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
