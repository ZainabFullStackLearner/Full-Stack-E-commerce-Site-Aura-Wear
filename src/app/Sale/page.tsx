
import React from 'react'
import DiscountCard from '../components/Discount'
import { discountQuery } from "@/sanity/lib/fetch"
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

const discount = await client.fetch(discountQuery)
const Sale = () => {
  return (
      <section className='mt-'>
        <div
        className="w-full h-72 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('/images/bread.jpg')" }}
      >
        {/* Overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-black/30"></div>

        {/* Content container */}
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
          {/* Enhanced Breadcrumb */}
          <nav className="flex items-center justify-center text-sm md:text-base">
            <ol className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
              <li className="transition-transform hover:scale-105">
                <Link
                  href="/"
                  className="hover:text-amber-300 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>

              <li className="text-amber-300 font-medium flex items-center">
                <span>Sale</span>
              </li>
            </ol>
          </nav>

          {/* Subtle decorative element */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400 rounded-full"></div>
        </div>
      </div>

        <DiscountCard items={discount} />
        
      </section>
  )
}

export default Sale

