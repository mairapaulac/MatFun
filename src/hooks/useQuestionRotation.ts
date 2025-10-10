import { useState, useEffect } from "react";
import {
  generateRandomProblem,
  type GeneratedProblem,
} from "@/app/game/components/EquationSkeleton";
import {
  generateRandomGeometryProblem,
  type GeneratedGeometryProblem,
} from "@/app/game/components/GeometryAreaSkeleton";
import {
  generatePercentageProblem,
  type GeneratedPercentageProblem,
} from "@/lib/percentageProblemGenerator";
import { type FractionQuestion, generateFractionQuestion } from "@/lib/fractionUtils";

export type QuestionType = "equation" | "geometry" | "fraction" | "percentage";

export interface QuestionData {
  type: QuestionType;
  equationProblem?: GeneratedProblem;
  geometryProblem?: GeneratedGeometryProblem;
  fractionProblem?: FractionQuestion;
  percentageProblem?: GeneratedPercentageProblem;
}

export function useQuestionRotation(
  customQuestionGenerator?: () => QuestionData
) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
    null
  );
  const [questionNumber, setQuestionNumber] = useState(1);

  const generateNewQuestion = (): QuestionData => {
    if (customQuestionGenerator) {
      return customQuestionGenerator();
    }

    const questionTypes: QuestionType[] = ["equation", "geometry", "percentage", "fraction"];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    if (questionType === "equation") {
      return {
        type: "equation",
        equationProblem: generateRandomProblem(),
      };
    } else if (questionType === "geometry") {
      return {
        type: "geometry",
        geometryProblem: generateRandomGeometryProblem(),
      };
    } else if (questionType === "percentage") {
      return {
        type: "percentage",
        percentageProblem: generatePercentageProblem(),
      };
    } else {
      return {
        type: "fraction",
        fractionProblem: generateFractionQuestion(),
      };
    }
  };

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateNewQuestion());
    }
  }, [currentQuestion]);

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setCurrentQuestion(generateNewQuestion());
  };

  const resetQuestions = () => {
    setQuestionNumber(1);
    setCurrentQuestion(generateNewQuestion());
  };

  return {
    currentQuestion,
    questionNumber,
    nextQuestion,
    resetQuestions,
    isReady: currentQuestion !== null,
  };
}
