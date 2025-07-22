import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('queries')
export class QueriesController {
  constructor(private readonly commandBus: CommandBus) {}
}
