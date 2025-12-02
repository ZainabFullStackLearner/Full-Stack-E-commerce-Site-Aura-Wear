"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessClientContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 shadow-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
        {sessionId && <p className="text-sm text-gray-500 mb-4">Session ID: {sessionId}</p>}
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#a86734] transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
