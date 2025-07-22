import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddNewInventoryDto } from './dto/add-new-inventory.dto';
import { AddNewInventoryCommand } from './impl/add-new-inventory.command';
import { ReserveInventoryDto } from './dto/reserve-inventory.dto';
import { GetProductStockByCodeQuery } from '../queries/impl/get-product-stock-by-code.query';

@Injectable()
export class CommandsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async addNewInventory(payload: AddNewInventoryDto) {
    return this.commandBus.execute(new AddNewInventoryCommand(payload));
  }

  public async reserveInventory(payload: ReserveInventoryDto) {
    try {
      for (const item of payload.reserveItems) {
        const { productCode, quantity } = item;
        const productStocks = await this.queryBus.execute(new GetProductStockByCodeQuery(productCode));

        if (productStocks.length === 0) {
          throw new Error(`Product with code ${productCode} not found`);
        }

        // 1. sum available quantities of all stocks for the product
        const totalStock = productStocks.reduce((sum, stock) => sum + stock.availableQuantity, 0);

        // 2. check if the requested quantity is available
        if (quantity > totalStock) {
          throw new Error(
            `Insufficient stock for product ${productCode}. Available: ${totalStock}, Requested: ${quantity}`,
          );
        }

        // 3. reserve the inventory

      }
    } catch (error) {
      throw new BadRequestException('Error reserving inventory: ' + error.message);
    }
  }
}
