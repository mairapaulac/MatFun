"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface EquationSkeletonProps {
  equation: string
  variables: string[]
  onVariableChange?: (variable: string, value: string) => void
  values?: Record<string, string>
  onAnswerChange?: (answer: string) => void
  externalAnswer?: string
  problem?: GeneratedProblem
}

export type ProblemType = "both_empty" | "first_filled" | "second_filled" | "result_empty"

export interface GeneratedProblem {
  firstNumber: number
  secondNumber: number
  result: number
  type: ProblemType
}

// Função para gerar problema aleatório
export function generateRandomProblem(): GeneratedProblem {
  const firstNumber = Math.floor(Math.random() * 9) + 1 // 1-9
  const secondNumber = Math.floor(Math.random() * 9) + 1 // 1-9
  const result = firstNumber * secondNumber

  const types: ProblemType[] = ["both_empty", "first_filled", "second_filled", "result_empty"]
  const type = types[Math.floor(Math.random() * types.length)]

  return { firstNumber, secondNumber, result, type }
}

export default function EquationSkeleton({
  equation,
  variables,
  onVariableChange,
  values = {},
  onAnswerChange,
  externalAnswer = "",
  problem: externalProblem,
}: EquationSkeletonProps): React.JSX.Element {
  const [problem, setProblem] = useState<GeneratedProblem | null>(null)
  const [firstValue, setFirstValue] = useState(values["first"] || "")
  const [secondValue, setSecondValue] = useState(values["second"] || "")
  const [resultValue, setResultValue] = useState("")

  // Initialize problem after component mounts to avoid hydration mismatch
  useEffect(() => {
    if (externalProblem) {
      setProblem(externalProblem)
    } else if (!problem) {
      setProblem(generateRandomProblem())
    }
  }, [externalProblem, problem])

  // Parse external answer baseado no tipo do problema
  useEffect(() => {
    if (!problem) return

    if (externalAnswer) {
      // Try to split by multiplication symbols first
      const parts = externalAnswer.split(/[×x*]/)
      if (parts.length === 2) {
        setFirstValue(parts[0])
        setSecondValue(parts[1])
      } else {
        // Baseado no tipo do problema, determinar onde colocar a resposta
        if (problem.type === "both_empty") {
          // Se ambos estão vazios, dividir em dois dígitos se possível
          if (externalAnswer.length === 2) {
            setFirstValue(externalAnswer[0])
            setSecondValue(externalAnswer[1])
          } else if (externalAnswer.length === 1) {
            setFirstValue(externalAnswer)
            setSecondValue("")
          }
        } else if (problem.type === "first_filled") {
          // Se primeiro está preenchido, colocar no segundo campo
          setFirstValue("")
          setSecondValue(externalAnswer)
        } else if (problem.type === "second_filled") {
          // Se segundo está preenchido, colocar no primeiro campo
          setFirstValue(externalAnswer)
          setSecondValue("")
        } else if (problem.type === "result_empty") {
          // Se resultado está vazio, colocar no resultado
          setFirstValue("")
          setSecondValue("")
          setResultValue(externalAnswer)
        }
      }
    } else {
      setFirstValue("")
      setSecondValue("")
      setResultValue("")
    }
  }, [externalAnswer, problem?.type])

  // Reset values when problem changes
  useEffect(() => {
    if (problem) {
      setFirstValue("")
      setSecondValue("")
      setResultValue("")
    }
  }, [problem])

  const handleFirstChange = (value: string) => {
    if (!problem) return

    setFirstValue(value)
    onVariableChange?.("first", value)

    // Determinar resposta baseada no tipo do problema
    if (problem.type === "both_empty") {
      onAnswerChange?.(`${value}×${secondValue}`)
    } else if (problem.type === "second_filled") {
      onAnswerChange?.(`${value}×${problem.secondNumber}`)
    } else if (problem.type === "result_empty") {
      onAnswerChange?.(`${value}×${secondValue}`)
    }
  }

  const handleSecondChange = (value: string) => {
    if (!problem) return

    setSecondValue(value)
    onVariableChange?.("second", value)

    // Determinar resposta baseada no tipo do problema
    if (problem.type === "both_empty") {
      onAnswerChange?.(`${firstValue}×${value}`)
    } else if (problem.type === "first_filled") {
      onAnswerChange?.(`${problem.firstNumber}×${value}`)
    } else if (problem.type === "result_empty") {
      onAnswerChange?.(`${firstValue}×${value}`)
    }
  }

  const handleResultChange = (value: string) => {
    setResultValue(value)
    onAnswerChange?.(value)
  }

  // Renderizar campo baseado no tipo do problema
  const renderField = (value: string, onChange: (value: string) => void, isEditable: boolean) => {
    if (isEditable) {
      return (
        <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-6xl md:text-6xl lg:text-6xl font-normal border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
          {value || ""}
        </div>
      )
    } else {
      return (
        <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-normal border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600">
          {value}
        </div>
      )
    }
  }

  // Show loading state while problem is being initialized
  if (!problem) {
    return (
      <div className="text-center space-y-4 md:space-y-6">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900">
          <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-normal border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 animate-pulse">
            ...
          </div>
          <span className="text-2xl md:text-3xl font-bold text-slate-700">×</span>
          <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-normal border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 animate-pulse">
            ...
          </div>
          <span className="text-3xl md:text-4xl font-bold text-slate-700">=</span>
          <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-24 lg:h-20 text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-normal border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 animate-pulse">
            ...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-4 md:space-y-6">
      {/* Background symbols */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl text-slate-300 space-x-8 md:space-x-12">
          <span>+</span>
          <span>×</span>
        </div>
      </div>

      {/* Main equation */}
      <div className="relative flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900">
        {/* Primeiro número */}
        {problem.type === "first_filled" || problem.type === "result_empty"
          ? renderField(problem.firstNumber.toString(), () => {}, false)
          : renderField(firstValue, handleFirstChange, true)}

        <span className="text-2xl md:text-3xl font-bold text-slate-700">×</span>

        {/* Segundo número */}
        {problem.type === "second_filled" || problem.type === "result_empty"
          ? renderField(problem.secondNumber.toString(), () => {}, false)
          : renderField(secondValue, handleSecondChange, true)}

        <span className="text-3xl md:text-4xl font-bold text-slate-700">=</span>

        {/* Resultado */}
        {problem.type === "result_empty"
          ? renderField(resultValue, handleResultChange, true)
          : renderField(problem.result.toString(), () => {}, false)}
      </div>
    </div>
  )
}

// Example usage component
export function ExampleEquationSkeleton({
  externalAnswer,
  problem,
}: {
  externalAnswer?: string
  problem?: GeneratedProblem
}): React.JSX.Element {
  return (
    <EquationSkeleton
      equation="___ × ___ = ___"
      variables={["first", "second"]}
      values={{}}
      externalAnswer={externalAnswer}
      problem={problem}
    />
  )
}
