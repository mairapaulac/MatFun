"use client";

import {
  QuestionScreen,
  ExampleEquationSkeleton,
  ExampleGeometryAreaSkeleton,
} from "@/app/game/components";
import FeedbackModal from "@/app/game/components/FeedbackModal";
import {
  generateRandomProblem,
  type GeneratedProblem,
} from "@/app/game/components/EquationSkeleton";
import {
  generateRandomGeometryProblem,
  type GeneratedGeometryProblem,
} from "@/app/game/components/GeometryAreaSkeleton";
import {
  useQuestionRotation,
  type QuestionData,
} from "@/hooks/useQuestionRotation";
import { useModuleStore } from "@/stores/moduleStore";
import { useState, useMemo } from "react";

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    isOpen: boolean;
    type: "correct" | "incorrect" | "timeout";
    points?: number;
    multiplier?: number;
  }>({
    isOpen: false,
    type: "incorrect",
  });

  const { selectedModules } = useModuleStore();

  // Function to generate a question based on selected modules
  const generateFilteredQuestion = (): QuestionData => {
    // If no modules selected or "geral" is selected, use all question types
    if (selectedModules.length === 0 || selectedModules.includes("geral")) {
      return Math.random() < 0.5
        ? { type: "equation", equationProblem: generateRandomProblem() }
        : {
            type: "geometry",
            geometryProblem: generateRandomGeometryProblem(),
          };
    }

    // Filter available question types based on selected modules
    const availableTypes: string[] = [];

    if (selectedModules.includes("algebraic_multiplication")) {
      availableTypes.push("equation");
    }

    if (selectedModules.includes("area_geometry")) {
      availableTypes.push("geometry");
    }

    // If no valid modules selected, default to all
    if (availableTypes.length === 0) {
      return Math.random() < 0.5
        ? { type: "equation", equationProblem: generateRandomProblem() }
        : {
            type: "geometry",
            geometryProblem: generateRandomGeometryProblem(),
          };
    }

    // Randomly select from available types
    const selectedType =
      availableTypes[Math.floor(Math.random() * availableTypes.length)];

    if (selectedType === "equation") {
      return { type: "equation", equationProblem: generateRandomProblem() };
    } else {
      return {
        type: "geometry",
        geometryProblem: generateRandomGeometryProblem(),
      };
    }
  };

  const { currentQuestion, questionNumber, nextQuestion, isReady } =
    useQuestionRotation(generateFilteredQuestion);

  const handleAnswerChange = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleSubmit = (
    answer: string,
    metadata: { elapsedMs: number; multiplier: 8 | 4 | 2 | 1 }
  ) => {
    console.log("Answer submitted:", { answer, metadata });

    // Parse answer to check if it is correct
    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      const points = 10 * metadata.multiplier;
      setScore((prev) => prev + points);
      setFeedback({
        isOpen: true,
        type: "correct",
        points,
        multiplier: metadata.multiplier,
      });
    } else {
      setFeedback({
        isOpen: true,
        type: "incorrect",
      });
    }

    // Move to next question after showing result
    setTimeout(() => {
      setCurrentAnswer("");
      nextQuestion();
    }, 1800); // 1.8 second delay to show the result
  };

  const checkAnswer = (answer: string): boolean => {
    if (!currentQuestion) return false;

    const cleanAnswer = answer.trim();
    const num = Number.parseInt(cleanAnswer);

    if (isNaN(num)) return false;

    if (
      currentQuestion.type === "equation" &&
      currentQuestion.equationProblem
    ) {
      const problem = currentQuestion.equationProblem;

      // Parse different answer formats based on problem type
      if (
        cleanAnswer.includes("×") ||
        cleanAnswer.includes("x") ||
        cleanAnswer.includes("*")
      ) {
        const parts = cleanAnswer.split(/[×x*]/);
        if (parts.length === 2) {
          const num1 = Number.parseInt(parts[0].trim());
          const num2 = Number.parseInt(parts[1].trim());
          return !isNaN(num1) && !isNaN(num2) && num1 * num2 === problem.result;
        }
      }

      // Baseado no tipo do problema, validar de forma diferente
      if (problem.type === "both_empty") {
        // Se ambos estão vazios, aceitar formato "12" ou "1×2"
        if (cleanAnswer.length === 2 && /^\d{2}$/.test(cleanAnswer)) {
          const num1 = Number.parseInt(cleanAnswer[0]);
          const num2 = Number.parseInt(cleanAnswer[1]);
          return num1 * num2 === problem.result;
        }
      } else if (problem.type === "first_filled") {
        // Se primeiro está preenchido, aceitar apenas o segundo número
        return problem.firstNumber * num === problem.result;
      } else if (problem.type === "second_filled") {
        // Se segundo está preenchido, aceitar apenas o primeiro número
        return num * problem.secondNumber === problem.result;
      } else if (problem.type === "result_empty") {
        // Se resultado está vazio, aceitar apenas o resultado
        return num === problem.result;
      }

      // Fallback: se é um número único, verificar se é o resultado
      return num === problem.result;
    } else if (
      currentQuestion.type === "geometry" &&
      currentQuestion.geometryProblem
    ) {
      // Para questões geométricas, comparar diretamente com a área
      if (
        currentQuestion.geometryProblem.shape === "circle_from_circumference"
      ) {
        // Para círculo baseado em circunferência, validar usando π = 3
        const circumference =
          currentQuestion.geometryProblem.measurements.circumference;
        const expectedArea = 3 * Math.pow(circumference / 6, 2);
        return num === expectedArea;
      }
      return num === currentQuestion.geometryProblem.area;
    }

    return false;
  };

  const handleTimeout = () => {
    console.log("Time ran out!");
    setFeedback({
      isOpen: true,
      type: "timeout",
    });

    // Move to next question after timeout
    setTimeout(() => {
      setCurrentAnswer("");
      nextQuestion();
    }, 1800); // 1.8 second delay to show the timeout message
  };

  const handleFeedbackClose = () => {
    setFeedback((prev) => ({ ...prev, isOpen: false }));
  };

  // Don't render until question is initialized
  if (!isReady || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-green-500 mb-4">
            Carregando...
          </div>
          <div className="text-xl text-slate-600">Preparando sua questão</div>
        </div>
      </div>
    );
  }

  const getModuleLabel = () => {
    if (currentQuestion.type === "equation") {
      return "Operações Algébricas";
    } else {
      return "Geometria - Áreas";
    }
  };

  const getQuestionType = () => {
    if (currentQuestion.type === "equation") {
      return "algebraic_multiplication";
    } else if (
      currentQuestion.type === "geometry" &&
      currentQuestion.geometryProblem
    ) {
      // Map geometry shapes to hint types
      switch (currentQuestion.geometryProblem.shape) {
        case "trapezoid":
          return "area_trapezio";
        case "circle":
        case "circle_from_circumference":
          return "area_circulo";
        case "rectangle":
          return "area_retangulo";
        case "triangle":
          return "area_triangulo";
        case "parallelogram":
          return "area_paralelogramo";
        default:
          return "geometry";
      }
    }
    return "default";
  };

  const getQuestionSkeleton = () => {
    if (
      currentQuestion.type === "equation" &&
      currentQuestion.equationProblem
    ) {
      return (
        <ExampleEquationSkeleton
          externalAnswer={currentAnswer}
          problem={currentQuestion.equationProblem}
        />
      );
    } else if (
      currentQuestion.type === "geometry" &&
      currentQuestion.geometryProblem
    ) {
      return (
        <ExampleGeometryAreaSkeleton
          externalAnswer={currentAnswer}
          problem={currentQuestion.geometryProblem}
        />
      );
    }
    return null;
  };

  return (
    <>
      <QuestionScreen
        score={score}
        questionNumber={questionNumber}
        moduleLabel={getModuleLabel()}
        questionSkeleton={getQuestionSkeleton()}
        questionType={getQuestionType()}
        currentAnswer={currentAnswer}
        onAnswerChange={handleAnswerChange}
        totalMs={60000}
        onSubmit={handleSubmit}
        onTimeout={handleTimeout}
      />

      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        points={feedback.points}
        multiplier={feedback.multiplier}
        onClose={handleFeedbackClose}
      />
    </>
  );
}
