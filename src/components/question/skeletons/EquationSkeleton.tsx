import React, { useState, useEffect } from 'react';

interface EquationSkeletonProps {
  equation: string;
  variables: string[];
  onVariableChange?: (variable: string, value: string) => void;
  values?: Record<string, string>;
  onAnswerChange?: (answer: string) => void;
  externalAnswer?: string;
}

export default function EquationSkeleton({ 
  equation, 
  variables, 
  onVariableChange,
  values = {},
  onAnswerChange,
  externalAnswer = ''
}: EquationSkeletonProps): JSX.Element {
  const [firstValue, setFirstValue] = useState(values['first'] || '');
  const [secondValue, setSecondValue] = useState(values['second'] || '');

  // Parse external answer (format: "6×6" or "6x6" or "66")
  useEffect(() => {
    if (externalAnswer) {
      // Try to split by multiplication symbols first
      const parts = externalAnswer.split(/[×x*]/);
      if (parts.length === 2) {
        setFirstValue(parts[0]);
        setSecondValue(parts[1]);
      } else if (externalAnswer.length === 2) {
        // If it's just two digits, split them
        setFirstValue(externalAnswer[0]);
        setSecondValue(externalAnswer[1]);
      } else if (externalAnswer.length === 1) {
        // If it's one digit, put it in the first field
        setFirstValue(externalAnswer);
        setSecondValue('');
      }
    } else {
      setFirstValue('');
      setSecondValue('');
    }
  }, [externalAnswer]);

  const handleFirstChange = (value: string) => {
    setFirstValue(value);
    onVariableChange?.('first', value);
    onAnswerChange?.(`${value}×${secondValue}`);
  };

  const handleSecondChange = (value: string) => {
    setSecondValue(value);
    onVariableChange?.('second', value);
    onAnswerChange?.(`${firstValue}×${value}`);
  };

  return (
    <div className="text-center space-y-4">
      {/* Background symbols */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="text-6xl text-slate-300 space-x-8">
          <span>+</span>
          <span>×</span>
        </div>
      </div>
      
      {/* Main equation */}
      <div className="relative flex items-center justify-center space-x-2 text-2xl font-bold text-slate-900">
        <div className="w-16 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
          {firstValue || ''}
        </div>
        <span className="text-2xl font-bold text-slate-700">×</span>
        <div className="w-16 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
          {secondValue || ''}
        </div>
        <span className="text-2xl font-bold text-slate-700">= 36</span>
      </div>
    </div>
  );
}

// Example usage component
export function ExampleEquationSkeleton({ externalAnswer }: { externalAnswer?: string }): JSX.Element {
  return (
    <EquationSkeleton
      equation="___ × ___ = 36"
      variables={["first", "second"]}
      values={{}}
      externalAnswer={externalAnswer}
    />
  );
}
