import { SaleOrder } from "../models/sale-order.model";

export class SalesRepository {
  private readonly orders: SaleOrder[] = [];

  save(order: SaleOrder): SaleOrder {
    this.orders.push(order);
    return order;
  }

  findAll(): SaleOrder[] {
    return this.orders;
  }
}
