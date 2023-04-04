import {
  IsInt,
  IsNumber,
  IsString,
  isString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export class PositionDetailsRequestBody {
  @MinLength(42, { message: 'Address are 20 byte length with 0x prepended' })
  @MaxLength(42, { message: 'Address are 20 byte length with 0x prepended' })
  @IsString({ message: 'address must be string' })
  address: string;

  @IsInt({ message: 'ChainId must be a valid number' })
  chainId: number;
}
