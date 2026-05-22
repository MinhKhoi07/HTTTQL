import { GoodsReceipt } from "../models/goods-receipt.model";

export class WarehouseRepository {
  private readonly receipts: GoodsReceipt[] = [];

  save(receipt: GoodsReceipt): GoodsReceipt {
    this.receipts.push(receipt);
    return receipt;
  }

  findAll(): GoodsReceipt[] {
    return this.receipts;
  }
}
