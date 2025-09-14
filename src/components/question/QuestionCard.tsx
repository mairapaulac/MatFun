import React from 'react';
import { QuestionCardProps } from '@/types/question';
import { HelpCircle } from 'lucide-react';

export default function QuestionCard({ 
  questionNumber, 
  moduleLabel, 
  children 
}: QuestionCardProps): JSX.Element {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Question Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Questão {questionNumber}
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-white/90">
          {moduleLabel}
        </p>
      </div>

      {/* Question Card */}
      <div className="relative">
        {/* Help button */}
        <button
          className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Ajuda"
          type="button"
        >
          <HelpCircle className="w-5 h-5 text-slate-600" />
        </button>

        {/* White card container */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg min-h-[200px] sm:min-h-[260px] flex items-center justify-center">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
