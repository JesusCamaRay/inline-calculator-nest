import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MathService } from './math.service';
import { CalculateMathDto } from './dto/calculate-math.dto';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Post('calculate')
  calculate(@Body() payload: CalculateMathDto) {
    try {
      return {
        data: this.mathService.calculate(payload),
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
