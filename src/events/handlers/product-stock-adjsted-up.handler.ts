import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Logger } from '@nestjs/common';
import { ProductStockAdjustedUpEvent } from '../impl/product-stock-adjusted-up.event';

@EventsHandler(ProductStockAdjustedUpEvent)
export class ProductStockAdjustedUpEventHandler implements IEventHandler<ProductStockAdjustedUpEvent> {
  constructor(private readonly prismaService: PrismaService) {}

  public async handle(event: ProductStockAdjustedUpEvent) {
    try {
      const result = await this.prismaService.productInventoryProjection.update({
        where: { productId: event.productId },
        data: {
          quantity: { increment: event.quantity },
          available: { increment: event.quantity },
        },
      });
      Logger.debug(`ProductStockAdjustedUpEvent handled successfully for productId: ${result.productId}`);
    } catch (error) {
      Logger.error(`Failed to handle ProductStockAdjustedUpEvent for productId ${event.productId}:`, error);
    }
  }
}
