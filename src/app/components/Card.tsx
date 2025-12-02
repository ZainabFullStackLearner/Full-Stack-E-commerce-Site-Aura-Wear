"use client"
import React from 'react';
import Image from 'next/image';
import { FiEye, FiPercent, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '../context/Context';
import { toast } from 'react-toastify';

type Product = {
  _id: string;
  slug: string; // Slug is a string since queries use "slug": slug.current
  name: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: string; // Maps to mainCategory in queries
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
  // Ensure item is always an array
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
    <div className="relative bg-white rounded-2xl shadow-md group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-auto overflow-hidden">
        {product.images?.[0]?.asset?.url ? (
          <Image
            src={product.images[0].asset.url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center animate-pulse">
            <FiPercent className="mr-1" size={12} />
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center gap-2">
          {product.slug ? (
            <Link href={`/product/${product.slug}`} className="flex-1">
              <button className="w-full bg-white text-black px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-black hover:text-white flex items-center justify-center">
                <FiEye className="mr-2" size={16} />
                Quick View
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-full text-sm opacity-100 cursor-not-allowed flex items-center justify-center"
            >
              <FiEye className="mr-2" size={16} />
              Unavailable
            </button>
          )}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-blue-700 flex items-center justify-center"
          >
            <FiShoppingCart className="mr-2" size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {product.category}
        </h2>
        <h1 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-slate-400 transition-colors duration-200 font-logo">
          {product.name}
        </h1>
        <h3 className="text-base font-sans text-gray-500 line-clamp-2 leading-tight group-hover:text-gray-600 transition-colors duration-200">
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