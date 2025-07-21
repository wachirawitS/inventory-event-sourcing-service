import { EventType } from "src/shared/event.enum";

export class ProductStockAdjustedUpEvent {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly currentQuantity: number,
    public readonly currentReserved: number,
    public readonly currentAvailable: number,
    public readonly type: EventType = EventType.ProductStockAdjustedUpEvent,
  ) {}
}