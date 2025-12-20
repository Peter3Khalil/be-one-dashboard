export type SizeStock = {
  value: string;
  stock: number;
};

export type ColorVariant = {
  color: string;
  image?: string;
  sizes: Array<SizeStock>;
};

export type ProductFormData = {
  name: string;
  price: string;
  description: string;
  variants: Array<ColorVariant>;
};
