import type { Puzzle } from '../engine/types'

export const puzzles: Puzzle[] = [
  {
    id: 1,
    date: '2026-03-20',
    ciphertext: 'GUR DHVPX OEBJA QBT WHZCF BIRE GUR YNML SBK',
    solution:   'THE QUICK BROWN DOG JUMPS OVER THE LAZY FOX',
    hint: 'A classic pangram',
    category: 'Phrases',
  },
  {
    id: 2,
    date: '2026-03-21',
    ciphertext: 'GB OR BE ABG GB OR GUNG VF GUR DHRFGVBA',
    solution:   'TO BE OR NOT TO BE THAT IS THE QUESTION',
    hint: 'Shakespeare',
    category: 'Literature',
  },
]