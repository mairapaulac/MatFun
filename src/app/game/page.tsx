"use client";

import { QuestionScreen } from "@/app/game/components";
import FeedbackModal from "@/app/game/components/FeedbackModal";
import PercentageSkeleton from "@/app/game/components/PercentageSkeleton";
import EquationSkeleton from "@/app/game/components/EquationSkeleton";
import GeometryAreaSkeleton from "@/app/game/components/GeometryAreaSkeleton";
import { useQuestionRotation } from "@/hooks/useQuestionRotation";
import { useState, useEffect } from "react";
import FractionOperationCard from "@/app/game/components/FractionOperationCard";
import ExitConfirmationDialog from "./components/ExitConfirmationDialog";
import { validateFractionAnswer } from "@/lib/fractionUtils";
import { type Module } from "@/types/types";
import { GeneratedProblem } from "@/lib/algebraProblemGenerator";
import { GeneratedGeometryProblem } from "@/lib/geometryProblemGenerator";
import { FractionQuestion } from "@/types/types";
import { GeneratedPercentageProblem } from "@/lib/percentageProblemGenerator";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";

import { useModuleStore } from "@/stores/moduleStore";
import { useGameResultStore } from "@/stores/gameResultStore";

interface GameLogEntry {
  module: string;
  correct: boolean;
}

const initialDifficultyScores: Record<Module, number> = {
  algebra: 1.0,
  geometry: 1.0,
  fraction: 1.0,
  percentage: 1.0,
};

export default function QuestionPage() {
  const router = useRouter();
  const { selectedModules } = useModuleStore();
  const { setGameResult } = useGameResultStore();
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);
 //ALTERAR AQUI HAHAHAHAHAHAHAHHAHAHAHA
  const totalQuestions = 5;

  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [fractionAnswer, setFractionAnswer] = useState({ numerator: "", denominator: "" });
  const [fractionActiveInput, setFractionActiveInput] = useState<'numerator' | 'denominator'>('numerator');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
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

  const { currentQuestion, questionNumber, nextQuestion, isReady } = useQuestionRotation(difficultyScores, selectedModules);

  

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setIsExitModalOpen(true);
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleExitConfirm = () => {
    router.push("/home");
  };

  //se for fração ele verifica se foi acionado a tecla de apagar ou de trocar o focus do numerador/denominador, se nao for fração ele trata normal
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

    const newLogEntry = { module: currentQuestion.module, correct: isCorrect };
    const updatedGameLog = [...gameLog, newLogEntry];
    setGameLog(updatedGameLog);

    let finalScore = score;

    if (isCorrect) {
      const level = currentQuestion.level;
      const basePoints = level === 1 ? 10 : level === 2 ? 15 : 20;
      const points = basePoints * metadata.multiplier;
      finalScore += points;
      setScore(finalScore);

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
      const nextQuestionNumber = questionNumber + 1;
      if (nextQuestionNumber > totalQuestions) {
        setGameResult(updatedGameLog, finalScore);
        router.push("/fim-de-partida");
      } else {
        setShouldAdvance(true);
      }
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
        case 'complex_blank': // Level 3
          return num === algebraProblem.correctAnswer;
        case 'first_degree_equation':
          return num === algebraProblem.correctAnswer;
      case 'exponentiation':
      case 'square_root': {
        const simpleProblem = problem as GeneratedProblem;
        return num === simpleProblem.correctAnswer;
      }
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
    if (!currentQuestion) return;

    const newLogEntry = { module: currentQuestion.module, correct: false };
    const updatedGameLog = [...gameLog, newLogEntry];
    setGameLog(updatedGameLog);

    setFeedback({ isOpen: true, type: "timeout" });

    setTimeout(() => {
      const nextQuestionNumber = questionNumber + 1;
      if (nextQuestionNumber > totalQuestions) {
        setGameResult(updatedGameLog, score);
        router.push("/fim-de-partida");
      } else {
        setShouldAdvance(true);
      }
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
     const operatorMap: Record<string, string> = {
    '+': 'fraction_operation_addition',
    '×': 'fraction_operation_multiplication',
    '=': 'fraction_operation_equivalent',
    };
    return operatorMap[(problem as FractionQuestion).operator] || 'fraction_operation_addition';
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
        <button
          onClick={() => setIsExitModalOpen(true)}
          className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white backdrop-blur-sm transition-all duration-300 hover:scale-110 "
        >
          <Undo2 className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] text-blue-950 transition-all group-hover:-translate-x-1" />
        </button>
      </div>
      <QuestionScreen
        score={score}
        questionNumber={questionNumber}
        moduleLabel={getModuleLabel()}
        questionSkeleton={getQuestionSkeleton()}
        questionType={getQuestionType()}
        currentAnswer={currentAnswer}
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
      <ExitConfirmationDialog
        isOpen={isExitModalOpen}
        onOpenChange={setIsExitModalOpen}
        onConfirm={handleExitConfirm}
        score={score}
        questionsAnswered={questionNumber - 1}
      />
    </div>
  );
}
