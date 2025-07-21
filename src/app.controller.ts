import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}
}
