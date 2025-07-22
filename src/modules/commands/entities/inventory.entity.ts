import { AggregateRoot } from '@nestjs/cqrs';
import { EventStore } from 'generated/prisma';
import { EventType } from 'src/shared/enums/event.enum';
import { CommonEvent } from 'src/shared/interfaces/common-event.impl';
import { AddNewInventoryCommand } from '../impl/add-new-inventory.command';
import { NewInventoryCreatedEvent } from 'src/modules/events/impl/new-inventory-created.event';
import { InventoryReservedEvent } from 'src/modules/events/impl/inventory-reserved.event';

export class Inventory extends AggregateRoot {
  private _productCode: string;
  private _productName: string;
  private _productDescription?: string;
  private _totalQuantity: number;
  private _reservedQuantity: number;
  private _availableQuantity: number;
  private _unitCost: number;
  private _version: number = 0;
  private _lastAppliedEvent: CommonEvent;
  private _locationId: string;

  // method
  public addNewInventory(command: AddNewInventoryCommand, isNewEvent: boolean): void {
    const { productCode, productName, productDescription, initialQuantity, unitCost, locationId } = command.payload;
    this._productCode = productCode;
    this._productName = productName;
    this._productDescription = productDescription;
    this._totalQuantity = initialQuantity;
    this._reservedQuantity = 0;
    this._availableQuantity = initialQuantity;
    this._unitCost = unitCost;
    this._locationId = locationId;
    this._version = 1;

    const event = new NewInventoryCreatedEvent(command.payload);
    this._lastAppliedEvent = event;

    if (isNewEvent) {
      this.apply(event);
    }
  }

  public reserveInventory(correlationId: string, quantity: number, isNewEvent: boolean) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (this._availableQuantity < quantity) {
      throw new Error('Insufficient available inventory');
    }

    this._reservedQuantity += quantity;
    this._availableQuantity -= quantity;
    this._version += 1;

    const event = new InventoryReservedEvent(correlationId, {
      locationId: this._locationId,
      productCode: this._productCode,
      quantity,
    });

    this._lastAppliedEvent = event;

    if (isNewEvent) {
      this.apply(event);
    }
  }

  // replay method
  public static replay(events: EventStore[], isNewEvent: boolean = false): Inventory {
    const inventory = new Inventory();
    for (const event of events) {
      switch (event.type) {
        case EventType.NewInventoryCreatedEvent:
          const { payload } = event as unknown as NewInventoryCreatedEvent;
          inventory.addNewInventory(new AddNewInventoryCommand(payload), isNewEvent);
          break;

        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    }
    return inventory;
  }

  // getters
  get lastAppliedEvent() {
    return this._lastAppliedEvent;
  }

  get productCode() {
    return this._productCode;
  }

  get productName() {
    return this._productName;
  }

  get productDescription() {
    return this._productDescription;
  }

  get totalQuantity() {
    return this._totalQuantity;
  }

  get reservedQuantity() {
    return this._reservedQuantity;
  }

  get availableQuantity() {
    return this._availableQuantity;
  }

  get unitCost() {
    return this._unitCost;
  }

  get version() {
    return this._version;
  }

  static genAggregateId(productCode: string, locationId: string): string {
    return `${productCode}-${locationId}`;
  }
}
