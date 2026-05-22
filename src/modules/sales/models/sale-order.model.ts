export type SaleItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type SaleOrder = {
  id: string;
  createdAt: string;
  items: SaleItem[];
  totalAmount: number;
};
