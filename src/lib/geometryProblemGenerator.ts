
export type GeometryShape = "triangle" | "rectangle" | "parallelogram" | "trapezoid" | "circle" | "circle_from_circumference" | "rectangle_minus_circle";

export interface GeneratedGeometryProblem {
  shape: GeometryShape;
  measurements: Record<string, number>;
  area: number;
  unit: string;
}

// Função para gerar problema geométrico aleatório
export function generateGeometryProblem(allowedShapes: GeometryShape[]): GeneratedGeometryProblem {
  const shape = allowedShapes[Math.floor(Math.random() * allowedShapes.length)];
  
  let measurements: Record<string, number> = {};
  let area: number;

  switch (shape) {
    case "triangle":
      const base = Math.floor(Math.random() * 8) + 2; // 2-9
      const height = Math.floor(Math.random() * 8) + 2; // 2-9
      const adjustedHeight = (base * height) % 2 === 0 ? height : height + 1;
      measurements = { base, height: adjustedHeight };
      area = Math.floor((base * adjustedHeight) / 2);
      break;

    case "rectangle":
      const width = Math.floor(Math.random() * 9) + 2; // 2-10
      const rectHeight = Math.floor(Math.random() * 9) + 2; // 2-10
      measurements = { width, height: rectHeight };
      area = width * rectHeight;
      break;

    case "parallelogram":
      const pBase = Math.floor(Math.random() * 9) + 2; // 2-10
      const pHeight = Math.floor(Math.random() * 9) + 2; // 2-10
      measurements = { base: pBase, height: pHeight };
      area = pBase * pHeight;
      break;

    case "trapezoid":
      const baseMaior = Math.floor(Math.random() * 6) + 5; // 5-10
      let baseMenor = Math.floor(Math.random() * 4) + 2; // 2-5
      if (baseMenor >= baseMaior) {
        baseMenor = baseMaior - 1;
      }
      const tHeight = Math.floor(Math.random() * 8) + 2; // 2-9
      const adjustedBaseMenor = (baseMaior + baseMenor) % 2 === 0 ? baseMenor : baseMenor + 1;
      const finalBaseMenor = adjustedBaseMenor < baseMaior ? adjustedBaseMenor : baseMaior - 1;
      measurements = { baseMaior, baseMenor: finalBaseMenor, height: tHeight };
      area = Math.floor(((baseMaior + finalBaseMenor) / 2) * tHeight);
      break;

    case "circle":
      const radius = Math.floor(Math.random() * 6) + 2; // 2-7
      measurements = { radius };
      area = 3 * radius * radius; // π ≈ 3
      break;

    case "circle_from_circumference":
      const circumference = (Math.floor(Math.random() * 8) + 2) * 6; // 12, 18, ...
      const r = circumference / 6;
      measurements = { circumference };
      area = 3 * r * r;
      break;

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
  };
}
