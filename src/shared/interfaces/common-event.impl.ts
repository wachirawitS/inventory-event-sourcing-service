import { EventType } from '../enums/event.enum';

export interface CommonEvent {
  type: EventType;
  payload: any;
}
