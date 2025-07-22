import { Command } from '@nestjs/cqrs';
import { CommandCommonResponse } from 'src/shared/interfaces/command-common-response';

export interface ReserveCommandResponse extends CommandCommonResponse {}

export interface ReserveCommandPayload {
  correlationId: string;
  productCode: string;
  quantity: number;
  locationId: string;
}

export class ReserveCommand extends Command<ReserveCommandResponse> {
  constructor(public readonly payload: ReserveCommandPayload) {
    super();
  }
}