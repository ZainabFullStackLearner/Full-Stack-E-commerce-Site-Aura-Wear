import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProductClient from "../ProductClient";

// ----------------- GROQ Query -----------------
const query = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainCategory,
  subCategory,
  originalPrice,
  price,
  discountPercentage,
  stockLevel,
  description,
  images[] {
    asset-> {
      url
    }
  }
}`;

export default async function ProductDetails({ slug }: { slug: string }) {
  const product = await client.fetch(query, { slug });

  if (!product) notFound();

  return <ProductClient product={product} />;
}