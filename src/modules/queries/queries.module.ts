import { Global, Module } from '@nestjs/common';
import { QueriesController } from './queries.controller';
import { QueryHandlers } from './handlers';

@Global()
@Module({
  controllers: [QueriesController],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class QueriesModule {}
