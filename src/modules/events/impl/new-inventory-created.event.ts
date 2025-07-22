import { EventType } from 'src/shared/enums/event.enum';
import { CommonEvent } from 'src/shared/interfaces/common-event.impl';

export interface NewInventoryCreatedPayload {
  productCode: string;
  productName: string;
  locationId: string;
  productDescription?: string;
  initialQuantity: number;
  unitCost: number;
}

export class NewInventoryCreatedEvent implements CommonEvent {
  constructor(
    public readonly payload: NewInventoryCreatedPayload,
    public readonly type: EventType = EventType.NewInventoryCreatedEvent,
  ) {}
}
