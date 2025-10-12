import {
    generateLevel1AlgebraProblem,
    generateOrderOfPrecedenceEquation,
    generateComplexEquationWithBlanks,
    type GeneratedProblem
} from './algebraProblemGenerator';
import {
    generateGeometryProblem,
    type GeneratedGeometryProblem,
} from './geometryProblemGenerator';
import {
    generateCircleFromCircumferenceSeed,
    type CircleFromCircumferenceProblem,
} from './circleProblemGenerator';
import {
    generateFractionQuestion,
    type FractionQuestion
} from './fractionUtils';
import {
    generatePercentageProblem,
    type GeneratedPercentageProblem
} from './percentageProblemGenerator';

// A union type for all possible problem shapes
export type Problem = GeneratedProblem | GeneratedGeometryProblem | CircleFromCircumferenceProblem | FractionQuestion | GeneratedPercentageProblem;

export const questionGenerators = {
    algebra: {
        1: [generateLevel1AlgebraProblem],
        2: [generateOrderOfPrecedenceEquation],
        3: [generateComplexEquationWithBlanks],
    },
    geometry: {
        1: [() => generateGeometryProblem(["triangle", "rectangle", "parallelogram", "trapezoid"])],
        2: [() => generateGeometryProblem(["circle"])],
        3: [() => generateGeometryProblem(["circle_from_circumference"])],
    },
    fraction: {
        1: [() => generateFractionQuestion('×')],
        3: [() => generateFractionQuestion('+')],
    },
    percentage: {
        1: [() => generatePercentageProblem(["calculate_result"])],
        2: [() => generatePercentageProblem(["percentage_increase", "percentage_decrease"])],
        3: [() => generatePercentageProblem(["calculate_base", "calculate_percentage"])],
    },
};