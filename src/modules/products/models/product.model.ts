export type Product = {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  unit: string;
  price: number;
  cost: number;
  category?: string | null;
  stock: number;
};
