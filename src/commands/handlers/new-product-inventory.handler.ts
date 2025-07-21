import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/shared/services/prisma.service';
import { NewProductInventoryCommand, NewProductInventoryCommandResponse } from '../impl/new-product-inventory.command';
import { ProductInventory } from 'src/entities/product-inventory.entity';
import { EventType } from 'src/shared/event.enum';
import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@CommandHandler(NewProductInventoryCommand)
export class NewProductInventoryHandler implements ICommandHandler<NewProductInventoryCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: NewProductInventoryCommand): Promise<NewProductInventoryCommandResponse> {
    const { productId, productName, initialQuantity } = command;
    try {
      const productInventory = this.publisher.mergeObjectContext(new ProductInventory(productId, productName, initialQuantity));
      await this.prismaService.eventStore.create({
        data: {
          aggregateId: productInventory.productId,
          type: EventType.AddedNewProductEvent,
          payload: productInventory.lastAppliedEvent,
          version: productInventory.version,
        },
      });
      productInventory.commit();
      return {
        productId,
        success: true,
        message: 'Product inventory created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(
          'Failed to create product inventory: A product with this ID already exists or a similar entry is being processed.',
        );
      }
      throw new BadRequestException(`Failed to create product inventory: An unexpected error occurred.`);
    }
  }
}
