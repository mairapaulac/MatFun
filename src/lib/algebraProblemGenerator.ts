
export type ProblemType = "both_empty" | "first_filled" | "second_filled" | "result_empty" | "complex_blank" | "first_degree_equation" | "system_of_equations" | "exponentiation" | "square_root";

export interface GeneratedProblem {
  firstNumber: number;
  secondNumber: number;
  result: number;
  type: ProblemType;
  equationString?: string;
  correctAnswer?: number;
}

// Função para gerar problema aleatório
export function generateLevel1AlgebraProblem(): GeneratedProblem {
  const firstNumber = Math.floor(Math.random() * 9) + 1; // 1-9
  const secondNumber = Math.floor(Math.random() * 9) + 1; // 1-9
  const result = firstNumber * secondNumber;

  // For level 1, we mostly ask for the result.
  const types: ProblemType[] = ["result_empty", "result_empty", "first_filled", "second_filled"];
  const type = types[Math.floor(Math.random() * types.length)];

  return { firstNumber, secondNumber, result, type };
}

export function generateOrderOfPrecedenceEquation(): GeneratedProblem {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const num3 = Math.floor(Math.random() * 5) + 1;
  
    const operations = ['add_mult', 'sub_mult', 'mult_add', 'mult_sub'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
  
    let equation = '';
    let result = 0;
  
    switch (operation) {
      case 'add_mult':
        // (a + b) * c
        equation = `( ${num1} + ${num2} ) × ${num3}`;
        result = (num1 + num2) * num3;
        break;
      case 'sub_mult':
        // (a - b) * c
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);
        equation = `( ${max} - ${min} ) × ${num3}`;
        result = (max - min) * num3;
        break;
      case 'mult_add':
        // a * b + c
        equation = `${num1} × ${num2} + ${num3}`;
        result = num1 * num2 + num3;
        break;
      case 'mult_sub':
        // a * b - c
        const product = num1 * num2;
        const sub = Math.min(product - 1, num3);
        equation = `${num1} × ${num2} - ${sub}`;
        result = product - sub;
        break;
    }
  
    return {
      firstNumber: 0,
      secondNumber: 0,
      result: result,
      type: 'result_empty',
      equationString: `${equation} = ?`,
    };
  }
  
  export function generateComplexEquationWithBlanks(): GeneratedProblem {
    const a = Math.floor(Math.random() * 10) + 5; // 5-14
    const c = Math.floor(Math.random() * 4) + 2; // 2-5
    const missing_b = Math.floor(Math.random() * (a-1)) + 1; // 1 to a-1
    const d = (a - missing_b) * c;
  
    const equation = `( ${a} - ? ) × ${c} = ${d}`;
  
    return {
        firstNumber: a,
        secondNumber: c,
        result: d,
        type: 'complex_blank',
        equationString: equation,
        correctAnswer: missing_b,
    };
  }

  export function generateFirstDegreeEquation(): GeneratedProblem {
    const x = Math.floor(Math.random() * 10) + 1; // Solution 1-10
    const a = Math.floor(Math.random() * 4) + 2;  // Coefficient 'a' 2-5
    const b = Math.floor(Math.random() * 20) + 1; // Term 'b' 1-20
    const c = a * x + b; // Calculate 'c'
  
    return {
      firstNumber: a,
      secondNumber: b,
      result: c,
      type: 'first_degree_equation',
      equationString: `Encontre o valor de x na equação: ${a}x + ${b} = ${c}`,
      correctAnswer: x,
    };
  }

  export interface GeneratedSystemProblem {
    type: 'system_of_equations';
    eq1: { a: number; b: number; c: number };
    eq2: { a: number; b: number; c: number };
    correctAnswer: { x: number; y: number };
  }
  
  export function generateSystemOfEquations(): GeneratedSystemProblem {
    const x = Math.floor(Math.random() * 10) - 4; // -4 to 5
    const y = Math.floor(Math.random() * 10) - 4; // -4 to 5
    
    const finalX = x === 0 ? -5 : x;
    const finalY = y === 0 ? -5 : y;
  
    const a1 = Math.floor(Math.random() * 4) + 1; // 1-4
    const b1 = Math.floor(Math.random() * 4) + 1; // 1-4
    const c1 = a1 * finalX + b1 * finalY;
  
    let a2 = Math.floor(Math.random() * 4) + 1;
    let b2 = Math.floor(Math.random() * 4) + 1;
    
    while ((a1 * b2) - (a2 * b1) === 0) {
      a2 = Math.floor(Math.random() * 4) + 1;
      b2 = Math.floor(Math.random() * 4) + 1;
    }
    const c2 = a2 * finalX + b2 * finalY;
  
    return {
      type: 'system_of_equations',
      eq1: { a: a1, b: b1, c: c1 },
      eq2: { a: a2, b: b2, c: c2 },
      correctAnswer: { x: finalX, y: finalY },
    };
  }

  export function generateExponentProblem(): GeneratedProblem {
    const base = Math.floor(Math.random() * 9) + 2; // Base 2-10
    const exponent = Math.floor(Math.random() * 2) + 2; // Exponent 2 or 3
    const result = Math.pow(base, exponent);

    return {
      firstNumber: base,
      secondNumber: exponent,
      result: result,
      type: 'exponentiation',
      equationString: `${base} ${exponent === 2 ? '²' : '³'} = ?`,
      correctAnswer: result,
    };
  }

  export function generateSquareRootProblem(): GeneratedProblem {
    const root = Math.floor(Math.random() * 14) + 2; // Result 2-15
    const perfectSquare = root * root;

    return {
      firstNumber: perfectSquare,
      secondNumber: 2, // Implied square root
      result: root,
      type: 'square_root',
      equationString: `√${perfectSquare} = ?`,
      correctAnswer: root,
    };
  }
