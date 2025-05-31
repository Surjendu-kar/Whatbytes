"use client";
import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

function Page() {
  return (
    <>
      <Toaster />
      <div className="flex bg-gray-50 gap-10">
        <Sidebar />
        <ProductGrid />
      </div>
    </>
  );
}

export default Page;
