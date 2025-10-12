
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

// Helper function to generate a random integer multiple
const getRandomMultiple = (
  multiple: number,
  minFactor = 1,
  maxFactor = 10,
) => {
  const factor = Math.floor(Math.random() * (maxFactor - minFactor + 1)) + minFactor;
  return factor * multiple;
};

export function generatePercentageProblem(allowedTypes: PercentageProblemType[]): GeneratedPercentageProblem {
  const problemType = getRandomElement(allowedTypes);

  const easyPercentages = [10, 20, 25, 50, 75];
  let base: number;
  let percentage: number;
  let result: number;

  switch (problemType) {
    case "calculate_result":
    case "percentage_increase":
    case "percentage_decrease":
      // percentage% de base = ?
      percentage = getRandomElement(easyPercentages);

      // To ensure the result is an integer, the base must be compatible with the percentage.
      if (percentage === 10) { // 1/10 -> base must be a multiple of 10
        base = getRandomMultiple(10, 2, 10); // 20 to 100
      } else if (percentage === 20) { // 1/5 -> base must be a multiple of 5
        base = getRandomMultiple(5, 4, 20); // 20 to 100
      } else if (percentage === 25 || percentage === 75) { // 1/4 or 3/4 -> base must be a multiple of 4
        base = getRandomMultiple(4, 5, 25); // 20 to 100
      } else { // 50% (1/2) -> base must be a multiple of 2
        base = getRandomMultiple(2, 10, 50); // 20 to 100
      }

      if (problemType === "percentage_increase") {
        result = base + (base * percentage) / 100;
      } else if (problemType === "percentage_decrease") {
        result = base - (base * percentage) / 100;
      } else {
        result = (base * percentage) / 100;
      }
      break;

    case "calculate_percentage":
      // ?% de base = result
      percentage = getRandomElement(easyPercentages);
      // Using a base that is a multiple of 100 makes the result an easy integer.
      base = getRandomMultiple(100, 1, 5); // 100, 200, 300, 400, 500
      result = (base * percentage) / 100;
      break;

    case "calculate_base":
      // percentage% de ? = result
      percentage = getRandomElement(easyPercentages);

      // To ensure the base is an integer, the result must be chosen carefully.
      // base = (result * 100) / percentage
      if (percentage === 75) { // base = result * 4/3 -> result must be a multiple of 3
        result = getRandomMultiple(3, 5, 20); // 15 to 60
      } else {
        // For 10, 20, 25, 50, any "round" number for the result is fine.
        result = getRandomMultiple(10, 2, 10); // 20 to 100
      }
      base = (result * 100) / percentage;
      break;
  }

  return { problemType, base, percentage, result };
}
