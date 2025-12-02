// src/app/category/[subcategory]/page.tsx
import Breadcrumb from "@/app/components/Breadcrumb";
import { client } from "@/sanity/lib/client";
import CardMens from "@/app/components/All_products_card";
import { notFound } from "next/navigation";

// Define the subcategory mapping for each main category with updated values
const subcategoryMapping = {
  mens: ["mens-eastern", "mens-western", "mens-bottom"],
  womens: ["womens-stitched", "womens-unstitched", "womens-western"],
  kids: ["kids-boys", "kids-girls", "kids-newborn"]
};

// URL-friendly subcategory mapping
// URL-friendly subcategory mapping - FIXED VERSION
const urlFriendlyMapping: Record<string, string> = {
  // Mens
  "mens-eastern": "eastern",
  "mens-western": "western", 
  "mens-bottom": "bottom",
  
  // Womens
  "womens-stitched": "stitched",
  "womens-unstitched": "unstitched",
  "womens-western": "womens-western", // Keep this distinct
  
  // Kids
  "kids-boys": "boys",
  "kids-girls": "girls",
  "kids-newborn": "newborn"
};

// Reverse mapping for URL to actual value
const reverseUrlMapping: Record<string, string> = {
  // Mens
  "eastern": "mens-eastern",
  "western": "mens-western", 
  "bottom": "mens-bottom",
  
  // Womens
  "stitched": "womens-stitched",
  "unstitched": "womens-unstitched",
  "womens-western": "womens-western", // This is the key fix
  
  // Kids
  "boys": "kids-boys",
  "girls": "kids-girls",
  "newborn": "kids-newborn"
};

// Function to determine main category from subcategory
function getMainCategory(subcategory: string): string | null {
  for (const [mainCat, subCats] of Object.entries(subcategoryMapping)) {
    if (subCats.includes(subcategory)) {
      return mainCat;
    }
  }
  return null;
}

// Helper function for formatting subcategory names
function formatSubcategoryName(sub: string): string {
  const nameMap: Record<string, string> = {
    "mens-eastern": "Eastern Wear",
    "mens-western": "Western Wear", 
    "mens-bottom": "Bottom Wear",
    "womens-stitched": "Stitched",
    "womens-unstitched": "Unstitched",
    "womens-western": "Western",
    "kids-boys": "Boys",
    "kids-girls": "Girls",
    "kids-newborn": "Newborn"
  };
  
  if (nameMap[sub]) return nameMap[sub];
  const parts = sub.split('-');
  if (parts.length > 1 && parts[1]) {
    return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  }
  return sub.charAt(0).toUpperCase() + sub.slice(1);
}

export default async function SubCategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory: urlSubcategory } = await params;
  
  // Map URL parameter to actual subcategory value using reverse mapping
  const actualSubcategory = reverseUrlMapping[urlSubcategory] || urlSubcategory;
  
  const mainCategory = getMainCategory(actualSubcategory);
  
  if (!mainCategory) {
    notFound();
  }

  // GROQ query: products for the selected mainCategory and subCategory
  const products = await client.fetch(
    `*[_type == "product" && mainCategory == $mainCategory && subCategory == $subcategory]{
        _id,
  name,
  slug,
  mainCategory,
  subCategory,
  price,
  originalPrice,
  discountPercentage,
  stockLevel,
  description,
   images[]{
    asset->{
      url
  }}
    }`,
    { mainCategory, subcategory: actualSubcategory }
  );

  const formattedSubcategory = formatSubcategoryName(actualSubcategory);
  const formattedMainCategory = mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);

  return (
    <div className="mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: formattedMainCategory, href: `/${mainCategory}` },
          { label: formattedSubcategory, href: `/category/${urlSubcategory}` },
        ]}
      />
      
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-gray-900 font-logo mb-4">
          {formattedSubcategory} Collection
        </h1>
        <p className="text-gray-600">
          Discover our premium {formattedSubcategory.toLowerCase()} collection
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <p className="text-gray-400 mt-2">Check back later for new arrivals!</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 ml-4">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
          <CardMens items={products} />
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  // Return URL-friendly versions for static generation
  return [
    { subcategory: 'eastern' },
    { subcategory: 'western' },
    { subcategory: 'bottom' },
    { subcategory: 'stitched' },
    { subcategory: 'unstitched' },
    { subcategory: 'womens-western' }, // Add this distinct URL
    { subcategory: 'boys' },
    { subcategory: 'girls' },
    { subcategory: 'newborn' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory: urlSubcategory } = await params;
  const actualSubcategory = urlFriendlyMapping[urlSubcategory] || urlSubcategory;
  const mainCategory = getMainCategory(actualSubcategory);
  const formattedSubcategory = formatSubcategoryName(actualSubcategory);
  const formattedMainCategory = mainCategory ? mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1) : "Category";
  
  return {
    title: `${formattedSubcategory} Collection | ${formattedMainCategory}`,
    description: `Browse our ${formattedSubcategory.toLowerCase()} collection for ${formattedMainCategory}. Find the latest styles and trends.`,
  };
}