import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/services/shared.module';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule.forRoot(), SharedModule],
  controllers: [AppController],
  providers: [...CommandHandlers, ...EventHandlers],
})
export class AppModule {}
