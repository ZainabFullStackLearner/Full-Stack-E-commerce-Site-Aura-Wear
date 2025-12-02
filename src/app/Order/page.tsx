"use client";

import { Check, ArrowLeft, Package, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  date: string;
  total: number;
  status: string;
};

export default function OrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get the latest order from localStorage
    const latestOrderStr = localStorage.getItem('latestOrder');
    
    if (!latestOrderStr) {
      // No order found, redirect to home
      router.push('/');
      return;
    }

    const latestOrder = JSON.parse(latestOrderStr);
    setOrder(latestOrder);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#833d0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Order Found</h2>
          <p className="text-gray-600 mb-6">You have not placed any orders yet.</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#833d0b] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#6b3209] transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#833d0b] hover:text-[#6b3209] font-semibold transition-colors group mb-4"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-[#833d0b] to-[#6b3209] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Order Confirmed!
                </h1>
                <p className="text-orange-100 text-sm">
                  Thank you for your purchase
                </p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-[#833d0b]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
                  <p className="font-semibold text-gray-800">#{order.id.slice(-8)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#833d0b]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Order Date</p>
                  <p className="font-semibold text-gray-800">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#833d0b]" />
              Order Items ({order.items.reduce((sum, item) => sum + item.qty, 0)})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl"
                >
                  <div className="w-20 h-20 flex-shrink-0 relative rounded-lg overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: <span className="font-semibold">{item.qty}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: <span className="font-semibold">${item.price.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#833d0b]">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="border-t-2 border-[#833d0b] pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total Paid</span>
                  <span className="text-2xl font-bold text-[#833d0b]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 sm:p-8 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-600">
              <CreditCard className="w-5 h-5 text-[#833d0b]" />
              <span className="font-semibold">Payment Method:</span>
              <span>Credit Card (Stripe)</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 sm:p-8 bg-gray-50">
            <Link 
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#833d0b] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#6b3209] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help with your order?{" "}
            <a href="mailto:support@example.com" className="text-[#833d0b] hover:underline font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}