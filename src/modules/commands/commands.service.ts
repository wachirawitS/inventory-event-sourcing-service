import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddNewInventoryDto } from './dto/add-new-inventory.dto';
import { AddNewInventoryCommand } from './impl/add-new-inventory.command';

@Injectable()
export class CommandsService {
  constructor(private readonly commandBus: CommandBus) {}

  public async addNewInventory(payload: AddNewInventoryDto) {
    return this.commandBus.execute(new AddNewInventoryCommand(payload));
  }
}
