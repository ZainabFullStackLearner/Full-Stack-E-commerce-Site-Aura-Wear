export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  mainCategory: string;
  subCategory: string;
  originalPrice: number;
  price: number;
  discountPercentage: number;
  stockLevel: number;
  description: string;
  images: {
    asset: {
      url: string;
    };
  }[];
}
