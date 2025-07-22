import { Global, Module } from '@nestjs/common';
import { EventHandlers } from './handlers';

@Global()
@Module({
  providers: [...EventHandlers],
  exports: [...EventHandlers]
})
export class EventsModule {}
