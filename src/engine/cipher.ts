import type { Puzzle, GuessResult, GameState, LetterState } from './types'

export function buildCipherMap(solution: string, ciphertext: string): Record<string, string> {
  const map: Record<string, string> = {}
  for (let i = 0; i < ciphertext.length; i++) {
    const cipher = ciphertext[i].toUpperCase()
    const plain = solution[i].toUpperCase()
    if (cipher.match(/[A-Z]/) && plain.match(/[A-Z]/)) {
      map[cipher] = plain
    }
  }
  return map
}

export function initGameState(puzzle: Puzzle): GameState {
  return {
    puzzle,
    cipherMap: buildCipherMap(puzzle.solution, puzzle.ciphertext),
    guesses: [],
    solvedLetters: {},
    status: 'playing',
    guessCount: 0,
  }
}

export function makeGuess(state: GameState, cipherLetter: string, guessedPlain: string): GameState {
  const cipher = cipherLetter.toUpperCase()
  const guessed = guessedPlain.toUpperCase()
  const actual = state.cipherMap[cipher]

  let letterState: LetterState

  if (actual === guessed) {
    letterState = 'correct'
  } else if (Object.values(state.cipherMap).includes(guessed)) {
    letterState = 'wrong-position'
  } else {
    letterState = 'not-in-cipher'
  }

  const newGuess: GuessResult = { letter: guessed, state: letterState }

  const newSolved = { ...state.solvedLetters }
  if (letterState === 'correct') {
    newSolved[cipher] = guessed
  }

  const allSolved = Object.keys(state.cipherMap).every(c => newSolved[c] !== undefined)

  return {
    ...state,
    guesses: [...state.guesses, newGuess],
    solvedLetters: newSolved,
    status: allSolved ? 'won' : state.status,
    guessCount: state.guessCount + 1,
  }
}