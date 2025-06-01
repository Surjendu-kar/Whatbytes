"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus, Search } from "lucide-react";
import toast from "react-hot-toast";
import productsData from "@/data.json";
import useCartStore, { Product } from "@/store/cartStore";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  search: string;
}

interface ProductGridProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

function ProductGrid({ filters, setFilters }: ProductGridProps) {
  const products: Product[] = productsData as Product[];
  const { addItem, updateQuantity, items } = useCartStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Filter products based on all filters
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

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

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = items.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);

    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  const handleQuantityChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number,
    newQuantity: number,
    productTitle: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    updateQuantity(productId, newQuantity);
  };

  const getFilterSummary = () => {
    const activeFilters = [];
    if (filters.category !== "All") activeFilters.push(filters.category);
    if (filters.brands.length > 0)
      activeFilters.push(
        `${filters.brands.length} brand${filters.brands.length > 1 ? "s" : ""}`
      );
    if (filters.minPrice > 0 || filters.maxPrice < 1000)
      activeFilters.push(`$${filters.minPrice}-$${filters.maxPrice}`);
    return activeFilters.join(", ");
  };

  return (
    <div className="flex-1 px-4 lg:px-0">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Product Listing</h1>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600 mt-1 mb-4">
          <p>
            Showing {filteredProducts.length} of {products.length} products
            {getFilterSummary() && (
              <span className="ml-2 text-primary font-medium">
                ({getFilterSummary()})
              </span>
            )}
          </p>

          {filteredProducts.length === 0 && filters.search && (
            <p className="text-gray-500">No results for "{filters.search}"</p>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <Search size={32} className="text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            {filters.search
              ? `No products match "${filters.search}"`
              : "No products match your current filters"}
          </p>
          <button
            onClick={() =>
              setFilters({
                category: "All",
                minPrice: 0,
                maxPrice: 1000,
                brands: [],
                search: "",
              })
            }
            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const quantityInCart = getProductQuantityInCart(product.id);

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden bg-gray-50">
                  {/* Product Image */}
                  <div className="relative pt-[100%] bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex flex-col gap-1">
                    {/* Brand */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.brand}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <p className="text-xl font-bold">${product.price}</p>

                    {/* Rating Stars */}
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Add to Cart Button OR Quantity Controls */}
                    {quantityInCart === 0 ? (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-center border border-gray-300 rounded bg-gray-50">
                        <button
                          onClick={(e) =>
                            handleQuantityChange(
                              e,
                              product.id,
                              quantityInCart - 1,
                              product.title
                            )
                          }
                          className="p-2 hover:bg-gray-200 transition-colors rounded-l"
                          title={
                            quantityInCart === 1
                              ? "Remove from cart"
                              : "Decrease quantity"
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 text-lg font-semibold min-w-[60px] text-center">
                          {quantityInCart}
                        </span>
                        <button
                          onClick={(e) =>
                            handleQuantityChange(
                              e,
                              product.id,
                              quantityInCart + 1,
                              product.title
                            )
                          }
                          className="p-2 hover:bg-gray-200 transition-colors rounded-r"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
