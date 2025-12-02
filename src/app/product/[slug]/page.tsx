import { client } from "@/sanity/lib/client";
import ProductDetails from "./components/ProductDetails";
import { Metadata } from "next";

// ----------------- Metadata -----------------
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | AuraWear`,
    description: product.description || `Buy ${product.name} at the best price.`,
  };
}

// ----------------- Page Component -----------------
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}

// ----------------- Generate Static Params -----------------
export async function generateStaticParams() {
  const query = `*[_type == "product"]{ "slug": slug.current }`;
  const products = await client.fetch(query);

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}
