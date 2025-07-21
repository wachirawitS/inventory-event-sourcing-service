import { ProductInventory } from "src/entities/product-inventory.entity";

export class AddedNewProductEvent {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly initialQuantity: number,
    public readonly reserved: number,
    public readonly available: number,
  ) {}
}