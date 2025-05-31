"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import useCartStore from "@/store/cartStore";

interface HeaderContentProps {
  onMenuClick?: () => void;
}

function HeaderContent({ onMenuClick }: HeaderContentProps) {
  const { getCartItemsCount, isHydrated } = useCartStore();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Update cart count when store changes
  useEffect(() => {
    if (isHydrated) {
      setCartItemsCount(getCartItemsCount());
    }
  }, [getCartItemsCount, isHydrated]);

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      if (state.isHydrated) {
        setCartItemsCount(state.getCartItemsCount());
      }
    });

    return unsubscribe;
  }, []);

  // Initialize search term from URL
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update URL with search parameter
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";
    router.replace(newUrl, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by onChange, this prevents form submission
  };

  return (
    <div className="bg-primary sticky top-0 z-40">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button - Only on small screens */}
          <button
            onClick={onMenuClick}
            className="md:hidden text-white hover:text-blue-100 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Logo</h1>
          </Link>
        </div>

        {/* Center Section - Search Bar */}
        {pathname === "/" && (
          <div className="hidden sm:block flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center lg:pl-3 pl-2 text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full lg:pl-10 pl-8 pr-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder:text-blue-100"
              />
            </form>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-8">
          {/* Cart Button */}
          <Link href="/cart">
            <button className="flex items-center lg:gap-2 bg-secondary hover:bg-dark text-white font-semibold lg:px-6 lg:py-2 p-3 lg:rounded-md rounded-full transition relative">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </button>
          </Link>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-light flex items-center justify-center text-blue-900 font-bold text-lg cursor-pointer">
            A
          </div>
        </div>
      </div>

      {/* Mobile Search - Only show on home page */}
      {pathname === "/" && (
        <div className="sm:hidden px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-8 pr-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder:text-blue-100"
            />
          </form>
        </div>
      )}
    </div>
  );
}

// Server Component
export default function Header({ onMenuClick }: HeaderContentProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent onMenuClick={onMenuClick} />
    </Suspense>
  );
}
