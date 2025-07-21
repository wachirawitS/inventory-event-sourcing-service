import { Body, Controller, Post } from '@nestjs/common';
import { ReceiveGoodDto } from './dto/receive-good.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveGoodCommand } from './commands/impl/receive-good.command';
import { NewProductInventoryCommand } from './commands/impl/new-product-inventory.command';
import { NewProductInventoryDto } from './dto/new-product-inventory.dto';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('new-product-inventory')
  async createNewProductInventory(@Body() newProductInventoryDto: NewProductInventoryDto) {
    return this.commandBus.execute(
      new NewProductInventoryCommand(
        newProductInventoryDto.productId,
        newProductInventoryDto.productName,
        newProductInventoryDto.initialQuantity,
      ),
    );
  }

  @Post('receive-good')
  async receiveGood(@Body() receiveGoodDto: ReceiveGoodDto) {
    return this.commandBus.execute(
      new ReceiveGoodCommand(receiveGoodDto.productId, receiveGoodDto.quantity, receiveGoodDto.reason),
    );
  }
}
