import { useState } from 'react'
import { initGameState, makeGuess } from './engine/cipher'
import { puzzles } from './data/puzzles'
import { CipherDisplay } from './components/CipherDisplay'
import { Keyboard } from './components/Keyboard'

const initialState = initGameState(puzzles[0])

function App() {
  const [gameState, setGameState] = useState(initialState)
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null)

  function handleGuess(plainLetter: string) {
    if (!selectedCipher || gameState.status !== 'playing') return
    const newState = makeGuess(gameState, selectedCipher, plainLetter)
    setGameState(newState)
    if (newState.solvedLetters[selectedCipher]) {
      setSelectedCipher(null)
    }
  }

  return (
    <div className="app">
      <h1>Cipherle</h1>
      <p className="hint">Hint: {gameState.puzzle.hint}</p>
      <CipherDisplay
        ciphertext={gameState.puzzle.ciphertext}
        solvedLetters={gameState.solvedLetters}
        selectedCipher={selectedCipher}
        onSelectLetter={setSelectedCipher}
      />
      <Keyboard
        guesses={gameState.guesses}
        onGuess={handleGuess}
        selectedCipher={selectedCipher}
      />
      <p className="guesses">Guesses: {gameState.guessCount}</p>
    </div>
  )
}

export default App