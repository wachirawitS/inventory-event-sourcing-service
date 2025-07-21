import { Command } from '@nestjs/cqrs';

export interface ReceiveGoodCommandResponse {
  productId: string;
  success: boolean;
  message: string;
}

export class ReceiveGoodCommand extends Command<ReceiveGoodCommandResponse> {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly reason?: string,
  ) {
    super();
  }
}