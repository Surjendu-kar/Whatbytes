"use client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import productsData from "@/data.json";
import useCartStore, { Product } from "@/store/cartStore";

function ProductGrid() {
  const products: Product[] = productsData as Product[];
  const addItem = useCartStore((state) => state.addItem);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          className="fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);

    // Show success toast
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Listing</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 w-full">
                <Image
                  src="/shoes.jpg"
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-1">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>

                {/* Price */}
                <p className="text-xl font-bold">${product.price}</p>

                {/* Rating Stars */}
                <div className="flex items-center">
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">
                    ({product.rating})
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
