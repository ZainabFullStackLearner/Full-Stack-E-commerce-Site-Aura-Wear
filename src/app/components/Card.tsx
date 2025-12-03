"use client"
import React from 'react';
import Image from 'next/image';
import { FiEye, FiPercent, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '../context/Context';
import { toast } from 'react-toastify';

type Product = {
  _id: string;
  slug: string;
  name: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  images: {
    asset: {
      url: string;
    };
  }[];
};

type CardProps = {
  item: Product[];
};

export default function Card({ item }: CardProps) {
  const products = Array.isArray(item) ? item : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-7">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = product.discountPercentage > 0;

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.asset.url || '',
    }, 1);
    toast.success("Item added to cart!");
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md group overflow-hidden transition-all duration-300 hover:shadow-2xl sm:hover:-translate-y-2">
      {/* Image Container with Quick View Button */}
      <div className="relative h-auto overflow-hidden">
        {product.images?.[0]?.asset?.url ? (
          <>
            <Image
              src={product.images[0].asset.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-110"
              width={400}
              height={400}
            />
            
            {/* Quick View Button - Always visible on mobile, hover on desktop */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs">
              {product.slug ? (
                <Link href={`/product/${product.slug}`} className="block">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-black px-4 py-3 rounded-full text-sm font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 shadow-lg hover:shadow-xl hover:bg-black hover:text-white border border-gray-100 hover:border-transparent flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95">
                    <FiEye className="text-lg transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-semibold">Quick View</span>
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300/80 text-gray-500 px-5 py-3 rounded-full text-sm font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiEye className="text-lg" />
                  <span>Unavailable</span>
                </button>
              )}
            </div>

            {/* Add to Cart Button - Small oval in top right */}
            <button
              onClick={handleAddToCart}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-x-0 sm:-translate-x-2 sm:group-hover:translate-x-0 shadow-lg hover:bg-black hover:text-white hover:scale-110 active:scale-95 z-10"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="text-lg transition-transform duration-200 hover:rotate-12" />
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse shadow-lg">
            <FiPercent size={12} />
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Gradient Overlay - Only on desktop hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {product.category}
        </h2>
        <h1 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight sm:group-hover:text-slate-400 transition-colors duration-200 font-logo">
          {product.name}
        </h1>
        <h3 className="text-base font-sans text-gray-500 line-clamp-2 leading-tight sm:group-hover:text-gray-600 transition-colors duration-200">
          {product.subCategory}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-3 mt-2">
          {product.discountPercentage > 0 && (
            <>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                -{product.discountPercentage}%
              </span>
              <p className="text-sm text-gray-400 line-through">
                PKR {product.originalPrice}
              </p>
            </>
          )}
          <p className="text-md font-bold text-gray-700 drop-shadow-sm">
            PKR {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}