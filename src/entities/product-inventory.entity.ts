import { AggregateRoot } from '@nestjs/cqrs';
import { EventStore } from 'generated/prisma';
import { JsonValue } from 'generated/prisma/runtime/library';
import { AddedNewProductEvent } from 'src/events/impl/added-new-product.event';
import { EventType } from 'src/shared/event.enum';

export class ProductInventory extends AggregateRoot {
  private _productId: string;
  private _productName: string;
  private _quantity: number = 0;
  private _reserved: number = 0;
  private _available: number = 0;
  private _version: number = 0;
  private _lastAppliedEvent: any;

  constructor(productId: string, productName: string, initialQuantity: number = 0) {
    super();
    const event = new AddedNewProductEvent(productId, productName, initialQuantity, 0, initialQuantity);
    this.apply(event);
    this._productId = productId;
    this._productName = productName;
    this._quantity = initialQuantity;
    this._reserved = 0;
    this._available = initialQuantity;
    this._version = 1;
    this._lastAppliedEvent = event;
  }

  private applyAddedNewProductEvent(event: AddedNewProductEvent) {
    this._productId = event.productId;
    this._productName = event.productName;
    this._quantity = event.initialQuantity;
    this._reserved = 0;
    this._available = event.initialQuantity;
    this._lastAppliedEvent = event;
  }

  // This method is used to create a new ProductInventory instance from an event history.
  public static replay(events: EventStore[]): ProductInventory {
    const productInventory = new ProductInventory('', '', 0);
    for (const event of events) {
      switch (event.type) {
        case EventType.AddedNewProductEvent:
          const payload = event.payload as unknown as AddedNewProductEvent;
          productInventory.applyAddedNewProductEvent(payload);
          break;

        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    }
    return productInventory;
  }

  // getters
  get lastAppliedEvent(): any {
    return this._lastAppliedEvent;
  }

  get productId(): string {
    return this._productId;
  }
  get productName(): string {
    return this._productName;
  }

  get quantity(): number {
    return this._quantity;
  }

  get reserved(): number {
    return this._reserved;
  }

  get available(): number {
    return this._available;
  }

  get version(): number {
    return this._version;
  }
}
