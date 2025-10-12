"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { GeneratedProblem, ProblemType } from "@/lib/algebraProblemGenerator";

interface EquationSkeletonProps {
  onAnswerChange?: (answer: string) => void;
  externalAnswer?: string;
  problem?: GeneratedProblem;
}

export default function EquationSkeleton({
  onAnswerChange,
  externalAnswer = "",
  problem: externalProblem,
}: EquationSkeletonProps): React.JSX.Element {
  const [problem, setProblem] = useState<GeneratedProblem | null>(null);
  const [answerValue, setAnswerValue] = useState("");

  useEffect(() => {
    if (externalProblem) {
      setProblem(externalProblem);
    }
  }, [externalProblem]);

  useEffect(() => {
    setAnswerValue(externalAnswer);
    onAnswerChange?.(externalAnswer);
  }, [externalAnswer, onAnswerChange]);

  useEffect(() => {
    if (problem) {
      setAnswerValue("");
    }
  }, [problem]);

  const renderField = (value: string, isEditable: boolean) => {
    const baseClasses = "w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-normal border-2 rounded-lg flex items-center justify-center";
    if (isEditable) {
      return <div className={`${baseClasses} border-slate-300 bg-white`}>{value || ""}</div>;
    } else {
      return <div className={`${baseClasses} border-slate-400 bg-slate-100 text-slate-600`}>{value}</div>;
    }
  };

  if (!problem) {
    return (
      <div className="text-center space-y-4 md:space-y-6">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900">
          <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 border-2 rounded-lg animate-pulse bg-slate-100"></div>
        </div>
      </div>
    );
  }

  // Handling new problem types with equationString
  if ((problem as any).equationString) {
    let cor = "#000000a0";
    const equationString = (problem as any).equationString as string;
    const tokens = equationString.split(' ');

    return (
      <div className="text-center space-y-4 md:space-y-6">
        <div className="relative flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900">
          {tokens.map((token, index) => {
            if (!isNaN(Number(token))) { // It's a number
              return <div key={index}>{renderField(token, false)}</div>;
            } else if (token === '?') { // It's the answer blank
              return <div key={index}>{renderField(answerValue, true)}</div>;
            } else { // It's an operator or parenthesis
              //coloca corzinha nos operadores ><
              switch(token){
                case '+': cor = "#00cd52ff";break;
                case '-': cor = "#cd0000ff";break;
                default: cor = "#000000a0"; break;
              }

              return <span key={index} className="text-2xl md:text-4xl font-bold text-slate-700" style={{color:cor}}>{token}</span>;
            }
          })}
        </div>
      </div>
    );
  }

  // Rendering for level 1 problems
  const isFirstEditable = problem.type === 'second_filled';
  const isSecondEditable = problem.type === 'first_filled';
  const isResultEditable = problem.type === 'result_empty';

  return (
    <div className="text-center space-y-4 md:space-y-6">
      <div className="relative flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900">
        
        {isFirstEditable ? renderField(answerValue, true) : renderField(problem.firstNumber.toString(), false)}

        <span className="text-2xl md:text-3xl font-bold text-slate-700">×</span>

        {isSecondEditable ? renderField(answerValue, true) : renderField(problem.secondNumber.toString(), false)}

        <span className="text-3xl md:text-4xl font-bold text-slate-700">=</span>

        {isResultEditable ? renderField(answerValue, true) : renderField(problem.result.toString(), false)}
      </div>
    </div>
  );
}