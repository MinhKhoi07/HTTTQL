import { SaleItem } from "../models/sale-order.model";

export type CreateSaleOrderDto = {
  items: SaleItem[];
};
