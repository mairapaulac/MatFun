import type React from "react"
import { useState } from "react"
import type { QuestionCardProps } from "@/types/question"
import { Lightbulb } from "lucide-react"
import HintModal from "@/app/game/components/HintModal"

export default function QuestionCard({
  questionNumber,
  moduleLabel,
  children,
  isDesktop = false,
  isTablet = false,
  questionType = "default",
}: QuestionCardProps & { isTablet?: boolean; questionType?: string }): React.JSX.Element {
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  return (
    <div
      className={`w-full mx-auto  ${
        isDesktop ? "max-w-2xl" : isTablet ? "max-w-3xl" : "max-w-md"
      }`}
    >
      <div className="text-center space-y-2">
        <h1
          className={`font-bold text-white leading-tight ${
            isDesktop
              ? "text-6xl xl:text-7xl"
              : isTablet
                ? "text-6xl"
                : "text-4xl sm:text-5xl"
          }`}
        >
          Questão {questionNumber}
        </h1>
        <p
          className={`font-semibold text-white/90 ${
            isDesktop
              ? "text-3xl xl:text-4xl"
              : isTablet
                ? "text-3xl"
                : "text-xl sm:text-2xl"
          }`}
        >
          {moduleLabel}
        </p>
      </div>

      <div className="relative border-slate-400/70 border-8 rounded-3xl shadow-2xl drop-shadow-2xl">
        {/* Help Button */}
        <button
          className={`absolute -top-4 -right-4 z-10 rounded-full flex flex-col items-center justify-center transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-amber-500/80
                     animate-pulse shadow-lg shadow-yellow-500/90
                     bg-yellow-400 hover:bg-yellow-500 hover:scale-110 hover:animate-none border-4 border-amber-500 border-
                     ${
                       isDesktop ? "w-14 h-14" : isTablet ? "w-14 h-14" : "w-12 h-12"
                     }`}
          type="button"
          onClick={() => setIsHintModalOpen(true)}
        >
          <Lightbulb
            className={`text-yellow-900/80
                       ${
                         isDesktop ? "w-8 h-8" : isTablet ? "w-8 h-8" : "w-7 h-7"
                       }`}
          />
          <span className="text-xs text-rose-400">Dica</span>
        </button>

        <div
          className={`bg-white text-slate-900 rounded-2xl shadow-lg flex items-center justify-center ${
            isDesktop
              ? "p-4 min-h-[400px] xl:min-h-[500px]"
              : isTablet
                ? "p-0 min-h-[400px]"
                : "p-1 sm:p-2 min-h-[200px] sm:min-h-[260px]"
          }`}
        >
          <div className="w-full ">{children}</div>
        </div>
      </div>

      {/* Hint Modal */}
      <HintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
        questionType={questionType}
      />
    </div>
  )
}