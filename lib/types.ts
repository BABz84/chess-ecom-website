export type ProductVariant = {
  id: string;
  title: string;
  quantityAvailable: number;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  featuredImage?: {
    url: string;
    altText?: string;
  };
  images: {
    nodes: {
      url: string;
      altText: string | null;
    }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: ProductVariant[];
  };
};

export type ProductCardData = {
  id: string;
  handle: string;
  title: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    altText?: string;
  };
  images?: {
    nodes: {
      url: string;
      altText: string | null;
    }[];
  };
};
