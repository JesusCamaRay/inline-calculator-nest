import { IsNotEmpty, IsString } from 'class-validator';

export class CalculateMathDto {
  @IsString()
  @IsNotEmpty()
  mathExpression: string;
}
