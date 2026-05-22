import { CreateGoodsReceiptDto } from "../dto/create-goods-receipt.dto";
import { GoodsReceipt } from "../models/goods-receipt.model";
import { WarehouseRepository } from "../repositories/warehouse.repository";

export class WarehouseService {
  constructor(private readonly repository: WarehouseRepository) {}

  createGoodsReceipt(input: CreateGoodsReceiptDto): GoodsReceipt {
    const receipt: GoodsReceipt = {
      id: `GR-${Date.now()}`,
      supplierId: input.supplierId,
      warehouseId: input.warehouseId,
      items: input.items,
      createdAt: new Date().toISOString()
    };

    return this.repository.save(receipt);
  }

  listGoodsReceipts(): GoodsReceipt[] {
    return this.repository.findAll();
  }
}
