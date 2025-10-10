
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  generatePercentageProblem,
  type GeneratedPercentageProblem,
  type PercentageProblemType,
} from "@/lib/percentageProblemGenerator";

interface PercentageSkeletonProps {
  onAnswerChange?: (answer: string) => void;
  externalAnswer?: string;
  problem?: GeneratedPercentageProblem;
}

export default function PercentageSkeleton({
  onAnswerChange,
  externalAnswer = "",
  problem: externalProblem,
}: PercentageSkeletonProps): React.JSX.Element {
  const [problem, setProblem] = useState<GeneratedPercentageProblem | null>(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (externalProblem) {
      setProblem(externalProblem);
    } else {
      setProblem(generatePercentageProblem());
    }
  }, [externalProblem]);

  useEffect(() => {
    setAnswer(externalAnswer);
  }, [externalAnswer]);

  useEffect(() => {
    if (onAnswerChange) {
        onAnswerChange(answer);
    }
  }, [answer, onAnswerChange]);

  const renderProblem = () => {
    if (!problem) return null;

    const { problemType, base, percentage, result } = problem;

    const inputField = (
      <div className="w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 text-center text-3xl sm:text-4xl md:text-5xl font-normal border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
        {answer || "?"}
      </div>
    );

    const staticField = (value: number | string) => (
      <div className="w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 text-center text-3xl sm:text-4xl md:text-5xl font-normal border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600">
        {value}
      </div>
    );

    switch (problemType) {
      case "calculate_result":
        // 50% de 200 = ?
        return (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-2xl sm:text-3xl font-bold text-slate-900">
            {staticField(`${percentage}%`)}
            <span className="text-slate-700">de</span>
            {staticField(base)}
            <span className="text-slate-700">=</span>
            {inputField}
          </div>
        );
      case "calculate_percentage":
        // ?% de 80 = 20
        return (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-2xl sm:text-3xl font-bold text-slate-900">
            {inputField}
            <span className="text-slate-700">% de</span>
            {staticField(base)}
            <span className="text-slate-700">=</span>
            {staticField(result)}
          </div>
        );
      case "calculate_base":
        // 25% de ? = 50
        return (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-2xl sm:text-3xl font-bold text-slate-900">
            {staticField(`${percentage}%`)}
            <span className="text-slate-700">de</span>
            {inputField}
            <span className="text-slate-700">=</span>
            {staticField(result)}
          </div>
        );
      case "percentage_increase":
        // 150 + 10% = ?
        return (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-2xl sm:text-3xl font-bold text-slate-900">
            {staticField(base)}
            <span className="text-slate-700">+</span>
            {staticField(`${percentage}%`)}
            <span className="text-slate-700">=</span>
            {inputField}
          </div>
        );
      case "percentage_decrease":
        // 200 - 25% = ?
        return (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-2xl sm:text-3xl font-bold text-slate-900">
            {staticField(base)}
            <span className="text-slate-700">-</span>
            {staticField(`${percentage}%`)}
            <span className="text-slate-700">=</span>
            {inputField}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-center space-y-4 md:space-y-6">
      <div className="relative flex items-center justify-center h-48">
        {renderProblem()}
      </div>
    </div>
  );
}
