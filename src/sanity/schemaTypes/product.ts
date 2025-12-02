import type { Rule } from 'sanity'
const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    // Basic Info
    {
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule: Rule) => Rule.required().min(3),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },

    // Category
    {
      name: "mainCategory",
      type: "string",
      title: "Main Category",
      options: {
        list: [
          { title: "Mens", value: "mens" },
          { title: "Womens", value: "womens" },
          { title: "Kids", value: "kids" },
        ],
        layout: "radio",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "subCategory",
      type: "string",
      title: "Sub Category",
      options: {
        list: [
          { title: "Eastern Wear", value: "mens-eastern" },
          { title: "Western Wear", value: "mens-western" },
          { title: "Bottom Wear", value: "mens-bottom" },
          { title: "Stitched", value: "womens-stitched" },
          { title: "Unstitched", value: "womens-unstitched" },
          { title: "Western", value: "womens-western" },
          { title: "Boys", value: "kids-boys" },
          { title: "Girls", value: "kids-girls" },
          { title: "Newborn", value: "kids-newborn" },
        ],
      },
    },

    // Product Images
    {
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: Rule) => Rule.required().min(2).max(5),
    },

    // Pricing
    {
      name: "originalPrice",
      type: "number",
      title: "Original Price (PKR)",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "price",
      type: "number",
      title: "Current Price (PKR)",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "discountPercentage",
      type: "number",
      title: "Discount (%)",
      validation: (Rule: Rule) => Rule.min(0).max(100),
    },

    // Stock
    {
      name: "stockLevel",
      type: "number",
      title: "Stock Level",
      validation: (Rule: Rule) => Rule.required().min(0),
    },

    // Description
    {
      name: "description",
      type: "text",
      title: "Product Description",
    },
  ],
}
export default product