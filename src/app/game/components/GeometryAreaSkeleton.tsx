"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface GeometryAreaSkeletonProps {
  onAnswerChange?: (answer: string) => void
  externalAnswer?: string
  problem?: GeneratedGeometryProblem
}

export type GeometryShape = "triangle" | "rectangle" | "parallelogram" | "trapezoid" | "circle" | "circle_from_circumference" | "rectangle_minus_circle"

export interface GeneratedGeometryProblem {
  shape: GeometryShape
  measurements: Record<string, number>
  area: number
  unit: string
}

// Função para gerar problema geométrico aleatório
export function generateRandomGeometryProblem(): GeneratedGeometryProblem {
  const shapes: GeometryShape[] = ["triangle", "rectangle", "parallelogram", "trapezoid", "circle", "circle_from_circumference", "rectangle_minus_circle"]
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  
  let measurements: Record<string, number> = {}
  let area: number = 0; // Initialize area to 0

  switch (shape) {
    case "triangle":
      // Garantir que base * altura seja par para área inteira
      const base = Math.floor(Math.random() * 8) + 2 // 2-9
      const height = Math.floor(Math.random() * 8) + 2 // 2-9
      // Se produto for ímpar, ajustar altura para par
      const adjustedHeight = (base * height) % 2 === 0 ? height : height + 1
      measurements = { base, height: adjustedHeight }
      area = Math.floor((base * adjustedHeight) / 2)
      break

    case "rectangle":
      const width = Math.floor(Math.random() * 9) + 1 // 1-9
      const rectHeight = Math.floor(Math.random() * 9) + 1 // 1-9
      measurements = { width, height: rectHeight }
      area = width * rectHeight
      break

    case "parallelogram":
      const pBase = Math.floor(Math.random() * 9) + 1 // 1-9
      const pHeight = Math.floor(Math.random() * 9) + 1 // 1-9
      measurements = { base: pBase, height: pHeight }
      area = pBase * pHeight
      break

    case "trapezoid":
      // Garantir que baseMaior + baseMenor seja par e que sejam diferentes
      const baseMaior = Math.floor(Math.random() * 6) + 5 // 5-10 (base maior)
      let baseMenor = Math.floor(Math.random() * 4) + 2 // 2-5 (base menor)
      
      // Garantir que baseMenor seja menor que baseMaior
      if (baseMenor >= baseMaior) {
        baseMenor = baseMaior - 1
      }
      
      const tHeight = Math.floor(Math.random() * 8) + 2 // 2-9
      
      // Ajustar baseMenor se soma for ímpar
      const adjustedBaseMenor = (baseMaior + baseMenor) % 2 === 0 ? baseMenor : baseMenor + 1
      
      // Verificar novamente se ainda são diferentes após ajuste
      const finalBaseMenor = adjustedBaseMenor < baseMaior ? adjustedBaseMenor : baseMaior - 1
      
      measurements = { baseMaior, baseMenor: finalBaseMenor, height: tHeight }
      area = Math.floor(((baseMaior + finalBaseMenor) / 2) * tHeight)
      break

    case "circle":
      // Usar π ≈ 3 para manter área inteira
      const radius = Math.floor(Math.random() * 8) + 2 // 2-9
      measurements = { radius }
      area = 3 * radius * radius // π ≈ 3
      break

    case "circle_from_circumference":
      // Gerar circunferência múltipla de 6 (C = 6 * r com π = 3)
      const circumference = (Math.floor(Math.random() * 8) + 2) * 6 // 12, 18, 24, 30, 36, 42, 48, 54
      const r = circumference / 6
      measurements = { circumference }
      area = 3 * r * r
      break

    case "rectangle_minus_circle": {
      const rectWidth = Math.floor(Math.random() * 5) + 6; // 6-10
      let rectHeight = Math.floor(Math.random() * 5) + 6; // 6-10
      
      // Ensure rectangle dimensions are distinct for more variety
      while (rectHeight === rectWidth) {
        rectHeight = Math.floor(Math.random() * 5) + 6;
      }

      const minDim = Math.min(rectWidth, rectHeight);
      const maxPossibleRadius = Math.floor(minDim / 2); 
      
      // Ensure maxPossibleRadius is at least 2 to allow for a valid circleRadius
      const effectiveMaxRadius = Math.max(2, maxPossibleRadius); 

      let circleRadius = Math.floor(Math.random() * (effectiveMaxRadius - 1)) + 1; // 1 to effectiveMaxRadius - 1

      // Ensure circleRadius is at least 1
      if (circleRadius < 1) circleRadius = 1;

      const areaRect = rectWidth * rectHeight;
      const areaCirc = 3 * circleRadius * circleRadius; // Using pi approx 3

      area = areaRect - areaCirc;
      measurements = { width: rectWidth, height: rectHeight, radius: circleRadius };
      break;
    }
  }

  return {
    shape,
    measurements,
    area,
    unit: "cm²"
  }
}

// Componentes SVG para cada figura
const TriangleSVG: React.FC<{ base: number; height: number }> = ({ base, height }) => (
  <svg viewBox="0 -10 200 130" className="w-full h-36 md:h-64">
    <polygon
      points="00,100 200,100 100,00"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    <line
      x1="100"
      y1="100"
      x2="100"
      y2="0"
      stroke="#374151"
      strokeDasharray="5,5"
      strokeWidth="3"
    />
    <text x="100" y="115" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {base} cm
    </text>
    <text x="120" y="50" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700" >
      {height} cm
    </text>
  </svg>
)

const RectangleSVG: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <svg viewBox="0 0 200 120" className="w-full h-36 md:h-64">
    <rect
      x="10"
      y="10"
      width="180"
      height="80"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    <text x="100" y="110" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {width} cm
    </text>
    <text x="15" y="50" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700" transform="rotate(-90 10 60)">
      {height} cm
    </text>
  </svg>
)

const ParallelogramSVG: React.FC<{ base: number; height: number }> = ({ base, height }) => (
  <svg viewBox="0 0 200 120" className=" w-full h-36 md:h-64">
    <polygon
      points="20,100 180,100 160,20 0,20"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    <text x="100" y="115" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {base} cm
    </text>
    <text x="10" y="54" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700" transform="rotate(-90 10 60)">
      {height} cm
    </text>
  </svg>
)

const TrapezoidSVG: React.FC<{ baseMaior: number; baseMenor: number; height: number }> = ({ 
  baseMaior, 
  baseMenor, 
  height 
}) => (
  <svg viewBox="0 0 200 120" className="w-full h-36 md:h-64">
    <polygon
      points="40,100 160,100 180,20 20,20"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    /><line
      x1="60"
      y1="100"
      x2="60"
      y2="20"
      stroke="#374151"
      strokeDasharray="5,5"
      strokeWidth="3"
    />
    <text x="100" y="115" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {baseMenor} cm
    </text>
    <text x="100" y="15" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {baseMaior} cm
    </text>
    <text x="80" y="60" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-slate-700" >
      {height} cm
    </text>
  </svg>
)

const CircleSVG: React.FC<{ radius: number }> = ({ radius }) => (
  <svg viewBox="0 0 200 120" className="w-full h-36 md:h-64">
    <circle
      cx="100"
      cy="60"
      r="40"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    <line
      x1="100"
      y1="60"
      x2="140"
      y2="60"
      stroke="#374151"
      strokeWidth="2"
    />
    <text x="100" y="55" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      {radius} cm
    </text>
    <text x="90" y="115" className="text-[16px] sm:text-sm font-semibold fill-slate-700">
      𝝿 = 3
    </text>
  </svg>
)

const CircleFromCircumferenceSVG: React.FC<{ circumference: number }> = () => (
  <svg viewBox="0 0 200 120" className="w-full h-36 md:h-64">
    <circle
      cx="100"
      cy="60"
      r="40"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    {/* Circumference indicator - curved line around the circle */}
    <circle
      cx="100"
      cy="60"
      r="40"
      fill="none"
      stroke="#ef4444dd"
      strokeWidth="3"
      strokeDasharray="4,5"
      
    />
    {/* Arrow pointing to circumference */}
    <path
      d="M 100 20 L 100 10 M 95 15 L 100 10 L 105 15"
      stroke="#ef4444"
      strokeWidth="2"
      fill="none"
    />
    <text x="100" y="10" textAnchor="middle" className="text-[16px] sm:text-sm font-semibold fill-red-600">
      C
    </text>
    
  </svg>
)

const RectangleMinusCircleSVG: React.FC<{ width: number; height: number; radius: number }> = ({ width, height, radius }) => {
  // Fixed visual dimensions for the SVG elements
  const visualRectWidth = 120;
  const visualRectHeight = 80;
  const visualCircleRadius = 20;

  // Calculate positions to center them in the viewBox (200x120)
  const rectX = (200 - visualRectWidth) / 2;
  const rectY = (120 - visualRectHeight) / 2;
  const circleCx = 100;
  const circleCy = 60;

  return (
    <svg viewBox="0 0 200 120" className="w-full h-36 md:h-64">
      {/* Rectangle (fixed visual size) */}
      <rect
        x={rectX}
        y={rectY}
        width={visualRectWidth}
        height={visualRectHeight}
        fill="#fb2c36"
        stroke="#374151"
        strokeWidth="3"
      />
      {/* Circle (fixed visual size) */}
      <circle
        cx={circleCx}
        cy={circleCy}
        r={visualCircleRadius}
        fill="white"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4,4"
      />
      {/* Radius line (fixed visual size) */}
      <line
        x1={circleCx}
        y1={circleCy}
        x2={circleCx + visualCircleRadius}
        y2={circleCy}
        stroke="#ef1111"
        strokeWidth="2"
      />
      {/* Text for dimensions (using actual problem values) */}
      <text x={rectX + visualRectWidth / 2} y={rectY + visualRectHeight + 15} textAnchor="middle" className="text-[16px] sm:text-sm font-normal fill-slate-700">
         {width} cm
      </text>
      <text x={rectX - 10} y={rectY + visualRectHeight / 2} textAnchor="middle" className="text-[16px] sm:text-sm font-normal fill-slate-700" transform={`rotate(-90 ${rectX - 10} ${rectY + visualRectHeight / 2})`}>
         {height} cm
      </text>
      <text x={circleCx} y={circleCy - visualCircleRadius - 5} textAnchor="middle" className="text-[10px] sm:text-xs font-normal fill-white">
        r = {radius} cm
      </text>
    </svg>
  );
};

export default function GeometryAreaSkeleton({
  onAnswerChange,
  externalAnswer = "",
  problem: externalProblem,
}: GeometryAreaSkeletonProps): React.JSX.Element {
  const [problem, setProblem] = useState<GeneratedGeometryProblem | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState("")

  // Initialize problem after component mounts to avoid hydration mismatch
  useEffect(() => {
    if (externalProblem) {
      setProblem(externalProblem)
    } else if (!problem) {
      setProblem(generateRandomGeometryProblem())
    }
  }, [externalProblem, problem])

  // Parse external answer
  useEffect(() => {
    if (externalAnswer !== undefined) {
      setCurrentAnswer(externalAnswer)
      onAnswerChange?.(externalAnswer)
    }
  }, [externalAnswer, onAnswerChange])

  // Show loading state while problem is being initialized
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

  const renderShape = () => {
    switch (problem.shape) {
      case "triangle":
        return <TriangleSVG base={problem.measurements.base} height={problem.measurements.height} />
      case "rectangle":
        return <RectangleSVG width={problem.measurements.width} height={problem.measurements.height} />
      case "parallelogram":
        return <ParallelogramSVG base={problem.measurements.base} height={problem.measurements.height} />
      case "trapezoid":
        return (
          <TrapezoidSVG
            baseMaior={problem.measurements.baseMaior}
            baseMenor={problem.measurements.baseMenor}
            height={problem.measurements.height}
          />
        )
      case "circle":
        return <CircleSVG radius={problem.measurements.radius} />
      case "circle_from_circumference":
        return <CircleFromCircumferenceSVG circumference={problem.measurements.circumference} />
      case "rectangle_minus_circle":
        return <RectangleMinusCircleSVG width={problem.measurements.width} height={problem.measurements.height} radius={problem.measurements.radius} />
      default:
        return null
    }
  }

  return (
    <div className="text-center space-y-4 md:space-y-6">
      {/* Background symbols */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl text-slate-300">
          <span>📐</span>
        </div>
      </div>

      {/* Shape display */}
      <div className=" relative flex items-center justify-center">
        {renderShape()}
      </div>

      {/* Show circumference for circle_from_circumference */}
      {problem.shape === "circle_from_circumference" && (
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700">
          Circunferência: {problem.measurements.circumference} cm
          <br />
          𝝿 = 3
        </div>
        
      )}
     {problem.shape === "rectangle_minus_circle" && (
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700">
          <span>Calcule a área <span className="font-normal text-red-500">destacada </span>. π = 3 </span>
        </div>
      )}

      {/* Area prompt with answer field */}
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center space-x-2">
        <span>Área =</span>
        <div className="w-20 h-12  sm:w-24 sm:h-14 md:w-32 md:h-16 lg:w-28 lg:h-14 text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white text-slate-900">
          {currentAnswer || ""}
        </div>
        <span>{problem.unit}</span>
      </div>
    </div>
  )
}

// Example usage component
export function ExampleGeometryAreaSkeleton({
  externalAnswer,
  problem,
}: {
  externalAnswer?: string
  problem?: GeneratedGeometryProblem
}): React.JSX.Element {
  return (
    <GeometryAreaSkeleton
      externalAnswer={externalAnswer}
      problem={problem}
    />
  )
}
