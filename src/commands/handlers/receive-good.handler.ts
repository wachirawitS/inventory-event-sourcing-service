import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveGoodCommand, ReceiveGoodCommandResponse } from '../impl/receive-good.command';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(ReceiveGoodCommand)
export class ReceiveGoodHandler implements ICommandHandler<ReceiveGoodCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ReceiveGoodCommand): Promise<ReceiveGoodCommandResponse> {
    throw new BadRequestException('This command is not implemented yet.');
  }
}
