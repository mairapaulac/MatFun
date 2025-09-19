// Seeded RNG implementation using mulberry32
// Based on: https://github.com/bryc/code/blob/master/jshash/PRNGs.md

export class SeededRNG {
  private state: number

  constructor(seed: string) {
    this.state = this.strToSeed(seed)
  }

  private strToSeed(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  // Generate next random number between 0 and 1
  next(): number {
    this.state |= 0
    this.state = (this.state + 0x6d2b79f5) | 0
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  // Generate random integer between min (inclusive) and max (exclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min)) + min
  }

  // Generate random integer between min (inclusive) and max (inclusive)
  nextIntInclusive(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }
}

// Helper function to create seed from room and player info
export function createSeed(roomSeed: string, seedOffset: string, playerId?: string): string {
  const parts = [roomSeed, seedOffset]
  if (playerId) {
    parts.push(playerId)
  }
  return parts.join(':')
}
