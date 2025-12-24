// Body of create product (form data)
interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  is_active?: boolean; // default true
  categories: Array<number>; // Array of Category IDs
  variants: Array<{
    size: string;
    color: string;
    stock: number;
  }>;
  images: Record<string, Array<File>>; // key: color, value: array of image files
}

type ImageType = {
  id: string;
  urls: {
    original: string;
    large: string;
    medium: string;
    thumbnail: string;
  };
};

// Response of Create product
interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active?: boolean; // default true
  categories: Array<{
    id: string;
    name: string;
  }>;
  variants: Array<{
    id: string;
    size: string;
    color: string;
    stock: number;
  }>;
  images: Record<string, Array<ImageType>>; // key: color, value: array of image files
}

// Get /products
interface ProductsResponse {
  data: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    is_active?: boolean; // default true
    categories: Array<{
      id: string;
      name: string;
    }>;
    variants: Array<{
      id: string;
      size: string;
      color: string;
      stock: number;
    }>;
    images: Record<string, Array<ImageType>>; // key: color, value: array of image files
  }>;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
    total_items: number;
  };
}

// PUT /products/:productId/variants/:variantId
interface ProductVariantResponse {
  size?: string;
  color?: string;
  stock?: number;
}
