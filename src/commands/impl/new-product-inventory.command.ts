import { Command } from '@nestjs/cqrs';

export interface NewProductInventoryCommandResponse {
  productId: string;
  success: boolean;
  message: string;
}

export class NewProductInventoryCommand extends Command<NewProductInventoryCommandResponse> {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly initialQuantity: number,
  ) {
    super();
  }
}