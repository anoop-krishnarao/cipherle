import { useState } from 'react'
import { initGameState } from './engine/cipher'
import { puzzles } from './data/puzzles'
import { CipherDisplay } from './components/CipherDisplay'

const initialState = initGameState(puzzles[0])

function App() {
  const [gameState, setGameState] = useState(initialState)
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null)

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
      <p className="guesses">Guesses: {gameState.guessCount}</p>
    </div>
  )
}

export default App