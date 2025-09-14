import React from 'react';
import { QuestionCardProps } from '@/types/question';
import { HelpCircle } from 'lucide-react';

export default function QuestionCard({ 
  questionNumber, 
  moduleLabel, 
  children,
  isDesktop = false
}: QuestionCardProps): React.JSX.Element {
  return (
    <div className={`w-full mx-auto space-y-4 ${isDesktop ? 'max-w-2xl' : 'max-w-md'}`}>
      {/* Question Header */}
      <div className="text-center space-y-2">
        <h1 className={`font-bold text-white leading-tight ${
          isDesktop 
            ? 'text-6xl xl:text-7xl' 
            : 'text-4xl sm:text-5xl'
        }`}>
          Questão {questionNumber}
        </h1>
        <p className={`font-semibold text-white/90 ${
          isDesktop 
            ? 'text-3xl xl:text-4xl' 
            : 'text-xl sm:text-2xl'
        }`}>
          {moduleLabel}
        </p>
      </div>

      {/* Question Card */}
      <div className="relative">
        {/* Help button */}
        <button
          className={`absolute -top-2 -right-2 z-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors ${
            isDesktop ? 'w-12 h-12' : 'w-8 h-8'
          }`}
          aria-label="Ajuda"
          type="button"
        >
          <HelpCircle className={`text-slate-600 ${isDesktop ? 'w-7 h-7' : 'w-5 h-5'}`} />
        </button>

        {/* White card container */}
        <div className={`bg-white text-slate-900 rounded-2xl shadow-lg flex items-center justify-center ${
          isDesktop 
            ? 'p-8 min-h-[400px] xl:min-h-[500px]' 
            : 'p-6 min-h-[200px] sm:min-h-[260px]'
        }`}>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
