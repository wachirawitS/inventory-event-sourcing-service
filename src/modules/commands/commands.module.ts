import { Global, Module } from '@nestjs/common';
import { CommandsController } from './commands.controller';
import { CommandHandlers } from './handlers';
import { CommandsService } from './commands.service';

@Module({
  controllers: [CommandsController],
  providers: [...CommandHandlers, CommandsService],
  exports: [...CommandHandlers],
})
export class CommandsModule {}
