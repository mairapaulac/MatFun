"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { QuestionScreenProps, SubmitMetadata } from "@/types/question"
import { useTimer } from "@/hooks/useTimer"
import QuestionCard from "./QuestionCard"
import TimeBar from "./TimeBar"
import Keypad from "./Keypad"
import { Button } from "@/components/ui/button"

export default function QuestionScreen({
  score,
  questionNumber,
  moduleLabel,
  questionSkeleton,
  initialAnswer = "",
  currentAnswer = "",
  onAnswerChange,
  totalMs = 60000,
  onSubmit,
  onTimeout,
}: QuestionScreenProps): React.JSX.Element {
  const [answer, setAnswer] = useState(initialAnswer)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timerKey, setTimerKey] = useState(0)

  const timer = useTimer(totalMs, true, timerKey)

  // Update answer when currentAnswer prop changes
  useEffect(() => {
    setAnswer(currentAnswer)
  }, [currentAnswer])

  // Reset timer when question changes
  useEffect(() => {
    setAnswer(initialAnswer)
    setIsSubmitted(false)
    // Force timer reset by changing the key
    setTimerKey((prev) => prev + 1)
  }, [questionNumber, initialAnswer])

  const handleAnswerChange = (newAnswer: string) => {
    setAnswer(newAnswer)
    onAnswerChange?.(newAnswer)
  }

  // Handle timeout
  useEffect(() => {
    if (timer.elapsedMs >= totalMs && !isSubmitted) {
      setIsSubmitted(true)
      onSubmit("", { elapsedMs: totalMs, multiplier: 1 })
      onTimeout?.()
    }
  }, [timer.elapsedMs, totalMs, isSubmitted, onSubmit, onTimeout])

  const handleSubmit = () => {
    if (isSubmitted || answer.trim() === "") return

    setIsSubmitted(true)
    const metadata: SubmitMetadata = {
      elapsedMs: timer.elapsedMs,
      multiplier: timer.multiplier,
    }

    onSubmit(answer, metadata)
  }

  const isDisabled = isSubmitted || timer.elapsedMs >= totalMs

  return (
    <div className="min-h-screen bg-background ">
      {/* Mobile Layout (default) */}
      <div className="flex flex-col items-center px-6 py-4 space-y-8 md:hidden">
        {/* Score Display */}
        <div className="text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-rose-500 leading-tight drop-shadow-lg"
            style={{ color: "#FF3366" }}
          >
            Pontuação: {score}
          </h2>
        </div>

        {/* Question Card */}
        <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel}>
          {questionSkeleton}
        </QuestionCard>

        {/* Time Bar */}
        <div className="w-full max-w-md">
          <TimeBar progress={timer.progress} totalMs={totalMs} showLabels={true} />
        </div>

        {/* Keypad */}
        <div className="w-full max-w-sm">
          <Keypad value={answer} onChange={handleAnswerChange} disabled={isDisabled} />
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-sm">
          <Button
            onClick={handleSubmit}
            disabled={isDisabled || answer.trim() === ""}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? "Respondido!" : "Responder!"}
          </Button>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex md:min-h-screen md:px-6 md:py-4 lg:hidden">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <h2 className="text-5xl font-bold text-rose-500 leading-tight drop-shadow-lg" style={{ color: "#FF3366" }}>
              Pontuação: {score}
            </h2>
          </div>

          {/* Question Card */}
          <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel} isTablet={true}>
            {questionSkeleton}
          </QuestionCard>

          {/* Time Bar */}
          <div className="w-full max-w-lg">
            <TimeBar progress={timer.progress} totalMs={totalMs} showLabels={true} />
          </div>

          {/* Keypad */}
          <div className="w-full max-w-md">
            <Keypad value={answer} onChange={handleAnswerChange} disabled={isDisabled} />
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-md">
            <Button
              onClick={handleSubmit}
              disabled={isDisabled || answer.trim() === ""}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-full text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "Respondido!" : "Responder!"}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:min-h-screen lg:px-8 lg:py-6">
        {/* Left Side - Question */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 pr-8">
          {/* Score Display */}
          <div className="text-center">
            <h2
              className="text-5xl xl:text-6xl font-bold text-rose-500 leading-tight drop-shadow-lg"
              style={{ color: "#FF3366" }}
            >
              Pontuação: {score}
            </h2>
          </div>

          {/* Question Card */}
          <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel} isDesktop={true}>
            {questionSkeleton}
          </QuestionCard>

          {/* Time Bar */}
          <div className="w-full max-w-lg">
            <TimeBar progress={timer.progress} totalMs={totalMs} showLabels={true} />
          </div>
        </div>

        {/* Right Side - Controls */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 pl-8">
          {/* Keypad */}
          <div className="w-full max-w-md">
            <Keypad value={answer} onChange={handleAnswerChange} disabled={isDisabled} isDesktop={true} />
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-md">
            <Button
              onClick={handleSubmit}
              disabled={isDisabled || answer.trim() === ""}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "Respondido!" : "Responder!"}
            </Button>
          </div>
        </div>
      </div>

      {/* Time's up indicator */}
      {timer.elapsedMs >= totalMs && (
        <div className="fixed inset-0 bg-red-500/20 flex items-center justify-center z-50 animate-pulse">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl">Tempo Esgotado!</div>
        </div>
      )}
    </div>
  )
}
