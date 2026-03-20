import './ResultScreen.css'
import type { GameState } from '../engine/types'

interface Props {
  gameState: GameState
  onShare: () => void
}

export function ResultScreen({ gameState, onShare }: Props) {
  const won = gameState.status === 'won'

  return (
    <div className="result-screen">
      <div className="result-icon">{won ? '✓' : '✗'}</div>
      <h2 className={`result-title ${won ? 'won' : 'failed'}`}>
        {won ? 'Decoded!' : 'Better luck tomorrow'}
      </h2>

      <div className="result-solution">
        <p className="result-label">Today's message</p>
        <p className="result-text">{gameState.puzzle.solution}</p>
        <p className="result-category">{gameState.puzzle.category}</p>
      </div>

      <div className="result-stats">
        <div className="stat">
          <span className="stat-value">{gameState.guessCount}</span>
          <span className="stat-label">guesses</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {Object.keys(gameState.solvedLetters).length}
          </span>
          <span className="stat-label">letters solved</span>
        </div>
      </div>

      <button className="share-btn" onClick={onShare}>
        Copy result
      </button>
    </div>
  )
}