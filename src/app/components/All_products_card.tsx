"use client"
import React from "react";
import Image from 'next/image';
import { FiEye } from "react-icons/fi";
import { useCart } from '../context/Context';
import { toast } from 'react-toastify';

type Fullshop = {
  _id: string;
  slug: string | { current: string } | null | undefined;
  name: string;
  originalPrice: number;
  subCategory: string;
  discountPercentage: number;
  price: number;
  category: string;
  images: {
    asset: {
      url: string;
    };
  }[];
};

const CardMens = ({ items }: { items: Fullshop[] }) => {
  const { addItem } = useCart();

  // Helper function to format price with thousand separators
  const formatPrice = (price: number): string => {
    const priceValue = typeof price === 'number' ? price : 0;
    return priceValue.toLocaleString('en-US');
  };

  // Handle add to cart
  const handleAddToCart = (product: Fullshop, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.asset.url || '',
    }, 1);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const productList = items && Array.isArray(items) ? items : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 font-sans">
      {productList.length > 0 ? (
        productList.map((product) => {
          const currentSlug = (
            typeof product.slug === 'object' && product.slug !== null && 'current' in product.slug
              ? product.slug.current
              : typeof product.slug === 'string'
                ? product.slug
                : null
          );
          
          const finalPrice = formatPrice(product.price);
          const originalPriceFormatted = formatPrice(product.originalPrice);
          const productLink = currentSlug ? `/product/${currentSlug}` : "#";

          return (
            <div
              key={product._id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/5]">
                {product.images?.[0]?.asset?.url ? (
                  <Image
                    src={product.images[0].asset.url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Quick View Button - Always visible on mobile, hover on desktop */}
                {currentSlug ? (
                  <a href={productLink} 
                     aria-label={`View details for ${product.name}`}
                     className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm shadow-md hover:bg-black hover:text-white flex items-center whitespace-nowrap hover:scale-105 active:scale-95 transition-all">
                      <FiEye className="mr-2" size={16} />
                      Quick View
                    </button>
                  </a>
                ) : (
                  <button
                    disabled
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-300 text-gray-500 px-4 py-2 rounded-full text-sm opacity-100 cursor-not-allowed flex items-center whitespace-nowrap"
                  >
                    <FiEye className="mr-2" size={16} />
                    Unavailable
                  </button>
                )}

                {/* Gradient Overlay - Only on desktop hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-2">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {product.category}
                </h2>

                <h1 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight sm:group-hover:text-slate-400 transition-colors duration-200">
                  {product.name}
                </h1>
                <h3 className="text-sm font-light text-gray-500 line-clamp-2 leading-tight">
                  {product.subCategory}
                </h3>

                <div className="flex items-center gap-3 pt-1">
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                        -{product.discountPercentage}%
                      </span>

                      <p className="text-sm text-gray-400 line-through">
                        PKR {originalPriceFormatted}
                      </p>
                    </>
                  )}

                  <p className={`text-lg font-bold ${product.discountPercentage > 0 ? 'text-red-700' : 'text-gray-900'} drop-shadow-sm`}>
                    PKR {finalPrice}
                  </p>
                </div>

                {/* Add to Cart Button with onClick handler */}
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 transition-all rounded-lg px-3 py-2 mt-3 text-center hover:shadow-md active:scale-95"
                >
                  <span className="text-sm font-medium">
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full flex justify-center items-center h-48">
          <p className="text-lg text-gray-500 font-medium p-4 border border-dashed border-gray-300 rounded-lg">
            No products to display. Please check the &apos;items&apos; data source.
          </p>
        </div>
      )}
    </div>
  );
};

export default CardMens;