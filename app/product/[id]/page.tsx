"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ArrowLeft, Plus, Minus, Heart, Share2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import productsData from "@/data.json";
import useCartStore, { Product } from "@/store/cartStore";

function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);

  // Mock images for carousel (since we only have one image per product)
  const productImages = ["/shoes.jpg", "/shoes.jpg", "/shoes.jpg"];

  useEffect(() => {
    const productId = parseInt(params.id as string);
    const foundProduct = (productsData as Product[]).find(
      (p) => p.id === productId
    );
    setProduct(foundProduct || null);
  }, [params.id]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className="fill-yellow-400 text-yellow-400 md:size-5"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          className="fill-yellow-400 text-yellow-400 opacity-50 md:size-5"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={16}
          className="text-gray-300 md:size-5"
        />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(
        `${quantity} ${product.title}${quantity > 1 ? "s" : ""} added to cart!`,
        {
          duration: 2000,
          position: "top-center",
        }
      );
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  // Calculate review counts for each star
  const starCounts = [5, 4, 3, 2, 1].map(
    (star) => product.reviews?.filter((r) => r.rating === star).length || 0
  );
  const maxStarCount = Math.max(...starCounts, 1);

  return (
    <>
      <Toaster />
      <div className="flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-primary hover:text-secondary mb-6 transition-colors text-sm md:text-md px-2 md:px-0"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className=" rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-4 md:p-8">
            {/* Image Section (Left) */}
            <div className="space-y-2 md:space-y-4 ">
              <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Carousel/Thumbnails */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section (Right) */}
            <div className="space-y-3 md:space-y-4 ">
              {/* Product Title and Rating */}
              <div>
                <p className="text-gray-600 text-sm md:text-md">
                  {product.brand}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center">
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-gray-600 text-sm md:text-md">
                    {product.rating} out of 5
                  </span>
                </div>
                <span className=" text-gray-500 text-sm md:text-md">
                  {product.reviews?.length || 0} reviews
                </span>
              </div>

              {/* Price */}
              <div>
                <p className="text-3xl md:text-4xl font-bold">
                  ${product.price}
                </p>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-2">
                  Category
                </h3>
                <span className="inline-block bg-primary text-white px-3 py-1 rounded-sm text-sm md:text-md">
                  {product.category}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-md">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 md:p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-2 md:px-4 py-1 md:py-2 text-md md:text-lg font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 md:p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-gray-500">
                    Total:{" "}
                    <span className="font-bold text-gray-800">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm md:text-lg"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>

                {/* Secondary Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Heart size={18} className="mr-2" />
                    <p className="text-sm md:text-md">Add to Wishlist</p>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Share2 size={18} className="mr-2" />
                    <p className="text-sm md:text-md">Share</p>
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="border-t pt-6">
                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-3">
                  Product Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm md:text-md">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    High-quality materials
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Durable construction
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    30-day return policy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Free shipping available
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section (Optional) */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="border-t md:py-8 pt-8 space-y-4 px-3 md:px-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Customer Reviews
              </h2>

              {/* Review Summary */}
              <div className="bg-white rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-3 ">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800">
                      {product.rating}
                    </span>
                    <span className="text-gray-600 ml-2 text-sm md:text-md">
                      out of 5
                    </span>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars, idx) => (
                    <div key={stars} className="flex items-center">
                      <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">
                        {stars}★
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2 mx-2 md:mx-3">
                        <div
                          className="bg-yellow-400 h-1.5 md:h-2 rounded-full"
                          style={{
                            width: `${(starCounts[idx] / maxStarCount) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">
                        {starCounts[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                <div
                  className={`flex flex-col gap-2 md:gap-4 transition-all duration-500 ease-in-out ${
                    showAllReviews ? "max-h-[2000px]" : "max-h-[400px]"
                  }`}
                >
                  {product.reviews
                    .slice(0, showAllReviews ? undefined : 2)
                    .map((review) => (
                      <div
                        key={review.id}
                        className="bg-white rounded-lg p-4 md:p-6 transform transition-all duration-300 hover:scale-[1.01]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm md:text-md">
                                {review.user}
                              </p>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs md:text-md text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-md">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Show All Reviews Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className=" text-sm md:text-md bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {showAllReviews
                    ? "Show Less"
                    : `Show All Reviews (${product.reviews.length})`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
