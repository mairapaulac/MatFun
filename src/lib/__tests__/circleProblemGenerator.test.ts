import { 
  generateCircleFromCircumferenceSeed, 
  validateCircumference, 
  calculateAreaFromCircumference 
} from '../circleProblemGenerator'

describe('Circle Problem Generator', () => {
  describe('generateCircleFromCircumferenceSeed', () => {
    it('should generate deterministic results with same seed', () => {
      const roomSeed = 'test-room'
      const seedOffset = '1'
      const playerId = 'player-1'
      const difficulty = 1

      const result1 = generateCircleFromCircumferenceSeed(roomSeed, seedOffset, playerId, difficulty)
      const result2 = generateCircleFromCircumferenceSeed(roomSeed, seedOffset, playerId, difficulty)

      expect(result1).toEqual(result2)
    })

    it('should generate different results with different seeds', () => {
      const roomSeed = 'test-room'
      const playerId = 'player-1'
      const difficulty = 1

      const result1 = generateCircleFromCircumferenceSeed(roomSeed, '1', playerId, difficulty)
      const result2 = generateCircleFromCircumferenceSeed(roomSeed, '2', playerId, difficulty)

      expect(result1).not.toEqual(result2)
    })

    it('should generate circumference that is multiple of 6', () => {
      const result = generateCircleFromCircumferenceSeed('test', '1', 'player', 1)
      
      expect(result.circumference % 6).toBe(0)
      expect(result.circumference).toBeGreaterThan(0)
    })

    it('should calculate correct area using π = 3', () => {
      const result = generateCircleFromCircumferenceSeed('test', '1', 'player', 1)
      
      const expectedArea = 3 * Math.pow(result.circumference / 6, 2)
      expect(result.area).toBe(expectedArea)
    })

    it('should generate integer area', () => {
      const result = generateCircleFromCircumferenceSeed('test', '1', 'player', 1)
      
      expect(Number.isInteger(result.area)).toBe(true)
      expect(result.area).toBeGreaterThan(0)
    })

    it('should respect difficulty ranges', () => {
      const difficulty1 = generateCircleFromCircumferenceSeed('test', '1', 'player', 1)
      const difficulty2 = generateCircleFromCircumferenceSeed('test', '2', 'player', 2)
      const difficulty3 = generateCircleFromCircumferenceSeed('test', '3', 'player', 3)

      // Difficulty 1: radius 2-6, circumference 12-36
      expect(difficulty1.circumference).toBeGreaterThanOrEqual(12)
      expect(difficulty1.circumference).toBeLessThanOrEqual(36)

      // Difficulty 2: radius 4-12, circumference 24-72
      expect(difficulty2.circumference).toBeGreaterThanOrEqual(24)
      expect(difficulty2.circumference).toBeLessThanOrEqual(72)

      // Difficulty 3: radius 6-20, circumference 36-120
      expect(difficulty3.circumference).toBeGreaterThanOrEqual(36)
      expect(difficulty3.circumference).toBeLessThanOrEqual(120)
    })

    it('should generate area within reasonable bounds', () => {
      const result = generateCircleFromCircumferenceSeed('test', '1', 'player', 1)
      
      expect(result.area).toBeGreaterThan(0)
      expect(result.area).toBeLessThanOrEqual(2000)
    })
  })

  describe('validateCircumference', () => {
    it('should validate circumference that produces integer radius', () => {
      expect(validateCircumference(12)).toBe(true) // r = 2
      expect(validateCircumference(18)).toBe(true) // r = 3
      expect(validateCircumference(24)).toBe(true) // r = 4
    })

    it('should reject circumference that produces non-integer radius', () => {
      expect(validateCircumference(13)).toBe(false) // r = 13/6
      expect(validateCircumference(19)).toBe(false) // r = 19/6
    })

    it('should reject zero or negative circumference', () => {
      expect(validateCircumference(0)).toBe(false)
      expect(validateCircumference(-6)).toBe(false)
    })
  })

  describe('calculateAreaFromCircumference', () => {
    it('should calculate correct area using π = 3', () => {
      expect(calculateAreaFromCircumference(12)).toBe(12) // r = 2, A = 3 * 2² = 12
      expect(calculateAreaFromCircumference(18)).toBe(27) // r = 3, A = 3 * 3² = 27
      expect(calculateAreaFromCircumference(24)).toBe(48) // r = 4, A = 3 * 4² = 48
    })

    it('should return integer results for valid circumferences', () => {
      const area1 = calculateAreaFromCircumference(12)
      const area2 = calculateAreaFromCircumference(18)
      const area3 = calculateAreaFromCircumference(24)

      expect(Number.isInteger(area1)).toBe(true)
      expect(Number.isInteger(area2)).toBe(true)
      expect(Number.isInteger(area3)).toBe(true)
    })
  })
})
