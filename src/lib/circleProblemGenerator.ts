import { SeededRNG, createSeed } from './seededRNG'

export interface CircleFromCircumferenceProblem {
  circumference: number
  radius: number
  area: number
  unit: string
}

export interface ProblemDescriptor {
  type: 'geometry_circle_from_circumference'
  seedOffset: string
  difficulty: number
}

// Difficulty ranges for radius
const DIFFICULTY_RANGES = {
  1: { min: 2, max: 6 },   // C ∈ {12,18,24,30,36} → A ∈ {12,27,48,75,108}
  2: { min: 4, max: 12 },  // C ∈ {24,30,36,42,48,54,60,66,72} → A ∈ {48,75,108,147,192,243,300,363,432}
  3: { min: 6, max: 20 }   // C ∈ {36,42,48,54,60,66,72,78,84,90,96,102,108,114,120} → A ∈ {108,147,192,243,300,363,432,507,588,675,768,867,972,1083,1200}
}

export function generateCircleFromCircumferenceSeed(
  roomSeed: string,
  seedOffset: string,
  playerId: string = 'default',
  difficulty: number = 1
): CircleFromCircumferenceProblem {
  const seed = createSeed(roomSeed, seedOffset, playerId)
  const rng = new SeededRNG(seed)
  
  const range = DIFFICULTY_RANGES[difficulty as keyof typeof DIFFICULTY_RANGES] || DIFFICULTY_RANGES[1]
  
  // Generate radius within range
  let radius = rng.nextIntInclusive(range.min, range.max)
  
  // Ensure circumference is multiple of 6 (since C = 6 * r with π = 3)
  // This is already guaranteed since we're using integer radius
  
  // Calculate circumference and area
  const area = 3 * radius * radius // A = π * r² = 3 * r²
  
  // Ensure area is within reasonable bounds (1-2000)
  let attempts = 0
  while (area > 2000 && attempts < 10) {
    radius = rng.nextIntInclusive(range.min, range.max)
    attempts++
  }
  
  return {
    circumference: 6 * radius,
    radius,
    area: 3 * radius * radius,
    unit: 'cm²'
  }
}

// Helper to validate if a circumference produces integer area
export function validateCircumference(circumference: number): boolean {
  // C = 6 * r, so r = C / 6
  const radius = circumference / 6
  return Number.isInteger(radius) && radius > 0
}

// Helper to calculate area from circumference
export function calculateAreaFromCircumference(circumference: number): number {
  const radius = circumference / 6
  return 3 * radius * radius
}
