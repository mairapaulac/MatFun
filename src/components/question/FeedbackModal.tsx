"use client"
import { Button } from "@/components/ui/button"

interface FeedbackModalProps {
  isOpen: boolean
  type: "correct" | "incorrect" | "timeout"
  points?: number
  multiplier?: number
  onClose: () => void
}

export default function FeedbackModal({ isOpen, type, points, multiplier, onClose }: FeedbackModalProps) {
  if (!isOpen) return null

  const getTitle = () => {
    switch (type) {
      case "correct":
        return "🎉 Correto!"
      case "incorrect":
        return "❌ Incorreto"
      case "timeout":
        return "⏰ Tempo Esgotado!"
      default:
        return ""
    }
  }

  const getMessage = () => {
    switch (type) {
      case "correct":
        return `Você ganhou ${points} pontos com multiplicador ${multiplier}x!`
      case "incorrect":
        return "Tente novamente na próxima questão!"
      case "timeout":
        return "O tempo acabou! Vamos para a próxima questão."
      default:
        return ""
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "correct":
        return "bg-emerald-500"
      case "incorrect":
        return "bg-rose-500"
      case "timeout":
        return "bg-amber-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center shadow-2xl">
        <div className={`w-16 h-16 ${getBgColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <span className="text-2xl text-white">{type === "correct" ? "✓" : type === "incorrect" ? "✗" : "⏰"}</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">{getTitle()}</h2>

        <p className="text-slate-600 mb-6">{getMessage()}</p>

        <Button
          onClick={onClose}
          className={`w-full ${getBgColor()} hover:opacity-90 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200`}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
