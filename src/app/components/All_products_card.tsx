import React from "react";
import Image from 'next/image';
import { FiEye } from "react-icons/fi";
type Fullshop = {
  _id: string;
  // Slug is updated to handle both string and object forms commonly returned by APIs
  slug: string | { current: string } | null | undefined;
  name: string;
  originalPrice: number;
  subCategory: string;
  discountPercentage: number;
  price: number; // discounted price
  category: string;
  images: {
    asset: {
      url: string;
    };
  }[];
};

// Inline SVG for the Eye Icon (Replacement for FiEye)
const EyeIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


const CardMens = ({ items }: { items: Fullshop[] }) => {
  // Helper function to format price with thousand separators (PKR standard format)
  const formatPrice = (price: number): string => {
    // Ensuring the price is a number before formatting
    const priceValue = typeof price === 'number' ? price : 0;
    return priceValue.toLocaleString('en-US');
  };

  // --- FIX: Ensure 'items' is an array before mapping to prevent 'Cannot read properties of undefined (reading 'map')' error.
  const productList = items && Array.isArray(items) ? items : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 font-sans">
      {productList.length > 0 ? (
        productList.map((product) => {
          // --- FIX: Safely extract the string value of the slug ---
          const currentSlug = (
            typeof product.slug === 'object' && product.slug !== null && 'current' in product.slug
              ? product.slug.current // Access the string value from the object
              : typeof product.slug === 'string'
                ? product.slug // Use the string directly
                : null // Handle null/undefined or other unexpected types
          );
          // --- END FIX ---
          
          const finalPrice = formatPrice(product.price);
          const originalPriceFormatted = formatPrice(product.originalPrice);
          const productLink = currentSlug ? `/product/${currentSlug}` : "#";

          return (
            <div
              key={product._id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/5]"> {/* Added aspect ratio for consistent card size */}
                {product.images?.[0]?.asset?.url ? (
                  // Replaced <Image> with standard <img> tag
                  // Note: The original Next.js Image component handles optimization, 
                  // but this raw <img> is used to resolve the compilation error.
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

                {/* Quick View Button - Replaced <Link> with <a> */}
                {currentSlug ? (
                  <a href={productLink} 
                     aria-label={`View details for ${product.name}`}
                     className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm shadow-md hover:bg-black hover:text-white flex items-center whitespace-nowrap">
                      <FiEye className="mr-2" size={16} />
                      Quick View
                    </button>
                  </a>
                ) : (
                  <button
                    disabled
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-300 text-gray-500 px-4 py-2 rounded-full text-sm opacity-100 cursor-not-allowed flex items-center whitespace-nowrap"
                  >
                    <EyeIcon className="mr-2" size={16} />
                    Quick View Unavailable
                  </button>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-2">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {product.category}
                </h2>

                <h1 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-slate-400 transition-colors duration-200">
                  {product.name}
                </h1>
                <h3 className="text-sm font-light text-gray-500 line-clamp-2 leading-tight">
                  {product.subCategory}
                </h3>

                <div className="flex items-center gap-3 pt-1">
                  {product.discountPercentage > 0 && (
                    <>
                      {/* Discount Badge */}
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                        -{product.discountPercentage}%
                      </span>

                      {/* Original Price (line-through) */}
                      <p className="text-sm text-gray-400 line-through">
                        PKR {originalPriceFormatted}
                      </p>
                    </>
                  )}

                  {/* Always show final price */}
                  <p className={`text-lg font-bold ${product.discountPercentage > 0 ? 'text-red-700' : 'text-gray-900'} drop-shadow-sm`}>
                    PKR {finalPrice}
                  </p>
                </div>

                {/* Add to Cart Button */}
                {/* Note: This is a placeholder button as no cart logic exists */}
                <button className="w-full bg-slate-800 text-white hover:bg-slate-700 transition-colors rounded-lg px-3 py-2 mt-3 text-center">
                  <span className="text-sm font-medium">
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        // Fallback message when no products are available
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
