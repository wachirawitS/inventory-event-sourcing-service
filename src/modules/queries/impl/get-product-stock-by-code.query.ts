import { Query } from '@nestjs/cqrs';
import { ProductStockView } from 'generated/prisma';

export class GetProductStockByCodeQuery extends Query<ProductStockView[]> {
  constructor(public readonly productCode: string) {
    super();
  }
}
