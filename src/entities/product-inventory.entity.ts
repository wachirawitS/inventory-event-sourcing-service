import { AggregateRoot } from '@nestjs/cqrs';
import { AddedNewProductEvent } from 'src/events/impl/added-new-product.event';
import { EventType } from 'src/shared/event.enum';

interface ProductInventoryState {
  productId: string;
  productName: string;
  quantity: number;
  reserved: number;
  available: number;
  version: number;
}

interface ProductInventoryEvent {
  aggregateId: string;
  type: EventType;
  payload: any;
  version: number;
}

export class ProductInventory extends AggregateRoot {
  constructor(
    private readonly _productId: string,
    private readonly _productName: string,
    private readonly _quantity: number = 0,
    private readonly _reserved: number = 0,
    private readonly _available: number = 0,
    private readonly _version: number = 0,
  ) {
    super();
  }

  public addNewProduct(): void {
    this.apply(new AddedNewProductEvent(this));
  }

  // getters
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
