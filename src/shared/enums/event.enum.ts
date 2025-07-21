export enum EventType {
  NewInventoryCreatedEvent = 'NewInventoryCreatedEvent',
  InventoryReservedEvent = 'InventoryReservedEvent',
  InventoryReservationFailedEvent = 'InventoryReservationFailedEvent',
  InventoryReleasedEvent = 'InventoryReleasedEvent',
  InventoryDeductedEvent = 'InventoryDeductedEvent',
  InventoryAddedEvent = 'InventoryAddedEvent',
  InventoryUnitCostUpdatedEvent = 'InventoryUnitCostUpdatedEvent',
}