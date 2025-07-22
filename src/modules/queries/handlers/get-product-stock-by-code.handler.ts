import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductStockByCodeQuery } from '../impl/get-product-stock-by-code.query';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ProductStockView } from 'generated/prisma';

@QueryHandler(GetProductStockByCodeQuery)
export class GetProductStockByCodeHandler implements IQueryHandler<GetProductStockByCodeQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(query: GetProductStockByCodeQuery): Promise<ProductStockView[]> {
    const { productCode } = query;
    return this.prismaService.productStockView.findMany({
      where: {
        productCode,
      },
    });
  }
}
