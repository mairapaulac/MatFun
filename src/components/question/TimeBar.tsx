"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { TimeBarProps } from "@/types/question"

export default function TimeBar({ progress, totalMs = 60000, showLabels = true }: TimeBarProps): React.JSX.Element {
  const [widthPercentage, setWidthPercentage] = useState(100)

  // Update width when progress changes
  useEffect(() => {
    const newWidth = Math.max(0, Math.min(100, (1 - progress) * 100))
    setWidthPercentage(newWidth)
    console.log("TimeBar - Progress:", progress, "Width:", newWidth)
  }, [progress])

  // Force update every 100ms to ensure smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newWidth = Math.max(0, Math.min(100, (1 - progress) * 100))
      setWidthPercentage((prev) => {
        const diff = Math.abs(newWidth - prev)
        return diff > 0.1 ? newWidth : prev // Only update if significant change
      })
    }, 50)

    return () => clearInterval(interval)
  }, [progress])

  // Calculate current multiplier based on progress
  // Since the bar depletes from right to left, we need to match the visual zones
  const getCurrentMultiplier = (progress: number): number => {
    if (progress <= 0.25) return 8 // 0-15s: 8x (rightmost zone when full)
    if (progress <= 0.5) return 4 // 15-30s: 4x
    if (progress <= 0.75) return 2 // 30-45s: 2x
    return 1 // 45-60s: 1x (leftmost zone when almost empty)
  }

  const currentMultiplier = getCurrentMultiplier(progress)
  const remainingSeconds = Math.ceil((1 - progress) * (totalMs / 1000))

  return (
    <div className="w-full space-y-2 md:space-y-3">
      {/* Time remaining and current multiplier */}
      <div className="flex justify-between items-center text-sm text-white">
        <span className="font-normal text-xl md:text-2xl">Tempo: {remainingSeconds}s</span>
        <span className="font-normal text-lg md:text-xl text-emerald-400">{currentMultiplier}x Multiplicador</span>
      </div>

      {/* Progress bar container */}
      <div className="relative border-4 border-slate-400/60 rounded-full">
        {/* Background bar */}
        <div className="h-4 md:h-6 rounded-full bg-slate-200 overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-emerald-500"
            style={{
              width: `${widthPercentage}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-4 md:h-6 pointer-events-none">
          {[25, 50, 75].map((breakpoint) => (
            <div
              key={breakpoint}
              className="absolute top-0 w-1 h-full bg-slate-600 opacity-70"
              style={{ left: `${breakpoint}%` }}
            />
          ))}
        </div>

        {/* Zone labels - inverted order for right-to-left depletion */}
        {showLabels && (
          <div className="absolute top-0 left-0 w-full h-4 md:h-6 flex justify-between items-center pointer-events-none">
            {[1, 2, 4, 8].map((multiplier, index) => {
              const position = (index + 0.5) * 25 // 12.5%, 37.5%, 62.5%, 87.5%
              const isActive = currentMultiplier === multiplier

              return (
                <div key={multiplier} className="absolute transform -translate-x-1/2" style={{ left: `${position}%` }}>
                  <span
                    className={`text-xs md:text-sm font-bold px-1 py-0.5 md:px-2 md:py-1 rounded ${
                      isActive ? "bg-emerald-600 text-white" : "text-slate-600"
                    }`}
                  >
                    {multiplier}x
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Screen reader updates */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {remainingSeconds > 0
          ? `Tempo restante: ${remainingSeconds} segundos. Multiplicador atual: ${currentMultiplier}x`
          : "Tempo esgotado!"}
      </div>
    </div>
  )
}
