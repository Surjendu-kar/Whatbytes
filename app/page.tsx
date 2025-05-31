"use client";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import HomeContent from "@/components/HomeContent";

// Loading component for Suspense fallback
function HomeLoading() {
  return (
    <div className="flex bg-gray-50 gap-10">
      {/* Sidebar Skeleton */}
      <div className="w-64 flex flex-col gap-6">
        <div className="flex flex-col bg-primary p-4 text-white rounded-xl gap-4 animate-pulse">
          <div className="h-6 bg-blue-300 rounded w-20"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-300 rounded w-16"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-300 rounded"></div>
                  <div className="h-3 bg-blue-300 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col rounded-xl gap-4 p-4 shadow-md animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-16"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="flex-1">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-5 bg-gray-300 rounded w-32"></div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-4 h-4 bg-gray-300 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
    </>
  );
}

export default Page;
