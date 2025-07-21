import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddNewInventoryDto {
  @ApiProperty()
  @IsString()  
  productCode: string;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  productDescription?: string;

  @ApiProperty()
  @IsNumber()
  initialQuantity: number;

  @ApiProperty()
  @IsNumber()
  unitCost: number;
}