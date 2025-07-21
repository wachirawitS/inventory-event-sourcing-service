import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddNewInventoryDto } from './dto/add-new-inventory.dto';
import { AddNewInventoryCommand } from './commands/impl/add-new-inventory.command';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('add-new-inventory')
  public addNewInventory(@Body() body: AddNewInventoryDto) {
    return this.commandBus.execute(new AddNewInventoryCommand(body));
  }
}