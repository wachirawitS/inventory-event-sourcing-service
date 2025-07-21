import { AggregateRoot } from '@nestjs/cqrs';
import { EventStore } from 'generated/prisma';
import { AddedNewProductEvent } from 'src/events/impl/added-new-product.event';
import { ProductStockAdjustedUpEvent } from 'src/events/impl/product-stock-adjusted-up.event';
import { EventType } from 'src/shared/event.enum';

export class ProductInventory extends AggregateRoot {
  private _productId: string;
  private _productName: string;
  private _quantity: number = 0;
  private _reserved: number = 0;
  private _available: number = 0;
  private _version: number = 0;
  private _lastAppliedEvent: any;

  constructor() {
    super();
  }

  public addNewProduct(productId: string, productName: string, initialQuantity: number = 0, isNewEvent: boolean) {
    this._productId = productId;
    this._productName = productName;
    this._quantity = initialQuantity;
    this._reserved = 0;
    this._available = initialQuantity;
    this._version = 1;
    const event = new AddedNewProductEvent(productId, productName, initialQuantity, 0, initialQuantity);
    if (isNewEvent) {
      this.apply(event);
    }
    this._lastAppliedEvent = event;
  }

  public receiveGoods(quantity: number, isNewEvent: boolean): void {
    this._quantity += quantity;
    this._available += quantity;
    this._version += 1;
    const event = new ProductStockAdjustedUpEvent(
      this._productId,
      quantity,
      this._quantity,
      this._reserved,
      this._available,
    );
    if (isNewEvent) {
      this.apply(event);
    }
    this._lastAppliedEvent = event;
  }

  // This method is used to create a new ProductInventory instance from an event history.
  public static replay(events: EventStore[]): ProductInventory {
    const isNewEvent = false;
    const productInventory = new ProductInventory();
    for (const event of events) {
      switch (event.type) {
        case EventType.AddedNewProductEvent:
          const payload = event.payload as unknown as AddedNewProductEvent;
          productInventory.addNewProduct(payload.productId, payload.productName, payload.initialQuantity, isNewEvent);
          break;
        case EventType.ProductStockAdjustedUpEvent:
          const stockEvent = event.payload as unknown as ProductStockAdjustedUpEvent;
          productInventory.receiveGoods(stockEvent.quantity, isNewEvent);
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
