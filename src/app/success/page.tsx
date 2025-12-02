"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/Context";
import { toast } from "react-toastify";
import { CheckCircle, Package, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
      {sessionId && (
        <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
      )}
    </div>
  );
}

export default function SuccessPage() {
  const { items, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && sessionId && items.length > 0 && !orderSaved) {
      // Save order to localStorage
      const order = {
        id: sessionId,
        items: items,
        date: new Date().toISOString(),
        total: items.reduce((sum, item) => sum + (item.price * item.qty), 0),
        status: 'confirmed'
      };

      // Get existing orders or initialize empty array
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Add new order
      existingOrders.push(order);
      
      // Save to localStorage
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      localStorage.setItem('latestOrder', JSON.stringify(order));
      
      setOrderSaved(true);
      clearCart();
      toast.success("Payment successful!");
    }
  }, [mounted, sessionId, items, clearCart, orderSaved]);

  return (
    <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
      <SuccessContent />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className={`max-w-2xl w-full transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#833d0b] rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-4 sm:p-6 shadow-2xl">
                <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#833d0b]" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm border border-orange-100">
            {/* Sparkle Decoration */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 animate-pulse" />
            </div>

            <h1 className="font-main text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center leading-tight">
              Payment Successful!
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 text-center px-2">
              Your order has been confirmed and is being processed
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6 sm:my-8"></div>

            {/* Info Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#833d0b] bg-opacity-10 rounded-full p-2 sm:p-3 flex-shrink-0">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#833d0b]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">What is Next?</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    You will receive an email confirmation shortly with your order details and tracking information. 
                    We are already preparing your items for shipment!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link 
                href="/" 
                className="flex-1 group bg-gray-100 text-gray-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Continue Shopping
              </Link>
              
              <Link 
                href="/Order" 
                className="flex-1 bg-[#833d0b] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-[#6b3209] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                View Order
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8 px-4">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-[#833d0b] hover:underline font-medium">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </Suspense>
  );
}