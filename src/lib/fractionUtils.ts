import { FractionQuestion } from "@/types/types";

export type { FractionQuestion };

export function calculateFractionResult(question: FractionQuestion): { numerator: number; denominator: number } {
  const { num1, den1, operator, num2, den2 } = question;

  switch (operator) {
    case '+':
      // Soma: (num1 * den2 + num2 * den1) / (den1 * den2)
      return {
        numerator: num1 * den2 + num2 * den1,
        denominator: den1 * den2
      };

    // case '-':
    //   // Subtração: (num1 * den2 - num2 * den1) / (den1 * den2)
    //   return {
    //     numerator: num1 * den2 - num2 * den1,
    //     denominator: den1 * den2
    //   };

    case '×':
      // multiplicação: (num1 * num2) / (den1 * den2)
      return {
        numerator: num1 * num2,
        denominator: den1 * den2
      };

    default:
      throw new Error(`Operador não suportado: ${operator}`);
  }
}

// verificar equivalencia
export function isFractionEquivalent(
  userNum: number, 
  userDen: number, 
  correctNum: number, 
  correctDen: number
): boolean {
  // tratar divisao por zero
  if (userDen === 0 || correctDen === 0) {
    return false;
  }
  
  //verificar por multiplicação cruzada
  return userNum * correctDen === userDen * correctNum;
}

// funcao para validar resposta do usuario
export function validateFractionAnswer(
  question: FractionQuestion,
  userNumerator: number,
  userDenominator: number
): boolean {
  const correctResult = calculateFractionResult(question);
  return isFractionEquivalent(
    userNumerator,
    userDenominator,
    correctResult.numerator,
    correctResult.denominator
  );
}

// Fgerar pergunta aleatoria de fraçao
export function generateFractionQuestion(): FractionQuestion {
  const operators: ('+'  | '×')[] = ['+', '×']; // sem '-' por enquanto
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  // randint 1-9
  const num1 = Math.floor(Math.random() * 9) + 1;
  const den1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const den2 = Math.floor(Math.random() * 9) + 1;

  return {
    id: `fraction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    module: 'fraction',
    type: 'fraction_operation',
    num1,
    den1,
    operator,
    num2,
    den2
  };
}

// simplificar fraçao
export function simplifyFraction(numerator: number, denominator: number): { numerator: number; denominator: number } {
  if (denominator === 0) {
    return { numerator: 0, denominator: 0 };
  }

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
}
