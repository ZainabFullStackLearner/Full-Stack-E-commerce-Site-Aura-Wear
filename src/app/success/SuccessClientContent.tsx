'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-100 mb-4 sm:mb-6">
            <svg
              className="h-10 w-10 sm:h-12 sm:w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>

          {/* Session ID */}
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 break-all">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Session ID:</p>
              <p className="text-xs sm:text-sm font-mono text-gray-700">{sessionId}</p>
            </div>
          )}

          {/* Button */}
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessClientContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}