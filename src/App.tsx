import { useState } from 'react'
import { initGameState, makeGuess } from './engine/cipher'
import { puzzles } from './data/puzzles'
import { CipherDisplay } from './components/CipherDisplay'
import { Keyboard } from './components/Keyboard'
import { ResultScreen } from './components/ResultScreen'

const initialState = initGameState(puzzles[0])

function App() {
  const [gameState, setGameState] = useState(initialState)
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleGuess(plainLetter: string) {
    if (!selectedCipher || gameState.status !== 'playing') return
    const newState = makeGuess(gameState, selectedCipher, plainLetter)
    setGameState(newState)
    if (newState.solvedLetters[selectedCipher]) {
      setSelectedCipher(null)
    }
  }

  function handleShare() {
    const won = gameState.status === 'won'
    const text = [
      `Cipherle #${gameState.puzzle.id}`,
      won ? `Decoded in ${gameState.guessCount} guesses` : 'Not decoded today',
      `Category: ${gameState.puzzle.category}`,
      `cipherle.app`,
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const isOver = gameState.status === 'won' || gameState.status === 'failed'

  return (
    <div className="app">
      <h1>Cipherle</h1>

      {!isOver && (
        <>
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
        </>
      )}

      {isOver && (
        <ResultScreen
          gameState={gameState}
          onShare={() => handleShare()}
        />
      )}

      {copied && <p className="copied-toast">Copied to clipboard!</p>}
    </div>
  )
}

export default App