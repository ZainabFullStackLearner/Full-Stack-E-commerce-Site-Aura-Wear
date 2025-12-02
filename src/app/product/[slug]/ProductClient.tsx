'use client';

import { ShoppingCart, Package } from "lucide-react";
import ImageGallery from "../../components/ImgesGallery";
import { useCart } from "../../context/Context";
import { toast } from "react-toastify";
import { Product } from "@/app/types/product";

// ----------------- Format Price -----------------
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart();

  const {
    _id,
    name,
    mainCategory,
    subCategory,
    originalPrice,
    price,
    discountPercentage,
    stockLevel,
    description,
    images = [],
  } = product;

  // Extract valid image URLs
  const imageUrls = images
    .map((img: { asset: { url: string } }) => img?.asset?.url)
    .filter((url: string | null) => url && url.trim() !== "");

  const isInStock = stockLevel > 0;

  const handleAddToCart = () => {
    if (isInStock) {
      addItem(
        {
          id: _id,
          name,
          price,
          image: imageUrls[0] || "",
        },
        1
      );
      toast.success("Item added to cart!");
    }
  };

  const handleBuyNow = async () => {
    if (!isInStock) return;

    const item = {
      id: _id,
      name,
      price,
      image: imageUrls[0] || "",
      qty: 1,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [item] }),
      });

      const { session } = await response.json();

      if (session && session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-10 md:mt-6 ">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <ImageGallery images={imageUrls} productName={name} />

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#8B4513] uppercase tracking-wide">
                {mainCategory}
              </p>
              <h1 className="text-3xl font-bold text-[#8B4513]">{name}</h1>
              <p className="text-gray-600">{subCategory}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(price)}
                </p>
                {discountPercentage > 0 && (
                  <>
                    <p className="text-lg text-gray-500 line-through">
                      {formatCurrency(originalPrice)}
                    </p>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <p
                className={`flex items-center gap-2 text-sm ${
                  isInStock ? "text-green-600" : "text-red-600"
                }`}
              >
                <Package className="w-4 h-4" />
                {isInStock ? `In Stock (${stockLevel})` : "Out of Stock"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isInStock
                    ? "bg-[#8B4513] text-white hover:bg-[#a86734]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!isInStock}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={handleBuyNow}
                className={`w-full py-3 px-6 text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#fce7d4] transition-colors font-semibold ${
                  !isInStock && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isInStock}
              >
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {description || "No description available for this product."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}