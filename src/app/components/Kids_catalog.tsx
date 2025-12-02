import React from "react";
import Link from "next/link";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
const Kids_catalog = () => {
  const categories = [
    { title: "Girls", image: "/images/girls.jpg", items: "24 items" },
    { title: "Boys", image: "/images/boys.jpg", items: "32 items" },
    { title: "Newborn", image: "/images/babies.jpg", items: "18 items" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="text-center mb-12 font-logo">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          KIDS COLLECTION
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
         Elevate your wardrobe with our kids collection—blending playful style, vibrant expression, and everyday comfort.
        </p>
      </div>

      {/* Horizontal scroll container for mobile, grid for desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 md:w-full md:flex-shrink"
          >
            <Link href={`/category/${cat.title.toLowerCase()}`}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer mx-2 md:mx-0">
                {/* Image container with smaller height */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  ></div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {cat.items}
                    </p>

                    {/* Shop now button */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                      <span className="inline-flex items-center text-xs font-medium border border-white/30 hover:border-white px-3 py-1.5 rounded-full transition-all hover:bg-white/10">
                        Shop Now
                        <FaArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <FaArrowAltCircleUp className="h-4 w-4 text-gray-800" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Scroll indicator for mobile */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="flex space-x-2">
          {categories.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
        <div className="text-center mt-12">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center mx-auto">
                View All Categories
                <FaArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
           
    </div>
  );
};

export default Kids_catalog;
