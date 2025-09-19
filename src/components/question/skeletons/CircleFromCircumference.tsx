"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { generateCircleFromCircumferenceSeed, type CircleFromCircumferenceProblem, type ProblemDescriptor } from "@/lib/circleProblemGenerator"

interface CircleFromCircumferenceProps {
  descriptor: ProblemDescriptor
  roomSeed: string
  playerId?: string
  initialAnswer?: string
  onSubmit: (submission: { area: number | '' }, meta: { elapsedMs: number; multiplier: 8 | 4 | 2 | 1; descriptorIndex: number }) => void
  disabled?: boolean
  elapsedMs?: number
  multiplier?: 8 | 4 | 2 | 1
}

// SVG component for circle with circumference indicator
const CircleWithCircumferenceSVG: React.FC<{ circumference: number }> = () => (
  <svg viewBox="0 0 200 120" className="w-full h-32">
    <circle
      cx="100"
      cy="60"
      r="40"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    {/* Circumference indicator - curved line around the circle */}
    <path
      d="M 60 60 A 40 40 0 1 1 140 60"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      strokeDasharray="5,5"
    />
    {/* Arrow pointing to circumference */}
    <path
      d="M 100 20 L 100 10 M 95 15 L 100 10 L 105 15"
      stroke="#ef4444"
      strokeWidth="2"
      fill="none"
    />
    <text x="100" y="8" textAnchor="middle" className="text-sm font-semibold fill-red-600">
      C
    </text>
  </svg>
)

export default function CircleFromCircumference({
  descriptor,
  roomSeed,
  playerId = 'default',
  initialAnswer = '',
  onSubmit,
  disabled = false,
  elapsedMs = 0,
  multiplier = 1
}: CircleFromCircumferenceProps): React.JSX.Element {
  const [problem, setProblem] = useState<CircleFromCircumferenceProblem | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState(initialAnswer)

  // Generate problem deterministically
  useEffect(() => {
    const generatedProblem = generateCircleFromCircumferenceSeed(
      roomSeed,
      descriptor.seedOffset,
      playerId,
      descriptor.difficulty
    )
    setProblem(generatedProblem)
  }, [roomSeed, descriptor.seedOffset, playerId, descriptor.difficulty])

  // Update answer when initialAnswer changes
  useEffect(() => {
    setCurrentAnswer(initialAnswer)
  }, [initialAnswer])

  // Handle submit
  const handleSubmit = () => {
    if (!problem || disabled) return

    const areaValue = currentAnswer.trim() === '' ? '' : parseInt(currentAnswer.trim())
    onSubmit(
      { area: areaValue },
      { 
        elapsedMs, 
        multiplier, 
        descriptorIndex: parseInt(descriptor.seedOffset) 
      }
    )
  }

  // Show loading state while problem is being generated
  if (!problem) {
    return (
      <div className="text-center space-y-4 md:space-y-6">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-slate-300 rounded-lg animate-pulse bg-slate-100"></div>
        </div>
        <div className="text-lg font-semibold text-slate-600 animate-pulse">
          Carregando figura...
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-4 md:space-y-6">
      {/* Background symbols */}
      <div className="absolute inset-0 flex items-center justify-center opacity-2">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl text-slate-300">
          <span>⭕</span>
        </div>
      </div>

      {/* Circumference display */}
      <div className="relative">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 mb-4">
          Circunferência: {problem.circumference} cm
        </div>
        
        {/* Circle SVG */}
        <div className="flex items-center justify-center">
          <CircleWithCircumferenceSVG circumference={problem.circumference} />
        </div>
      </div>

      {/* Area prompt with answer field */}
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center space-x-2">
        <span>Área =</span>
        <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-32 md:h-16 lg:w-28 lg:h-14 text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white text-slate-900">
          {currentAnswer || ""}
        </div>
        <span>{problem.unit}</span>
      </div>

      {/* Hidden submit handler - will be called by parent component */}
      <div style={{ display: 'none' }}>
        <button onClick={handleSubmit} ref={(el) => {
          if (el) {
            // Store reference for parent to call
            (window as unknown as { __circleSubmitHandler?: () => void }).__circleSubmitHandler = handleSubmit
          }
        }} />
      </div>
    </div>
  )
}

// Example usage component
export function ExampleCircleFromCircumference({
  roomSeed = 'test-room',
  playerId = 'player-1',
  initialAnswer = '',
  onSubmit,
  disabled = false,
  elapsedMs = 0,
  multiplier = 1
}: {
  roomSeed?: string
  playerId?: string
  initialAnswer?: string
  onSubmit: (submission: { area: number | '' }, meta: { elapsedMs: number; multiplier: 8 | 4 | 2 | 1; descriptorIndex: number }) => void
  disabled?: boolean
  elapsedMs?: number
  multiplier?: 8 | 4 | 2 | 1
}): React.JSX.Element {
  const descriptor: ProblemDescriptor = {
    type: 'geometry_circle_from_circumference',
    seedOffset: '1',
    difficulty: 1
  }

  return (
    <CircleFromCircumference
      descriptor={descriptor}
      roomSeed={roomSeed}
      playerId={playerId}
      initialAnswer={initialAnswer}
      onSubmit={onSubmit}
      disabled={disabled}
      elapsedMs={elapsedMs}
      multiplier={multiplier}
    />
  )
}
