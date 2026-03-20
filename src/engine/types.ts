export type LetterState = 'correct' | 'wrong-position' | 'not-in-cipher' | 'unused'

export interface Puzzle {
  id: number
  date: string
  ciphertext: string
  solution: string
  hint: string
  category: string
}

export interface GuessResult {
  letter: string
  state: LetterState
}

export interface GameState {
  puzzle: Puzzle
  cipherMap: Record<string, string>   // cipher letter → plain letter
  guesses: GuessResult[]
  solvedLetters: Record<string, string> // cipher → plain, only confirmed correct
  status: 'playing' | 'won' | 'failed'
  guessCount: number
}