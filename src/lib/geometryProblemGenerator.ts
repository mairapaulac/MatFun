
export type GeometryShape = "triangle" | "rectangle" | "parallelogram" | "trapezoid" | "circle" | "circle_from_circumference";

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
      const width = Math.floor(Math.random() * 9) + 1; // 1-9
      const rectHeight = Math.floor(Math.random() * 9) + 1; // 1-9
      measurements = { width, height: rectHeight };
      area = width * rectHeight;
      break;

    case "parallelogram":
      const pBase = Math.floor(Math.random() * 9) + 1; // 1-9
      const pHeight = Math.floor(Math.random() * 9) + 1; // 1-9
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
      const radius = Math.floor(Math.random() * 6) + 1; // 1-6
      measurements = { radius };
      area = 3 * radius * radius; // π ≈ 3
      break;

    case "circle_from_circumference":
      const circumference = (Math.floor(Math.random() * 8) + 2) * 6; // 12, 18, ...
      const r = circumference / 6;
      measurements = { circumference };
      area = 3 * r * r;
      break;
  }

  return {
    shape,
    measurements,
    area,
    unit: "cm²"
  };
}
