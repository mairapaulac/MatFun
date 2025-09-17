import type React from "react"
import type { QuestionCardProps } from "@/types/question"
import { HelpCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" // <-- Adicionado

export default function QuestionCard({
  questionNumber,
  moduleLabel,
  children,
  isDesktop = false,
  isTablet = false,
}: QuestionCardProps & { isTablet?: boolean }): React.JSX.Element {
  return (
    <div
      className={`w-full mx-auto space-y-4 ${
        isDesktop ? "max-w-2xl" : isTablet ? "max-w-2xl" : "max-w-md"
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
        {/*jgoar dentro de um componente*/}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className={`absolute -top-2 -right-2 z-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors ${
                isDesktop ? "w-12 h-12" : isTablet ? "w-12 h-12" : "w-8 h-8"
              }`}
              aria-label="Ajuda"
              type="button"
            >
              <HelpCircle
                className={`text-slate-600 ${
                  isDesktop ? "w-7 h-7" : isTablet ? "w-7 h-7" : "w-5 h-5"
                }`}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajuda para a Questão {questionNumber}</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-slate-700">
              <p>
                Aqui estarão as instruções, dicas ou a teoria necessária para
                resolver esta questão. Você pode adicionar texto, imagens ou
                qualquer outro componente React aqui dentro.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <div
          className={`bg-white text-slate-900 rounded-2xl shadow-lg flex items-center justify-center ${
            isDesktop
              ? "p-8 min-h-[400px] xl:min-h-[500px]"
              : isTablet
                ? "p-10 min-h-[400px]"
                : "p-6 min-h-[200px] sm:min-h-[260px]"
          }`}
        >
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}