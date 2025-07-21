import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveGoodCommand, ReceiveGoodCommandResponse } from '../impl/receive-good.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { NewProductInventoryCommand, NewProductInventoryCommandResponse } from '../impl/new-product-inventory.command';

@CommandHandler(NewProductInventoryCommand)
export class NewProductInventoryHandler implements ICommandHandler<NewProductInventoryCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: NewProductInventoryCommand): Promise<NewProductInventoryCommandResponse> {
    throw new BadRequestException('This command is not implemented yet.');
  }
}
