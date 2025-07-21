import { Command } from '@nestjs/cqrs';
import { CommandCommonResponse } from 'src/shared/interfaces/command-common-response';

export interface AddNewInventoryCommandResponse extends CommandCommonResponse {
  productCode: string;
}

export interface AddNewInventoryCommandPayload {
  productCode: string;
  productName: string;
  locationId?: string;
  productDescription?: string;
  initialQuantity: number;
  unitCost: number;
}

export class AddNewInventoryCommand extends Command<AddNewInventoryCommandResponse> {
  constructor(public readonly payload: AddNewInventoryCommandPayload) {
    super();
  }
}
