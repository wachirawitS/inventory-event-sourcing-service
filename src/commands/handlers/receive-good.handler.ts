import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveGoodCommand, ReceiveGoodCommandResponse } from '../impl/receive-good.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ProductInventory } from 'src/entities/product-inventory.entity';

@CommandHandler(ReceiveGoodCommand)
export class ReceiveGoodHandler implements ICommandHandler<ReceiveGoodCommand> {
  constructor(private readonly prismaService: PrismaService, private readonly publisher: EventPublisher) {}

  public async execute(command: ReceiveGoodCommand): Promise<ReceiveGoodCommandResponse> {
    const { productId, quantity } = command;
    try {
      await this.prismaService.$transaction(async (tx) => {
        const events = await tx.eventStore.findMany({
          where: { aggregateId: productId },
          orderBy: { createdAt: 'asc' },
        });
        if (events.length === 0) {
          throw new Error(`Product with ID ${productId} does not exist.`);
        }
        const productInventory = this.publisher.mergeObjectContext(ProductInventory.replay(events));
        productInventory.receiveGoods(quantity, true);
        if (!productInventory.lastAppliedEvent) {
          throw new Error('No event was applied to the product inventory.');
        }
        await tx.eventStore.create({
          data: {
            aggregateId: productInventory.productId,
            type: productInventory.lastAppliedEvent.type,
            payload: productInventory.lastAppliedEvent,
            version: productInventory.version,
          },
        });
        productInventory.commit();
      });
      return {
        productId,
        success: true,
        message: `Goods received successfully. New quantity: ${quantity}`,
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not exist')) {
        throw new BadRequestException(`Failed to receive goods: ${error.message}`);
      }
      throw new BadRequestException(`Failed to receive goods: An unexpected error occurred.`);
    }
  }
}
