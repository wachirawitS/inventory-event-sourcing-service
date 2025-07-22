import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';
import { CommandsModule } from './modules/commands/commands.module';
import { EventsModule } from './modules/events/events.module';
import { QueriesModule } from './modules/queries/queries.module';

@Module({
  imports: [CqrsModule.forRoot(), SharedModule, CommandsModule, EventsModule, QueriesModule],
})
export class AppModule {}
