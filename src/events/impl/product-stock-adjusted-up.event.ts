import { EventType } from "src/shared/event.enum";

export class ProductStockAdjustedUpEvent {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly type: EventType = EventType.ProductStockAdjustedUpEvent,
  ) {}
}