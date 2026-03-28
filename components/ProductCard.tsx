import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  if (compact) {
    return (
      <div className="glass rounded-2xl overflow-hidden card-hover group">
        <div className="relative h-40 overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-1 rounded-full">
                {product.badge}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{product.category}</p>
          <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-primary)" }}>
            {product.name}
          </h3>
          <StarRating rating={product.rating} />
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold gradient-text">{product.price}</span>
            <Link href={`/reviews/${product.id}`} className="text-xs btn-primary py-1.5 px-3">
              Read Review
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: "var(--bg-card-hover)" }}>
        <Image src={product.image} alt={product.name} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 rounded-full shadow-lg">
              {product.badge}
            </span>
          </div>
        )}
        {/* Score */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex flex-col items-center justify-center border border-purple-500/50" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
          <span className="text-xs font-black text-purple-400">{product.score}</span>
          <span className="text-[10px] text-gray-400">score</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">{product.category}</p>
        <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-primary)" }}>
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Pros & Cons */}
        <div className="space-y-1.5 mb-4">
          {product.pros.slice(0, 2).map((pro) => (
            <div key={pro} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span style={{ color: "var(--text-secondary)" }}>{pro}</span>
            </div>
          ))}
          {product.cons.slice(0, 1).map((con) => (
            <div key={con} className="flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span style={{ color: "var(--text-muted)" }}>{con}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div>
            <span className="text-2xl font-black gradient-text">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm line-through ml-2" style={{ color: "var(--text-muted)" }}>{product.originalPrice}</span>
            )}
          </div>
          <Link href={`/reviews/${product.id}`} className="btn-primary flex items-center gap-2 text-sm py-2.5">
            Check Price <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
