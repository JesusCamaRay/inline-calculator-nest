import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculateMathDto } from './dto/calculate-math.dto';

@Injectable()
export class MathService {
  calculate(payload: CalculateMathDto) {
    try {
      const { mathExpression } = payload;
      //check if mathExpression only contains numbers and +, -, *, /, (, ) characters
      const regex = /^[0-9()+-/*]+$/;
      if (!regex.test(mathExpression)) {
        throw new BadRequestException('Invalid math expression');
      }
      //clean spaces
      const mathExpressionWithoutSpaces = mathExpression.replace(/\s/g, '');
      //calculate result from string
      const result = this.calculateFromString(mathExpressionWithoutSpaces);
      console.log('Result: ', result);
      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }

  getFirstAndLastParenthesis(mathExpression: string) {
    let firstParenthesis = -1;
    let lastParenthesis = -1;
    let parenthesisCounter = 0;
    for (let i = 0; i < mathExpression.length; i++) {
      if (mathExpression[i] === '(') {
        if (parenthesisCounter === 0) {
          firstParenthesis = i;
        }
        parenthesisCounter++;
      }
      if (mathExpression[i] === ')') {
        parenthesisCounter--;
        if (parenthesisCounter === 0) {
          lastParenthesis = i;
          break;
        }
      }
    }

    return { firstParenthesis, lastParenthesis };
  }

  calculateFromString(mathExpression: string) {
    console.log('Calculating ...', mathExpression);
    //search for expressions inside parenthesis
    let result = 0;
    const { firstParenthesis, lastParenthesis } =
      this.getFirstAndLastParenthesis(mathExpression);

    // calculate the expression inside the parenthesis recursively
    if (firstParenthesis !== -1 && lastParenthesis !== -1) {
      const expressionInsideParenthesis = mathExpression.substring(
        firstParenthesis + 1,
        lastParenthesis,
      );
      const resultInsideParenthesis = this.calculateFromString(
        expressionInsideParenthesis,
      );
      const expressionBeforeParenthesis = mathExpression.substring(
        0,
        firstParenthesis,
      );
      const expressionAfterParenthesis = mathExpression.substring(
        lastParenthesis + 1,
      );
      const newExpression =
        expressionBeforeParenthesis +
        resultInsideParenthesis +
        expressionAfterParenthesis;
      result = this.calculateFromString(newExpression);
    } else {
      result = this.calculateWithoutParenthesis(mathExpression);
    }
    return result;
  }

  calculateWithoutParenthesis(mathExpression: string) {
    //No parenthesis found, calculate the expression with the order of operations
    //First *, /
    const expressionArray = mathExpression.split(/(\+|\-|\*|\/)/);
    let firstMultiplicationOrDivision = expressionArray.findIndex(
      (element) => element === '*' || element === '/',
    );
    while (firstMultiplicationOrDivision !== -1) {
      const firstNumber = Number(
        expressionArray[firstMultiplicationOrDivision - 1],
      );
      const secondNumber = Number(
        expressionArray[firstMultiplicationOrDivision + 1],
      );
      const operator = expressionArray[firstMultiplicationOrDivision];
      let resultOfOperation = 0;
      if (operator === '*') {
        resultOfOperation = firstNumber * secondNumber;
      } else {
        resultOfOperation = firstNumber / secondNumber;
      }
      expressionArray.splice(
        firstMultiplicationOrDivision - 1,
        3,
        resultOfOperation.toString(),
      );
      firstMultiplicationOrDivision = expressionArray.findIndex(
        (element) => element === '*' || element === '/',
      );
    }
    //Second +, -
    let firstAdditionOrSubtraction = expressionArray.findIndex(
      (element) => element === '+' || element === '-',
    );
    while (firstAdditionOrSubtraction !== -1) {
      const firstNumber = Number(
        expressionArray[firstAdditionOrSubtraction - 1],
      );
      const secondNumber = Number(
        expressionArray[firstAdditionOrSubtraction + 1],
      );
      const operator = expressionArray[firstAdditionOrSubtraction];
      let resultOfOperation = 0;
      if (operator === '+') {
        resultOfOperation = firstNumber + secondNumber;
      } else {
        resultOfOperation = Number((firstNumber - secondNumber).toFixed(8));
      }
      if (resultOfOperation < 0) {
        throw new BadRequestException(
          'Invalid math expression. Result of a operation is negative',
        );
      }

      expressionArray.splice(
        firstAdditionOrSubtraction - 1,
        3,
        resultOfOperation.toString(),
      );
      firstAdditionOrSubtraction = expressionArray.findIndex(
        (element) => element === '+' || element === '-',
      );
    }
    return Number(expressionArray[0]);
  }
}
