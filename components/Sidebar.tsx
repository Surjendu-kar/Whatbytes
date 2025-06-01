"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  search: string;
}

interface SidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

function Sidebar({ filters, setFilters }: SidebarProps) {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState(filters.maxPrice);
  const [priceInput, setPriceInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categories = ["All", "Electronics", "Clothing", "Home"];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "IKEA"];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category !== "All") {
      params.set("category", filters.category.toLowerCase());
    }

    if (filters.minPrice > 0 || filters.maxPrice < 1000) {
      params.set("price", `${filters.minPrice}-${filters.maxPrice}`);
    }

    if (filters.brands.length > 0) {
      params.set("brands", filters.brands.join(","));
    }

    if (filters.search) {
      params.set("search", filters.search);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";

    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  // Update local state when filters change
  useEffect(() => {
    setPriceRange(filters.maxPrice);
  }, [filters.maxPrice]);

  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    setFilters({
      ...filters,
      minPrice: 0,
      maxPrice: value,
    });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max(x / rect.width, 0), 1);
      const value = Math.round(percentage * 1000);
      setPriceRange(value);
      setFilters({
        ...filters,
        minPrice: 0,
        maxPrice: value,
      });
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    let newBrands = [...filters.brands];

    if (checked) {
      if (!newBrands.includes(brand)) {
        newBrands.push(brand);
      }
    } else {
      newBrands = newBrands.filter((b) => b !== brand);
    }

    setFilters({
      ...filters,
      brands: newBrands,
    });
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);

    const numValue = parseInt(value) || 1000;
    setPriceRange(numValue);

    setFilters({
      ...filters,
      minPrice: 0,
      maxPrice: numValue,
    });
  };

  const clearAllFilters = () => {
    setPriceRange(1000);
    setPriceInput("");
    setFilters({
      category: "All",
      minPrice: 0,
      maxPrice: 1000,
      brands: [],
      search: "",
    });
  };

  const FiltersContent = () => (
    <>
      {/* Filters */}
      <div className="flex flex-col bg-primary p-4 text-white rounded-xl gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Filters</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={handlePriceRangeChange}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-blue-100 mt-2">
              <span>$0</span>
              <span>$1000</span>
            </div>
            <div className="text-sm text-blue-100 mt-1">
              Selected: $0 - ${priceRange}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="bg-white flex flex-col rounded-xl gap-4 p-4 shadow-md">
        {/* Brand Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Brand</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Input */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Max Price</h3>
          <input
            type="number"
            placeholder="Enter max price"
            value={priceInput}
            onChange={handlePriceInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Menu button for small screens */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-white lg:hidden hover:bg-secondary transition-colors duration-200"
      >
        <Menu size={24} />
      </button>

      {/* Drawer for small screens */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer content */}
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-2 md:p-4 h-full overflow-y-auto space-y-4">
            <div className="flex justify-end items-center mb-4">
              {/* <h2 className="text-xl font-bold text-gray-800">Filters</h2> */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="pt-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <FiltersContent />
          </div>
        </div>
      </div>

      {/* Regular sidebar for large screens */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="w-64 flex flex-col gap-6">
          <FiltersContent />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
