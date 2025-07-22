import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReserveCommand, ReserveCommandResponse } from '../impl/reserve-inventory.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Inventory } from 'src/modules/commands/entities/inventory.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(ReserveCommand)
export class ReserveInventoryHandler implements ICommandHandler<ReserveCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: ReserveCommand): Promise<ReserveCommandResponse> {
    const { correlationId, locationId, productCode, quantity } = command.payload;
    const aggregateId = Inventory.genAggregateId(locationId, productCode);
    try {
      
    } catch (error) {
      throw new BadRequestException(`Error reserving inventory: ${error.message}`);
    }
  }
}
