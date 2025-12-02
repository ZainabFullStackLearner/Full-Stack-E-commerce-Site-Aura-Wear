// Query for women's products
export const query = `*[_type == "product" && mainCategory == "womens"]{
  _id,
  name,
  "slug": slug.current,
  mainCategory,
  subCategory,
  price,
  originalPrice,
  discountPercentage,
  images[]{
    asset->{
      url
    }
  }
}`;

// Query for discounted products
export const discountQuery = `*[_type == "product" && discountPercentage > 0]{
  _id,
  name,
  "slug": slug.current,
  mainCategory,
  subCategory,
  price,
  originalPrice,
  discountPercentage,
  images[]{
    asset->{
      url
    }
  }
}`;

// Query for men's products
export const mens = `*[_type == "product" && mainCategory == "mens"]{
  _id,
  name,
  "slug": slug.current,
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
    }
  }
}`;

// Query for kids' products
export const kids = `*[_type == "product" && mainCategory == "kids"]{
  _id,
  name,
  "slug": slug.current,
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
    }
  }
}`;

// Query for women's products (updated for consistency)
export const womens = `*[_type == "product" && mainCategory == "womens"]{
  _id,
  name,
  "slug": slug.current,
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
    }
  }
}`;