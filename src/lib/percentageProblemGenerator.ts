
export type PercentageProblemType =
  | "calculate_result" // Ex: 50% de 200 = ?
  | "calculate_percentage" // Ex: ?% de 80 = 20
  | "calculate_base" // Ex: 25% de ? = 50
  | "percentage_increase" // Ex: 150 + 10% = ?
  | "percentage_decrease"; // Ex: 200 - 25% = ?

export interface GeneratedPercentageProblem {
  problemType: PercentageProblemType;
  base: number;
  percentage: number;
  result: number;
}

// Helper function to get a random element from an array
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to generate a random even number
function getRandomEven(min: number, max: number): number {
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num % 2 !== 0);
    return num;
  }

export function generatePercentageProblem(): GeneratedPercentageProblem {
  const problemType = getRandomElement<PercentageProblemType>([
    "calculate_result",
    "calculate_percentage",
    "calculate_base",
    "percentage_increase",
    "percentage_decrease",
  ]);

  let base: number;
  let percentage: number;
  let result: number;

  switch (problemType) {
    case "calculate_result":
      // 50% de 200 = ? (100)
      percentage = getRandomEven(10, 90);
      base = getRandomEven(100, 500);
      result = (base * percentage) / 100;
      // Ensure result is an integer
      if (result % 1 !== 0) {
        // Recalculate with a new base or percentage
        return generatePercentageProblem();
      }
      break;

    case "calculate_percentage":
      // ?% de 80 = 20 (25%)
      base = getRandomEven(50, 200);
      result = getRandomEven(10, base / 2);
      percentage = (result / base) * 100;
      if (percentage % 1 !== 0) {
        return generatePercentageProblem();
      }
      break;

    case "calculate_base":
      // 25% de ? = 50 (200)
      percentage = getRandomElement([10, 20, 25, 50, 75]);
      result = getRandomEven(10, 100);
      base = (result * 100) / percentage;
      if (base % 1 !== 0) {
        return generatePercentageProblem();
      }
      break;

    case "percentage_increase":
      // 150 + 10% = ? (165)
      base = getRandomEven(100, 300);
      percentage = getRandomElement([10, 20, 25, 50]);
      result = base + (base * percentage) / 100;
      if (result % 1 !== 0) {
        return generatePercentageProblem();
      }
      break;

    case "percentage_decrease":
      // 200 - 25% = ? (150)
      base = getRandomEven(100, 400);
      percentage = getRandomElement([10, 20, 25, 50, 75]);
      result = base - (base * percentage) / 100;
      if (result % 1 !== 0) {
        return generatePercentageProblem();
      }
      break;
  }

  return { problemType, base, percentage, result };
}
