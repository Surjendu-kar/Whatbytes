"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  search: string;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    minPrice: 0,
    maxPrice: 1000,
    brands: [],
    search: "",
  });

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const price = searchParams.get("price");
    const brands = searchParams.get("brands");
    const search = searchParams.get("search");

    const newFilters: Filters = {
      category: category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "All",
      minPrice: 0,
      maxPrice: 1000,
      brands: brands ? brands.split(",") : [],
      search: search || "",
    };

    // Parse price range
    if (price) {
      const [minStr, maxStr] = price.split("-");
      newFilters.minPrice = parseInt(minStr) || 0;
      newFilters.maxPrice = parseInt(maxStr) || 1000;
    }

    setFilters(newFilters);
  }, [searchParams]);

  return (
    <>
      <Toaster />
      <div className="flex gap-10">
        <Sidebar filters={filters} setFilters={setFilters} />
        <ProductGrid filters={filters} setFilters={setFilters} />
      </div>
    </>
  );
}

// Server Component
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
