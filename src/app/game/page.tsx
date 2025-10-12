"use client";

import { QuestionScreen } from "@/app/game/components";
import FeedbackModal from "@/app/game/components/FeedbackModal";
import PercentageSkeleton from "@/app/game/components/PercentageSkeleton";
import EquationSkeleton from "@/app/game/components/EquationSkeleton";
import GeometryAreaSkeleton from "@/app/game/components/GeometryAreaSkeleton";
import { useQuestionRotation } from "@/hooks/useQuestionRotation";
import { useModuleStore } from "@/stores/moduleStore";
import { useState, useEffect } from "react";
import FractionOperationCard from "@/app/game/components/FractionOperationCard";
import ExitConfirmationDialog from "./components/ExitConfirmationDialog";
import { validateFractionAnswer } from "@/lib/fractionUtils";
import { type Module } from "@/types/types";
import { GeneratedProblem } from "@/lib/algebraProblemGenerator";
import { GeneratedGeometryProblem } from "@/lib/geometryProblemGenerator";
import { FractionQuestion } from "@/types/types";
import { GeneratedPercentageProblem } from "@/lib/percentageProblemGenerator";

const initialDifficultyScores: Record<Module, number> = {
  algebra: 1.0,
  geometry: 1.0,
  fraction: 1.0,
  percentage: 1.0,
};

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [fractionAnswer, setFractionAnswer] = useState({ numerator: "", denominator: "" });
  const [fractionActiveInput, setFractionActiveInput] = useState<'numerator' | 'denominator'>('numerator');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    isOpen: boolean;
    type: "correct" | "incorrect" | "timeout";
    points?: number;
    multiplier?: number;
  }>({
    isOpen: false,
    type: "incorrect",
  });
  const [difficultyScores, setDifficultyScores] = useState(initialDifficultyScores);
  const [shouldAdvance, setShouldAdvance] = useState(false);

  const { currentQuestion, questionNumber, nextQuestion, isReady } = useQuestionRotation(difficultyScores);

  useEffect(() => {
    if (currentQuestion) {
      console.log(`Question #${questionNumber} (Module: ${currentQuestion.module}, Level: ${currentQuestion.level})`);
      console.log("Current difficulty scores:", difficultyScores);
    }
  }, [currentQuestion, difficultyScores, questionNumber]);

  const handleAnswerChange = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleKeypadPress = (key: string) => {
    if (currentQuestion?.module === "fraction") {
      if (key === "⌫") {
        const target = fractionActiveInput === 'numerator' ? 'numerator' : 'denominator';
        setFractionAnswer(prev => ({ ...prev, [target]: prev[target].slice(0, -1) }));
      } else if (key === "toggle_focus") {
        setFractionActiveInput(prev => prev === 'numerator' ? 'denominator' : 'numerator');
      } else {
        const target = fractionActiveInput === 'numerator' ? 'numerator' : 'denominator';
        setFractionAnswer(prev => ({ ...prev, [target]: prev[target] + key }));
      }
    } else {
      if (key === "⌫") {
        setCurrentAnswer(currentAnswer.slice(0, -1));
      } else {
        setCurrentAnswer(currentAnswer + key);
      }
    }
  };

  const handleSubmit = (metadata: { elapsedMs: number; multiplier: 8 | 4 | 2 | 1 }) => {
    if (isSubmitted || !currentQuestion) return;

    const isAnswerEmpty = currentQuestion.module === "fraction"
      ? fractionAnswer.numerator.trim() === "" || fractionAnswer.denominator.trim() === ""
      : currentAnswer.trim() === "";

    if (isAnswerEmpty) return;

    setIsSubmitted(true);

    const isCorrect = checkAnswer(currentAnswer);

    if (isCorrect) {
      const level = currentQuestion.level;
      const basePoints = level === 1 ? 10 : level === 2 ? 15 : 20;
      const points = basePoints * metadata.multiplier;
      setScore((prev) => prev + points);

      // Update difficulty score
      const difficultyIncrease = metadata.multiplier === 8 ? 0.5 : metadata.multiplier === 4 ? 0.3 : 0.1;
      setDifficultyScores(prevScores => {
        const newScore = prevScores[currentQuestion.module] + difficultyIncrease;
        return {
          ...prevScores,
          [currentQuestion.module]: Math.min(newScore, 3.99),
        };
      });

      setFeedback({ isOpen: true, type: "correct", points, multiplier: metadata.multiplier });
    } else {
      setFeedback({ isOpen: true, type: "incorrect" });
    }

    setTimeout(() => {
      setShouldAdvance(true);
    }, 1800);
  };

  useEffect(() => {
    if (shouldAdvance) {
      setCurrentAnswer("");
      setFractionAnswer({ numerator: "", denominator: "" });
      setFractionActiveInput('numerator');
      setIsSubmitted(false);
      nextQuestion();
      setShouldAdvance(false); // Reset trigger
    }
  }, [shouldAdvance, nextQuestion]);

  const checkAnswer = (answer: string): boolean => {
    if (!currentQuestion) return false;

    const { module, problem } = currentQuestion;
    const num = Number.parseInt(answer.trim());

    if (module === "algebra") {
      const algebraProblem = problem as GeneratedProblem;
      
      switch (algebraProblem.type) {
        case 'result_empty':
          return num === algebraProblem.result;
        case 'first_filled': // User provides the second number
          return algebraProblem.firstNumber * num === algebraProblem.result;
        case 'second_filled': // User provides the first number
          return num * algebraProblem.secondNumber === algebraProblem.result;
        case 'complex_blank' as any: // Level 3
          return num === (algebraProblem as any).correctAnswer;
        default:
            // This also handles level 2 where the type is 'result_empty'
            return num === algebraProblem.result;
      }
    }

    if (module === "geometry") {
      const geometryProblem = problem as GeneratedGeometryProblem;
      return num === geometryProblem.area;
    }

    if (module === "fraction") {
      const fractionProblem = problem as FractionQuestion;
      const numerator = parseInt(fractionAnswer.numerator) || 0;
      const denominator = parseInt(fractionAnswer.denominator) || 0;
      return validateFractionAnswer(fractionProblem, numerator, denominator);
    }

    if (module === "percentage") {
      const percentageProblem = problem as GeneratedPercentageProblem;
      const { problemType, result, base, percentage } = percentageProblem;
      if (problemType === 'calculate_percentage') return num === percentage;
      if (problemType === 'calculate_base') return num === base;
      return num === result;
    }

    return false;
  };

  const handleTimeout = () => {
    setFeedback({ isOpen: true, type: "timeout" });
    setTimeout(() => {
      setShouldAdvance(true);
    }, 1800);
  };

  const handleFeedbackClose = () => {
    setFeedback((prev) => ({ ...prev, isOpen: false }));
  };

  if (!isReady || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-green-500 mb-4">Carregando...</div>
          <div className="text-xl text-slate-600">Preparando sua questão</div>
        </div>
      </div>
    );
  }

  const getModuleLabel = () => {
    switch (currentQuestion.module) {
      case "algebra": return "Operações Algébricas";
      case "geometry": return "Geometria - Áreas";
      case "percentage": return "Porcentagem";
      case "fraction": return "Operações com Frações";
      default: return "MatFun";
    }
  };

  const getQuestionType = () => {
    const { module, problem } = currentQuestion;
    if (module === "geometry") {
      return (problem as GeneratedGeometryProblem).shape;
    }
    if (module === "fraction") {
      return (problem as FractionQuestion).operator === '+' ? 'fraction_operation_addition' : 'fraction_operation_multiplication';
    }
    if (module === "percentage") {
      return (problem as GeneratedPercentageProblem).problemType;
    }
    return "default";
  };

  const getQuestionSkeleton = () => {
    const { module, problem } = currentQuestion;

    switch (module) {
      case "algebra":
        return <EquationSkeleton externalAnswer={currentAnswer} problem={problem as GeneratedProblem} />;
      case "geometry":
        return <GeometryAreaSkeleton externalAnswer={currentAnswer} problem={problem as GeneratedGeometryProblem} />;
      case "fraction":
        const fractionProblem = problem as FractionQuestion;
        return (
          <FractionOperationCard
            num1={fractionProblem.num1}
            den1={fractionProblem.den1}
            operator={fractionProblem.operator}
            num2={fractionProblem.num2}
            den2={fractionProblem.den2}
            currentAnswer={fractionAnswer}
            activeInput={fractionActiveInput}
            onActiveInputChange={setFractionActiveInput}
          />
        );
      case "percentage":
        return <PercentageSkeleton externalAnswer={currentAnswer} problem={problem as GeneratedPercentageProblem} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-background bg-pattern">
      <div className="absolute top-4 left-4 z-10">
        <ExitConfirmationDialog />
      </div>
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
        onKeypadPress={handleKeypadPress}
        fractionAnswer={fractionAnswer}
        isSubmitted={isSubmitted}
      />
      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        points={feedback.points}
        multiplier={feedback.multiplier}
        onClose={handleFeedbackClose}
      />
    </div>
  );
}