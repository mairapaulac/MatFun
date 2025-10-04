"use client";

import { useState } from "react";
import HintModal from "@/app/game/components/HintModal";

interface FractionOperationCardProps {
  num1: number;
  den1: number;
  operator: '+' | '×';
  num2: number;
  den2: number;
  currentAnswer: { numerator: string; denominator: string };
  activeInput: 'numerator' | 'denominator';
  onActiveInputChange: (input: 'numerator' | 'denominator') => void;
}

export default function FractionOperationCard({
  num1,
  den1,
  operator,
  num2,
  den2,
  currentAnswer,
  activeInput,
  onActiveInputChange
}: FractionOperationCardProps) {



  //   componente p renderizar uma fraçao
  const FractionDisplay = ({ numerator, denominator }: { numerator: number; denominator: number }) => (
    <div className="flex flex-col items-center">
      <span className="text-5xl sm:text-4xl md:text-8xl font-normal text-black">{numerator}</span>
      <div className="w-10 sm:w-14 md:w-16 border-t-2 sm:border-t-[3px] md:border-t-4 border-black my-1"></div>
      <span className="text-5xl sm:text-4xl md:text-8xl font-normal text-black">{denominator}</span>
    </div>
  );

  // input resultado
  const ResultInput = () => (
    <div className="flex flex-col items-center">
      {/* num */}
      <div className="relative">
        <div
          className={`w-16 h-12 sm:w-24 sm:h-20 md:w-28 md:h-24 text-5xl sm:text-3xl md:text-8xl font-normal text-center bg-white/20 border-2 rounded-lg flex items-center justify-center ${
            activeInput === 'numerator' ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/50'
          } text-black`}
        >
          {currentAnswer.numerator || '?'}
        </div>
        <button
          onClick={() => onActiveInputChange('numerator')}
          className={`absolute inset-0 w-full h-full rounded-lg transition-all ${
            activeInput === 'numerator' ? 'bg-yellow-400/20' : 'hover:bg-white/10'
          }`}
          aria-label="Selecionar numerador"
        />
      </div>
      
      <div className="w-12 sm:w-14 md:w-16 border-t-2 sm:border-t-3 md:border-t-4 border-black my-1"></div>
      
      {/* den */}
      <div className="relative">
        <div
          className={`w-16 h-12 sm:w-24 sm:h-20 md:w-28 md:h-24 text-5xl sm:text-3xl md:text-8xl font-normal text-center bg-white/20 border-2 rounded-lg flex items-center justify-center ${
            activeInput === 'denominator' ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/50'
          } text-black`}
        >
          {currentAnswer.denominator || '?'}
        </div>
        <button
          onClick={() => onActiveInputChange('denominator')}
          className={`absolute inset-0 w-full h-full rounded-lg transition-all ${
            activeInput === 'denominator' ? 'bg-yellow-400/20' : 'hover:bg-white/10'
          }`}
          aria-label="Selecionar denominador"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 flex-wrap gap-y-4">
          {/* primeira fracoeo */}
          <FractionDisplay numerator={num1} denominator={den1} />
          
          {/* op */}
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">{operator}</span>
          
          {/* segunda fraçaoo */}
          <FractionDisplay numerator={num2} denominator={den2} />
          
          {/*  igual */}
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">=</span>
          
          {/*resultado */}
          <ResultInput />
        </div>

      


    </div>
  );
}
