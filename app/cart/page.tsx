"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Star,
} from "lucide-react";
import useCartStore from "@/store/cartStore";

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getCartTotal } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert("Order placed successfully!");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
      );
    }

    return stars;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="flex items-center text-primary hover:text-secondary mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>

          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Link
              href="/"
              className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-primary hover:text-secondary mr-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 size={20} className="mr-2" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src="/shoes.jpg"
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer truncate">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-1">{item.brand}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({item.rating})
                      </span>
                    </div>

                    <p className="text-xl font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end space-y-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 text-lg font-semibold min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center text-red-600 hover:text-red-800 transition-colors text-sm"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="text-gray-600">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal (
                    {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-gray-500">
                    Add {formatPrice(50 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              <Link
                href="/"
                className="block text-center text-primary hover:text-secondary transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  We Accept
                </h3>
                <div className="flex space-x-2">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    VISA
                  </div>
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                    MC
                  </div>
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    AMEX
                  </div>
                  <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    PP
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <span className="mr-1">🔒</span>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
