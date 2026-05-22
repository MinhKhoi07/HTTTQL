import { CreateSaleOrderDto } from "../dto/create-sale-order.dto";
import { SalesRepository } from "../repositories/sales.repository";
import { SaleOrder } from "../models/sale-order.model";

export class SalesService {
  constructor(private readonly repository: SalesRepository) {}

  createOrder(input: CreateSaleOrderDto): SaleOrder {
    const totalAmount = input.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const order: SaleOrder = {
      id: `SO-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: input.items,
      totalAmount
    };

    return this.repository.save(order);
  }

  listOrders(): SaleOrder[] {
    return this.repository.findAll();
  }
}
