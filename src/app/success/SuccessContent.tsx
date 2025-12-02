'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart from localStorage on successful payment
    try {
      localStorage.removeItem('cart');
    } catch {
      // Handle localStorage errors silently
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
        {sessionId && (
          <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
        )}
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#a86734]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
