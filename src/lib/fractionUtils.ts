import { FractionQuestion } from "@/types/types";

export type { FractionQuestion };

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
//função que gera um numero aleatorio dentro do intervalo
function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateFractionResult(question: FractionQuestion): { numerator: number; denominator: number } {
  const { num1, den1, operator, num2, den2 } = question;
  const simplificada = simplifyFraction(question.num1,question.den1);

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
      case '=':
      // equivalencia
      return {
        numerator: simplificada.numerator,
        denominator: simplificada.denominator
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
  if(question.operator === '='){
    return((userNumerator === correctResult.numerator) && (userDenominator === correctResult.denominator));
  }else{
  return isFractionEquivalent(
    userNumerator,
    userDenominator,
    correctResult.numerator,
    correctResult.denominator
  );}
}

// Fgerar pergunta aleatoria de fraçao
export function generateFractionQuestion(operator: '+' | '×' | '=' = '×'): FractionQuestion {
  let num1: number, den1: number, num2: number, den2: number;

  if (operator === '=') {
    // fração para simplificação
    const num = randint(1, 10);
    const den = randint(1, 10);
    const factor = randint(2, 5); // garante simplificação
    num1 = num * factor;
    den1 = den * factor;
    num2 = 0; // nao usa
    den2 = 0; // nao usa
  } else {
    // geração padrão para soma ou multiplicação receba
    num1 = randint(1, 9);
    den1 = randint(1, 9);
    num2 = randint(1, 9);
    den2 = randint(1, 9);
  }
  

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


