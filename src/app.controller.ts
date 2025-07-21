import { Body, Controller, Post } from '@nestjs/common';
import { ReceiveGoodDto } from './dto/receive-good.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveGoodCommand } from './commands/impl/receive-good.command';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('receive-good')
  async receiveGood(@Body() receiveGoodDto: ReceiveGoodDto) {
    return this.commandBus.execute(
      new ReceiveGoodCommand(
        receiveGoodDto.productId,
        receiveGoodDto.quantity,
        receiveGoodDto.reason,
      ),
    );
  }
}
