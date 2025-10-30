import {
    generateLevel1AlgebraProblem,
    generateOrderOfPrecedenceEquation,
    generateComplexEquationWithBlanks,
    generateFirstDegreeEquation,
    type GeneratedProblem
} from './algebraProblemGenerator';
import {
    generateGeometryProblem,
    type GeneratedGeometryProblem,
} from './geometryProblemGenerator';
import {

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
        2: [generateOrderOfPrecedenceEquation, generateFirstDegreeEquation],
        3: [generateComplexEquationWithBlanks],
    },
    geometry: {
        1: [() => generateGeometryProblem(["triangle", "rectangle", "parallelogram", "trapezoid"])],
        2: [() => generateGeometryProblem(["circle"])],
                3: [() => generateGeometryProblem(["circle_from_circumference", "rectangle_minus_circle"])],    },
    fraction: {
        1: [() => generateFractionQuestion('×')],
        2: [() => generateFractionQuestion('=')],
        3: [() => generateFractionQuestion('+')],
    },
    percentage: {
        1: [() => generatePercentageProblem(["calculate_result"])],
        2: [() => generatePercentageProblem(["percentage_increase", "percentage_decrease"])],
        3: [() => generatePercentageProblem(["calculate_base", "calculate_percentage"])],
    },
};