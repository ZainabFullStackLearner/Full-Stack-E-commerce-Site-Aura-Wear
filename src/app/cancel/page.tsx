"use client"
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-xl mb-8">
        Your payment was not processed. You can go back to your cart and try
        again.
      </p>
      <Link href="/cart" className="text-blue-500 hover:underline">
        Back to Cart
      </Link>
    </div>
  );
}
