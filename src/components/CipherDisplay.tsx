import './CipherDisplay.css'

interface Props {
  ciphertext: string
  solvedLetters: Record<string, string>
  selectedCipher: string | null
  onSelectLetter: (letter: string) => void
}

export function CipherDisplay({ ciphertext, solvedLetters, selectedCipher, onSelectLetter }: Props) {
  return (
    <div className="cipher-display">
      {ciphertext.split('').map((char, i) => {
        if (char === ' ') return <span key={i} className="cipher-space" />

        const upper = char.toUpperCase()
        const solved = solvedLetters[upper]
        const isSelected = selectedCipher === upper
        const isSolved = solved !== undefined

        return (
          <div
            key={i}
            className={`cipher-cell ${isSolved ? 'solved' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => !isSolved && onSelectLetter(upper)}
          >
            <span className="cipher-plain">{solved ?? '?'}</span>
            <span className="cipher-letter">{upper}</span>
          </div>
        )
      })}
    </div>
  )
}