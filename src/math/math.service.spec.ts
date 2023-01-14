import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();

    service = module.get<MathService>(MathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test calculateFromString method
  describe('calculateFromString', () => {
    it('should return 10 when given "1+9"', () => {
      expect(service.calculateFromString('1+9')).toBe(10);
    });
    it('should return 1.68 when given "4.84-3.16"', () => {
      expect(service.calculateFromString('4.84-3.16')).toBe(1.68);
    });
    it('should return 6 when given "2*3"', () => {
      expect(service.calculateFromString('2*3')).toBe(6);
    });
    it('should return 6 when given "1000*1000"', () => {
      expect(service.calculateFromString('1000*1000')).toBe(1000000);
    });
    it('should return 2 when given "4/2"', () => {
      expect(service.calculateFromString('4/1.6')).toBe(2.5);
    });
    it('should return 1 when given "4/2-1"', () => {
      expect(service.calculateFromString('4/2-1')).toBe(1);
    });
    it('should return 3 when given "1+2*3/3"', () => {
      expect(service.calculateFromString('1+2*3/3')).toBe(3);
    });
    it('should return 13 when given "10/2*3-5/2.5"', () => {
      expect(service.calculateFromString('10/2*3-5/2.5')).toBe(13);
    });
    it('should return 12 when given "(1+2)*3+3"', () => {
      expect(service.calculateFromString('(1+2)*3+3')).toBe(12);
    });
    it('should return 8 when given "8*(5-(4-2))/(4-1)"', () => {
      expect(service.calculateFromString('8*(5-(4-2))/(4-1)')).toBe(8);
    });
    it('should return 27.4 when given "4*(5+2)-(8-5)/(7-2)"', () => {
      expect(service.calculateFromString('4*(5+2)-(8-5)/(7-2)')).toBe(27.4);
    });
    it('should return 3.2 when given "4*((5+2)-(8-5))/(7-2)"', () => {
      expect(service.calculateFromString('4*((5+2)-(8-5))/(7-2)')).toBe(3.2);
    });
  });
});
