"use client"

import type React from "react"
import type { KeypadProps } from "@/types/question"
import { DeleteIcon, ArrowUpDown } from "lucide-react"
const DEFAULT_KEYS = ["7", "8", "9", "⌫", "4", "5", "6", "0", "1", "2", "3", ""]
const FRACTION_KEYS = ["7", "8", "9", "⌫", "4", "5", "6", "0", "1", "2", "3", "toggle_focus"]

export default function Keypad({
  onKeyPress,
  disabled = false,
  isDesktop = false,
  showToggleFocus = false,
}: KeypadProps): React.JSX.Element {
  const keys = showToggleFocus ? FRACTION_KEYS : DEFAULT_KEYS;
  const handleKeyPress = (key: string) => {
    if (disabled) return
    onKeyPress(key)
  }

  const handleKeyDown = (event: React.KeyboardEvent, key: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleKeyPress(key)
    }
  }

  return (
    <div className="w-full mx-auto">
      

      {/* Teclado numérico */}
      <div
        className={`grid grid-cols-4 gap-2 md:gap-4 w-full mx-auto ${
          isDesktop ? "max-w-lg gap-4" : "max-w-sm md:max-w-xl"
        }`}
      >
        {keys.map((key, index) => {
          const isEmpty = key === ""
          const isBackspace = key === "⌫"
          const isToggleFocus = key === "toggle_focus"

          return (
            <button
              key={`${key}-${index}`}
              type="button"
              disabled={disabled || isEmpty}
              onClick={() => handleKeyPress(key)}
              onKeyDown={(e) => handleKeyDown(e, key)}
              className={`
                rounded-xl font-bold transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
                ${isDesktop ? "w-24 h-24 text-[56px]" : "w-20 h-20 md:w-28 md:h-28 text-[48px] md:text-[64px]"}
                ${
                  isEmpty
                    ? "invisible"
                    : isBackspace
                      ? "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white"
                      : isToggleFocus
                        ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                        : "bg-[#111932]/50 hover:bg-[#111932]/90 active:bg-slate-900 text-white"
                }
                active:scale-95 disabled:active:scale-100
                shadow-lg hover:shadow-xl
              `}
              aria-label={
                isBackspace 
                  ? "Apagar último caractere" 
                  : isToggleFocus 
                    ? "Alternar foco entre numerador e denominador"
                    : `Inserir ${key}`
              }
              role="button"
              tabIndex={disabled || isEmpty ? -1 : 0}
            >
              {isBackspace ? (
                <DeleteIcon size={isDesktop ? 60 : 50} className="md:w-[70px] md:h-[70px]"></DeleteIcon>
              ) : isToggleFocus ? (
                <ArrowUpDown size={isDesktop ? 60 : 50} className="md:w-[70px] md:h-[70px]"></ArrowUpDown>
              ) : (
                key
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
