"use client"

export const dynamic = "force-dynamic"

import { useRouter } from "next/navigation"
import { useGameResultStore } from "@/stores/gameResultStore"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { submitGameResult } from "@/actions/game"
import { Trophy, CheckCircle2, XCircle, Home, Zap } from "lucide-react"

export default function EndGamePage() {
  const router = useRouter()
  const { payload, clearGameResult } = useGameResultStore((state) => state)
  const submittedRef = useRef(false)

  const handleGoHome = () => {
    const handleSubmitResult = async () => {
      if (payload && !submittedRef.current) {
        submittedRef.current = true
        console.log("Submitting game result:", payload)
        const result = await submitGameResult(payload)
        console.log("Submission result:", result)
      }
    }
    handleSubmitResult()
    clearGameResult()
    router.push("/home")
  }

  if (!payload) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-3 sm:p-4">
        <div className="text-center space-y-4 sm:space-y-6">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto animate-bounce" />
          <h1 className="text-xl sm:text-2xl font-normal text-gray-800">Nenhum resultado para exibir</h1>
          <Button onClick={() => router.push("/home")} className="gap-2 w-full sm:w-auto">
            <Home className="w-4 h-4" />
            Voltar para Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pattern flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 sm:top-8 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-green-400 rounded-full opacity-20 animate-pulse" />
          <div
            className="absolute -bottom-4 sm:bottom-10 -right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-green-400 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="relative bg-[#182a5c] text-white rounded-[28px] p-8 pb-6 border-4 border-[#3A55A3] shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 p-3 rounded-full border-8 border-[#182a5c]">
            <Trophy className="size-10 text-white" />
          </div>
          <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white">Fim da Partida</h1>
            <p className="text-md sm:text-xl md:text-lg text-gray-100">Confira seu desempenho na partida.</p>
          </div>

          <div className="mb-6 sm:mb-8 bg-[#3A55A3]  rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg">
            <p className="text-sm sm:text-xl font-normal mb-2 opacity-90 tracking-wider">PONTUAÇÃO TOTAL</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black">{payload.scoreGained}</p>
            <p className="text-sm sm:text-xl font-normal mt-2 opacity-90">pontos</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 border-2 sm:border-3 border-slate-600 text-center shadow-lg">
              <div className="flex justify-center mb-2 sm:mb-3">
                <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" />
              </div>
              <p className="text-md sm:text-2xl font-normal text-slate-100 mb-1 sm:mb-2">Acertos</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">{payload.questionsCorrect}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 border-2 sm:border-3 border-slate-600 text-center shadow-lg">
              <div className="flex justify-center mb-2 sm:mb-3">
                <XCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-400" />
              </div>
              <p className="text-md sm:text-2xl font-normal text-slate-100 mb-1 sm:mb-2">Erros</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">{payload.questionsWrong}</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <p className="text-md sm:text-xl font-normal text-slate-100 px-2">Acertos por Tema:</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {[
                { icon: Zap, label: "Álgebra", value: payload.algebraCorrect, color: "bg-slate-800/50 border-purple-500/50" },
                {
                  icon: Zap,
                  label: "Geometria",
                  value: payload.geometryCorrect,
                  color: "bg-slate-800/50 border-orange-500/50",
                },
                { icon: Zap, label: "Frações", value: payload.fractionsCorrect, color: "bg-slate-800/50 border-pink-500/50" },
                {
                  icon: Zap,
                  label: "Porcentagem",
                  value: payload.percentageCorrect,
                  color: "bg-slate-800/50 border-cyan-500/50",
                },
              ].map((category, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-white text-center shadow-lg border-2 ${category.color}`}
                >
                  <p className="text-[20px] sm:text-md font-normal text-slate-300 opacity-90 mb-1 truncate">{category.label}</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-normal">{category.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4 sm:pt-6 border-t border-slate-600">
            <Button
              onClick={handleGoHome}
              className="w-full sm:w-full md:max-w-xs gap-2 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-normal rounded-full  bg-green-600 hover:bg-green-700 text-white shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Voltar para Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
