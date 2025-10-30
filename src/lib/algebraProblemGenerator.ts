
export type ProblemType = "both_empty" | "first_filled" | "second_filled" | "result_empty" | "complex_blank" | "first_degree_equation";

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
  
    // The user needs to find 'x'. The equation string will not show 'x' but a blank space.
    const equationString = `${a}x + ${b} = ${c}`;
  
    return {
      firstNumber: a,
      secondNumber: b,
      result: c,
      type: 'first_degree_equation',
      equationString: `${a}x + ${b} = ${c}`,
      correctAnswer: x,
    };
  }
