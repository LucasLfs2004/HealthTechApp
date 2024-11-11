export type productsArrayType = {
  limit: number;
  products: productType[];
  skip: number;
  total: number;
  slug: string;
};

export type productType = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: { width: number; height: number; depth: number };
  discountPercentage: number;
  id: number;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: ratingType[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  isDeleted?: boolean;
  deletedOn?: string;
};

type ratingType = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type newProductType = {
  title: string;
  description: string;
  price: number | string;
  images: string;
  discountPercentage: number | string;
};
