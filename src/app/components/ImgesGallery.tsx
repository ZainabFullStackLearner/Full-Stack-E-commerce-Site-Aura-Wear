"use client";
import "react-medium-image-zoom/dist/styles.css";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Filter out any invalid images
  const validImages = images.filter(img => img && img.trim() !== "");
  const mainImage = validImages[selectedImage];
  const hasMultipleImages = validImages.length > 1;

  // Handle image click with bounds checking
  const handleThumbnailClick = (index: number) => {
    if (index >= 0 && index < validImages.length) {
      setSelectedImage(index);
    }
  };

  // Navigate to next/previous image
  const navigateImage = (direction: "next" | "prev") => {
    setSelectedImage(current => {
      if (direction === "next") {
        return (current + 1) % validImages.length;
      } else {
        return current === 0 ? validImages.length - 1 : current - 1;
      }
    });
  };

  if (validImages.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative w-full aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-lg mb-2">📷</div>
            <p>No Images Available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Large Image with Navigation Arrows */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden group">
        
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-125"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            {selectedImage + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 relative w-16 h-16 bg-gray-50 rounded-lg border-2 overflow-hidden transition-all hover:border-[#8B4513] ${
                selectedImage === index 
                  ? "border-[#8B4513] scale-105" 
                  : "border-gray-200"
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-current={selectedImage === index}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;