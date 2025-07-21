import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AddedNewProductEvent } from "../impl/added-new-product.event";
import { PrismaService } from "src/shared/services/prisma.service";
import { Logger } from "@nestjs/common";

@EventsHandler(AddedNewProductEvent)
export class AddedNewProductEventHandler implements IEventHandler<AddedNewProductEvent> {
  constructor(private readonly prismaService: PrismaService) {}

  public async handle(event: AddedNewProductEvent) {
    try {
      const result = await this.prismaService.productInventoryProjection.create({
        data: {
          productId: event.productId,
          productName: event.productName,
          quantity: event.initialQuantity,
          reserved: 0,
          available: event.initialQuantity,
        },
      });
      Logger.debug(`AddedNewProductEvent handled successfully for productId: ${result.productId}`);
    } catch (error) {
      Logger.error(`Failed to handle AddedNewProductEvent for productId ${event.productId}:`, error);
    }
  }
}