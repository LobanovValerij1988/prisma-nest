import {
  IsNumber,
  IsOptional,
  IsBoolean,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 255)
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock!: number;

  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @IsBoolean()
  IsTombolaEligible!: boolean;

  @IsOptional()
  @IsBoolean()
  IsDigitalProduct!: boolean;
}
