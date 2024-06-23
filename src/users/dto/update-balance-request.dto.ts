import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBalanceRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
