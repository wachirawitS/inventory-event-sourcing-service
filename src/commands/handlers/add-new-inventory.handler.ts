import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddNewInventoryCommand, AddNewInventoryCommandResponse } from '../impl/add-new-inventory.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Inventory } from 'src/entities/inventory.entity';
import { BadGatewayException } from '@nestjs/common';

@CommandHandler(AddNewInventoryCommand)
export class AddNewInventoryHandler implements ICommandHandler<AddNewInventoryCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: AddNewInventoryCommand): Promise<AddNewInventoryCommandResponse> {
    try {
      const aggregateId = command.payload.productCode;
      const inventory = this.publisher.mergeObjectContext(new Inventory());
      inventory.addNewInventory(command, true);
      await this.prismaService.$transaction(async (tx) => {
        await tx.eventStore.create({
          data: {
            aggregateId,
            type: inventory.lastAppliedEvent.type,
            payload: inventory.lastAppliedEvent.payload,
            version: inventory.version,
          },
        });
      });
      inventory.commit();
      return {
        productCode: inventory.productCode,
        success: true,
        message: 'New inventory added successfully',
      };
    } catch (error) {
      throw new BadGatewayException('Failed to add new inventory', error.message);
    }
  }
}
