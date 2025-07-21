import { AggregateRoot } from '@nestjs/cqrs';
import { AddNewInventoryCommand } from 'src/commands/impl/add-new-inventory.command';
import { NewInventoryCreatedEvent } from 'src/events/impl/new-inventory-created.event';
import { CommonEvent } from 'src/shared/interfaces/common-event.impl';

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

  // method
  public addNewInventory(command: AddNewInventoryCommand, isNewEvent: boolean): void {
    const { productCode, productName, locationId, productDescription, initialQuantity, unitCost } = command.payload;
    this._productCode = productCode;
    this._productName = productName;
    this._productDescription = productDescription;
    this._totalQuantity = initialQuantity;
    this._reservedQuantity = 0;
    this._availableQuantity = initialQuantity;
    this._unitCost = unitCost;
    this._version = 1;

    const event = new NewInventoryCreatedEvent(command.payload);
    this._lastAppliedEvent = event;

    if (isNewEvent) {
      this.apply(event);
    }
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
}
