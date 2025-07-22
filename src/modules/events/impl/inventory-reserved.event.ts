import { EventType } from 'src/shared/enums/event.enum';
import { CommonEvent } from 'src/shared/interfaces/common-event.impl';

export interface InventoryReservedEventPayload {
  productCode: string;
  locationId: string;
  quantity: number;
}

export class InventoryReservedEvent implements CommonEvent {
  constructor(
    public readonly correlationId: string,
    public readonly payload: InventoryReservedEventPayload,
    public readonly type: EventType = EventType.InventoryReservedEvent,
  ) {}
}
