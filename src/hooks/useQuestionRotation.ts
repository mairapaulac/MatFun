import { useState, useEffect } from "react";
import {
  generateRandomProblem,
  type GeneratedProblem,
} from "@/app/game/components/EquationSkeleton";
import {
  generateRandomGeometryProblem,
  type GeneratedGeometryProblem,
} from "@/app/game/components/GeometryAreaSkeleton";

export type QuestionType = "equation" | "geometry";

export interface QuestionData {
  type: QuestionType;
  equationProblem?: GeneratedProblem;
  geometryProblem?: GeneratedGeometryProblem;
}

export function useQuestionRotation(
  customQuestionGenerator?: () => QuestionData
) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
    null
  );
  const [questionNumber, setQuestionNumber] = useState(1);

  const generateNewQuestion = (): QuestionData => {
    // Use custom generator if provided, otherwise use default logic
    if (customQuestionGenerator) {
      return customQuestionGenerator();
    }

    // Default logic: Alternar entre tipos de questão (50% cada)
    const questionType: QuestionType =
      Math.random() < 0.5 ? "equation" : "geometry";

    if (questionType === "equation") {
      return {
        type: "equation",
        equationProblem: generateRandomProblem(),
      };
    } else {
      return {
        type: "geometry",
        geometryProblem: generateRandomGeometryProblem(),
      };
    }
  };

  // Initialize first question after component mounts
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
