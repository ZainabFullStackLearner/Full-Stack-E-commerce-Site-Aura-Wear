import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';
type Discount = {
  _id: string;
  slug: string;
  name: string;
  price: number; // discounted price
  originalPrice: number; // actual/original price
  discountPercentage: number;
  category: string;
  images: {
    asset: {
      url: string;
    };
  }[];
};

export default function DiscountCard({ items }: { items: Discount[] }) {
  return (
    <div>
 <h2 className='text-2xl font-logo text-center font-semibold'> Exclusive Discounts</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 p-4 mt-7">
     
      {items.map((product) => (
        <div
          key={product._id}
          className="relative bg-white rounded-2xl shadow-md group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        >
          {/* Image Wrapper */}
          <div className="relative h-80 overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-r-[80px] border-t-red-600 border-r-transparent">
              <span className="absolute top-[-70px] left-[5px] text-white text-xs font-bold transform -rotate-45">
                {product.discountPercentage}% off
              </span>
            </div>

            {product.images && product.images.length > 0 && product.images[0].asset?.url ? (
              <Image
                src={product.images[0].asset.url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width={300}
                height={300}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Quick View Button */}
            <Link href={`/product/${product.slug}`} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-black hover:text-white">
           <FiEye className="inline-block ml-1" />  Quick View 
            </Link>
            
          </div>

          {/* Info Section */}
            <div className="p-5 space-y-2 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-b-2xl">
            <h2 className="text-xs font-bold text-pink-500 uppercase tracking-widest">{product.category}</h2>
            <h1 className="text-lg font-extrabold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 font-logo line-clamp-2">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
              -{product.discountPercentage}%
              </span>
              <p className="text-sm text-gray-400 line-through">PKR {product.originalPrice}</p>
              <p className="text-md font-bold text-gray-700 drop-shadow-sm">PKR {product.price}</p>
            </div> </div>
        </div>
      ))}
    </div>
    </div>
  );
}
