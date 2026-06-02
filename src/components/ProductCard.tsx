import { Eye } from "lucide-react";
import { memo } from "react";

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

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
  onViewProduct: (product: Product) => void;
}

function ProductCard({
  product,
  isLarge = false,
  onViewProduct,
}: ProductCardProps) {
  const optimizedImageUrl = `${product.image}&w=600&auto=format&fm=webp&q=75`;

  return (
    <div className="group relative w-full">
      <div
        className={`w-full overflow-hidden bg-[#1A1A1A] relative rounded-xl isolation-isolate ${
          isLarge ? "aspect-square" : "aspect-16/10"
        }`}>
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white text-[#0D0D0D] font-mono text-[10px] tracking-widest uppercase px-2 py-1 z-10 font-bold rounded-sm">
            {product.tag}
          </span>
        )}

        <img
          src={optimizedImageUrl}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-102"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="pointer-events-auto px-5 py-3 bg-white hover:bg-[#D4AF37] text-[#0D0D0D] font-sans font-bold text-[10px] tracking-[0.2em] uppercase rounded-lg flex items-center gap-2 shadow-2xl scale-95 translate-y-4 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer">
            <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
            View Product
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-0.5 font-mono text-[13px] tracking-wider">
        <span className="text-[10px] text-[#555555] font-bold uppercase tracking-[0.2em]">
          {product.style}
        </span>
        <h3 className="text-[#8A8A8A] group-hover:text-white transition-colors duration-300">
          {product.title}
        </h3>
        <p className="font-medium text-[#D4AF37] mt-0.5">
          ₱{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.isLarge === nextProps.isLarge
  );
});
