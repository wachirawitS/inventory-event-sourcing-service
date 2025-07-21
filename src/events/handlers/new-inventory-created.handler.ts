import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewInventoryCreatedEvent } from '../impl/new-inventory-created.event';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Logger } from '@nestjs/common';

@EventsHandler(NewInventoryCreatedEvent)
export class NewInventoryCreatedHandler implements IEventHandler<NewInventoryCreatedEvent> {
  constructor(private readonly prismaService: PrismaService) {}

  public async handle(event: NewInventoryCreatedEvent) {
    try {
      const { payload } = event;
      await this.prismaService.productStockView.create({
        data: {
          productCode: payload.productCode,
          productName: payload.productName,
          productDescription: payload.productDescription,
          totalQuantity: payload.initialQuantity,
          reservedQuantity: 0,
          availableQuantity: payload.initialQuantity,
          unitCost: payload.unitCost,
          locationId: payload.locationId,
        },
      });
      Logger.debug(`New inventory created for product code: ${payload.productCode}`, NewInventoryCreatedHandler.name);
    } catch (error) {
      Logger.error('Failed to handle NewInventoryCreatedEvent', error.message);
    }
  }
}
