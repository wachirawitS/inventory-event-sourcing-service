import { Command } from '@nestjs/cqrs';
import { CommandCommonResponse } from 'src/shared/interfaces/command-common-response';

interface ReserveItem {
  productCode: string;
  quantity: number;
}

export interface ReserveCommandResponse extends CommandCommonResponse {}

export interface ReserveCommandPayload {
  correlationId: string;
  items: ReserveItem[];
}

export class ReserveCommand extends Command<ReserveCommandResponse> {
  constructor(public readonly payload: ReserveCommandPayload) {
    super();
  }
}