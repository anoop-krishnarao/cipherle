import './Keyboard.css'
import type { GuessResult } from '../engine/types'

interface Props {
  guesses: GuessResult[]
  onGuess: (letter: string) => void
  selectedCipher: string | null
}

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
]

export function Keyboard({ guesses, onGuess, selectedCipher }: Props) {
  const letterStates: Record<string, string> = {}
  guesses.forEach(g => {
    if (!letterStates[g.letter] || g.state === 'correct') {
      letterStates[g.letter] = g.state
    }
  })

  return (
    <div className="keyboard">
      {!selectedCipher && (
        <p className="keyboard-prompt">Select a cipher letter above to guess</p>
      )}
      {selectedCipher && (
        <p className="keyboard-prompt">
          Guessing for: <span className="keyboard-target">{selectedCipher}</span>
        </p>
      )}
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map(letter => {
            const state = letterStates[letter]
            return (
              <button
                key={letter}
                className={`key ${state ?? ''}`}
                onClick={() => selectedCipher && onGuess(letter)}
                disabled={!selectedCipher}
              >
                {letter}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}