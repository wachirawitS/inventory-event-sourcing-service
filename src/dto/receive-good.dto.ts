import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReceiveGoodDto {
  @ApiProperty()
  @IsString()
  readonly productId: string;

  @ApiProperty()
  @IsNumber()
  readonly quantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly reason?: string;
}
