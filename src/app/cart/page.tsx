"use client"
import { useCart } from "@/app/context/Context";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState } from "react";
import { ShoppingCart, ArrowLeft, Package, CreditCard, ShoppingBag } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const { isLoaded, userId } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);

    if (!isLoaded) {
      // Clerk is not yet loaded, do nothing.
      setLoading(false);
      return;
    }

    if (!userId) {
      toast.error("Please sign in to proceed to checkout.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("You must be signed in to checkout.");
        } else {
          toast.error("Failed to create checkout session.");
        }
        setLoading(false);
        return;
      }

      const { session } = await response.json();
      if (session && session.url) {
        window.location.href = session.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Item removed from cart.");
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#833d0b] p-2 sm:p-3 rounded-xl">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="font-main text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Your Cart
            </h1>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[#833d0b] hover:text-[#6b3209] font-semibold transition-colors group w-fit"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center bg-white p-8 sm:p-12 lg:p-16 rounded-2xl shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-6 rounded-full">
                <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-[#833d0b]" />
              </div>
            </div>
            <p className="font-main text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </p>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Looks like you have not added anything to your cart yet
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-[#833d0b] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#6b3209] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#833d0b]" />
                  Items ({totalItems})
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 mx-auto sm:mx-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={112}
                        height={112}
                        className="object-cover rounded-xl w-full h-48 sm:w-full sm:h-full shadow-md"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#833d0b] font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                         {item.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="p-2 sm:p-2.5 border-2 border-[#833d0b] text-[#833d0b] rounded-full hover:bg-[#833d0b] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#833d0b]"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 sm:px-5 font-bold text-lg min-w-[3rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="p-2 sm:p-2.5 border-2 border-[#833d0b] text-[#833d0b] rounded-full hover:bg-[#833d0b] hover:text-white transition-all"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Price and Delete */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                         {(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 sm:p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                        aria-label="Remove item"
                      >
                        <MdDelete size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-6 h-6 text-[#833d0b]" />
                  <h2 className="font-main text-2xl sm:text-3xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>
                
                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-base sm:text-lg">
                    <p className="text-gray-600">
                      Subtotal <span className="text-[#833d0b] font-semibold">({totalItems} items)</span>
                    </p>
                    <p className="font-semibold text-gray-900"> {subtotal.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between text-base sm:text-lg">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-semibold text-green-600">Free</p>
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl sm:text-2xl text-gray-900">Total</p>
                      <p className="font-bold text-2xl sm:text-3xl text-[#833d0b]">
                         {subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading || !isLoaded}
                  className="w-full bg-[#833d0b] text-white font-bold py-3 sm:py-4 px-4 rounded-xl hover:bg-[#6b3209] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </span>
                  )}
                </button>
                
                {/* Security Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}