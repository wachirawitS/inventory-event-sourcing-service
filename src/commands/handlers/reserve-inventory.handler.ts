import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReserveCommand, ReserveCommandResponse } from '../impl/reserve-inventory.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Inventory } from 'src/entities/inventory.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(ReserveCommand)
export class ReserveInventoryHandler implements ICommandHandler<ReserveCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: ReserveCommand): Promise<ReserveCommandResponse> {
    const { correlationId, items } = command.payload;
    try {
      await this.prismaService.$transaction(async (tx) => {
        for (const item of items) {
          const events = await tx.eventStore.findMany({
            where: { aggregateId: item.productCode },
            orderBy: { version: 'asc' },
          });
          if (events.length === 0) {
            throw new Error(`No inventory found for product code ${item.productCode}`);
          }
          const inventory = this.publisher.mergeObjectContext(Inventory.replay(events));
          inventory.reserveInventory(correlationId, item.quantity, true);
          await tx.eventStore.create({
            data: {
              aggregateId: item.productCode,
              version: inventory.version,
              type: inventory.lastAppliedEvent.type,
              payload: inventory.lastAppliedEvent.payload,
            },
          });
          inventory.commit();
        }
      });
      return { success: true, message: 'Inventory reserved successfully' };
    } catch (error) {
      throw new BadRequestException(`Failed to reserve inventory: ${error.message}`);
    }
  }
}
