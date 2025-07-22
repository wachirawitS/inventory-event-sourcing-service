import { Body, Controller, Post } from '@nestjs/common';
import { AddNewInventoryDto } from './dto/add-new-inventory.dto';
import { CommandsService } from './commands.service';
import { ReserveInventoryDto } from './dto/reserve-inventory.dto';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandService: CommandsService) {}

  @Post('add-new-inventory')
  public addNewInventory(@Body() body: AddNewInventoryDto) {
    return this.commandService.addNewInventory(body);
  }

  @Post('reserve-inventory')
  public reserveInventory(@Body() body: ReserveInventoryDto) {
    return this.commandService.reserveInventory(body);
  }
}
