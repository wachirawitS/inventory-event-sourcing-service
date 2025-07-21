import { EventType } from "src/shared/event.enum";

export class AddedNewProductEvent {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly initialQuantity: number,
    public readonly type: EventType = EventType.AddedNewProductEvent,
  ) {}
}