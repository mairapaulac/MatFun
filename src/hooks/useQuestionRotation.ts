import { useState, useEffect, useCallback } from "react";
import { questionGenerators, Problem } from "@/lib/questionGenerators";
import { Module } from "@/types/types";

export interface QuestionData {
  module: Module;
  level: number;
  problem: Problem;
}

const moduleKeyMap: Record<string, Module> = {
    "Operações Algébricas": "algebra",
    "Áreas Geométricas": "geometry",
    "Operações com Frações": "fraction",
    "Porcentagem": "percentage",
    "algebraic_multiplication": "algebra",
    "area_geometry": "geometry",
    "fraction": "fraction",
    "percentage": "percentage",
    "algebra": "algebra",
    "geometry": "geometry",
  };

export function useQuestionRotation(difficultyScores: Record<Module, number>, selectedModules: string[]) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);

  const getAvailableModules = useCallback(() => {
    if (selectedModules.length === 0 || selectedModules.includes("geral")) {
      return Object.keys(questionGenerators) as Module[];
    }
    return selectedModules;
  }, [selectedModules]);

  const generateNewQuestion = useCallback(() => {
    const availableModules = getAvailableModules();
    const selectedModuleKey = availableModules[Math.floor(Math.random() * availableModules.length)];
    const selectedModule = moduleKeyMap[selectedModuleKey] || "algebra";

    const score = difficultyScores[selectedModule] || 1.0;
    let level = Math.floor(score);

    const moduleGenerators = questionGenerators[selectedModule] as Record<number, (() => Problem)[]>;

    // Fallback logic for non-existent levels
    if (!moduleGenerators[level]) {
        const availableLevels = Object.keys(moduleGenerators).map(Number);
        const lowerLevels = availableLevels.filter(l => l < level);
        if (lowerLevels.length > 0) {
            level = Math.max(...lowerLevels);
        } else {
            level = Math.min(...availableLevels); // Fallback to lowest if no lower level exists
        }
    }

    const generatorsForLevel = moduleGenerators[level as keyof typeof moduleGenerators];
    const generator = generatorsForLevel[Math.floor(Math.random() * generatorsForLevel.length)];
    const problem = generator();

    return {
      module: selectedModule,
      level: level,
      problem: problem,
    };
  }, [difficultyScores, getAvailableModules]);

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateNewQuestion());
    }
  }, [currentQuestion, generateNewQuestion]);

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setCurrentQuestion(generateNewQuestion());
  };

  const resetQuestions = () => {
    setQuestionNumber(1);
    if (selectedModules.length > 0) {
      setCurrentQuestion(generateNewQuestion());
    }
  };

  return {
    currentQuestion,
    questionNumber,
    nextQuestion,
    resetQuestions,
    isReady: currentQuestion !== null,
  };
}