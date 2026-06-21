import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ShopProductCard({ product }) {
    return (
        <Link to={`/product/${product.slug}`}>
            <div className="group bg-white border border-zinc-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

                {/* Image */}
                <div className="relative h-48 overflow-hidden border-b border-solid border-zinc-300">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount badge */}
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full dir-ltr">
                        -{product.discountPercentage}%
                    </span>

                    {/* Stock */}
                    <span className="absolute top-3 right-3 bg-white/90 text-xs px-2 py-1 rounded-full text-zinc-700">
                        {product.availabilityStatus}
                    </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2">

                    {/* Category */}
                    <span className="text-xs text-zinc-400 uppercase">
                        {product.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-zinc-800 line-clamp-2">
                        {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm text-zinc-600">
                            {product.rating}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <span className="text-lg font-bold text-zinc-900">
                                ${product.price}
                            </span>
                            {product.discountPercentage && (
                                <span className="text-xs text-zinc-400 line-through ml-2">
                                    ${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <button className="flex items-center gap-2 bg-black text-white text-xs px-3 py-2 rounded-lg hover:bg-zinc-800 transition">
                            <ShoppingCart size={14} />
                            افزودن
                        </button>
                    </div>

                </div>
            </div>
        </Link>

    );
}

export default ShopProductCard;