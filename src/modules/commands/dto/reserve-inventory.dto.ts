import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsNumber, IsString, ValidateNested } from "class-validator";

export class ReserveItemDto {
  @ApiProperty()
  @IsString()
  productCode: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class ReserveInventoryDto {
  @ApiProperty()
  @IsString()
  correlationId: string;

  @ApiProperty({ type: [ReserveItemDto] })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReserveItemDto)
  reserveItems: ReserveItemDto[];
}