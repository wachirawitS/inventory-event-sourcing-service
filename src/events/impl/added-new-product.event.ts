import { ProductInventory } from "src/entities/product-inventory.entity";

export class AddedNewProductEvent {
  constructor(
    public readonly productInventory: ProductInventory,
  ) {}
}