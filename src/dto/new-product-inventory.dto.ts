import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NewProductInventoryDto {
  @ApiProperty()
  @IsString()
  readonly productId: string;

  @ApiProperty()
  @IsString()
  readonly productName: string;

  @ApiPropertyOptional()
  @IsNumber()
  readonly initialQuantity?: number;
}
