import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  price: number;
  tag: string | null;
  image: string;
}

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
}

export default function ProductCard({
  product,
  isLarge = false,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between bg-[#121212] overflow-hidden w-full ${
        isLarge ? "h-85 md:h-150" : "h-55 md:h-72"
      }`}>
      <div className="relative flex-1 w-full bg-[#181818] overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/10">
            <svg
              className="w-12 h-12 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth={1}>
              <path d="M20 3H4v18h16V3z M12 11a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            <span className="font-mono text-[9px] tracking-widest uppercase">
              PRODUCT PHOTO
            </span>
          </div>
        )}

        {product.tag && (
          <div className="absolute top-4 left-4 border border-[#D4AF37]/40 bg-[#0D0D0D]/90 px-2.5 py-1 rounded-xs">
            <span className="font-mono text-[9px] tracking-[0.18em] text-[#D4AF37] uppercase block">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      <div className="bg-[#121212] p-5 md:p-6 border-t border-white/2">
        <h3 className="font-sans font-normal text-sm md:text-base text-white tracking-tight mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
          {product.title}
        </h3>
        <p className="font-sans font-medium text-xs md:text-sm text-[#D4AF37] tracking-wider">
          ₱{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
