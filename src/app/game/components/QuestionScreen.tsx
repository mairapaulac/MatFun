"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  questionType = "default",
  initialAnswer = "",
  currentAnswer = "",
  totalMs = 60000,
  onSubmit,
  onTimeout,
  onKeypadPress,
  fractionAnswer = { numerator: "", denominator: "" },
  isSubmitted,
}: QuestionScreenProps): React.JSX.Element {
  const [timerKey, setTimerKey] = useState(0)
  const timeoutHandledRef = useRef(false)

  // verificando se a resposta esta vazia em questoes de fraçao
  const isAnswerEmpty = questionType.startsWith('fraction_operation')
    ? fractionAnswer.numerator.trim() === '' || fractionAnswer.denominator.trim() === ''
    : currentAnswer.trim() === '';

  const timer = useTimer(totalMs, true, timerKey, onTimeout)

  // Reset timer when question changes
  useEffect(() => {
    timeoutHandledRef.current = false
    // Force timer reset by changing the key
    setTimerKey((prev) => prev + 1)
  }, [questionNumber, initialAnswer])

  // Timeout is now handled entirely by useTimer

  const handleSubmit = () => {
    const metadata: SubmitMetadata = {
      elapsedMs: timer.elapsedMs,
      multiplier: timer.multiplier,
    }

    onSubmit(metadata)
  }

  const isDisabled = isSubmitted || timer.elapsedMs >= totalMs

  return (
    <div className="min-h-screen bg-background bg-pattern">
      {/* Mobile Layout (default) */}
      <div className="flex flex-col items-center px-6 py-4 space-y-8 md:hidden">
        {/* Score Display */}
        <div className="text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-green-400 leading-tight drop-shadow-lg"
            
          >
            Pontuação: {score}
          </h2>
        </div>

        {/* Question Card */}
        <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel} questionType={questionType}>
          {questionSkeleton}
        </QuestionCard>

        {/* Time Bar */}
        <div className="w-full max-w-md">
          <TimeBar progress={timer.progress} totalMs={totalMs} showLabels={true} />
        </div>

        {/* Keypad */}
        <div className="w-full max-w-sm">
          <Keypad 
            onKeyPress={onKeypadPress || (() => {})}
            disabled={isDisabled}
            showToggleFocus={questionType.startsWith("fraction_operation")}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-sm">
          <Button
              variant={"default"}
              onClick={handleSubmit}
              disabled={isDisabled || isAnswerEmpty}
              className="w-full text-[#24366B]  font-bold py-4 px-8 rounded-full text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "Respondido!" : "Responder!"}
            </Button>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex md:min-h-screen md:px-8 md:py-0 lg:hidden">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Score Display */}
          <div className="text-center">
            <h2 className="text-6xl font-bold text-green-500 leading-tight drop-shadow-lg" >
              Pontuação: {score}
            </h2>
          </div>

          {/* Question Card */}
          <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel} isTablet={true} questionType={questionType}>
            {questionSkeleton}
          </QuestionCard>

          {/* Time Bar */}
          <div className="w-full max-w-2xl">
            <TimeBar progress={timer.progress} totalMs={totalMs} showLabels={true} />
          </div>

          {/* Keypad */}
          <div className="w-full max-w-xl">
            <Keypad 
              onKeyPress={onKeypadPress || (() => {})}
              disabled={isDisabled}
              showToggleFocus={questionType.startsWith("fraction_operation")}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-2xl">
            <Button
              variant={"default"}
              onClick={handleSubmit}
              disabled={isDisabled || isAnswerEmpty}
              className="w-full text-[#24366B] md:h-16  font-bold  px-8 rounded-full text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="text-5xl xl:text-6xl font-bold text-green-500 leading-tight drop-shadow-lg"
            >
              Pontuação: {score}
            </h2>
          </div>

          {/* Question Card */}
          <QuestionCard questionNumber={questionNumber} moduleLabel={moduleLabel} isDesktop={true} questionType={questionType}>
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
            <Keypad 
              onKeyPress={onKeypadPress || (() => {})}
              disabled={isDisabled} 
              isDesktop={true}
              showToggleFocus={questionType.startsWith("fraction_operation")}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-md">
            <Button
              variant={"default"}
              onClick={handleSubmit}
              disabled={isDisabled || isAnswerEmpty}
              className="w-full  bg-green-600 hover:bg-green-700 text-white font-normal py-4 px-8 rounded-full text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
