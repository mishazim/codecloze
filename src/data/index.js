import { easyAlgorithms } from './algorithms/easy'
import { mediumAlgorithms } from './algorithms/medium'
import { hardAlgorithms } from './algorithms/hard'
import { expertAlgorithms } from './algorithms/expert'
import { easyDataStructures } from './dataStructures/easy'
import { mediumDataStructures } from './dataStructures/medium'
import { hardDataStructures } from './dataStructures/hard'
import { expertDataStructures } from './dataStructures/expert'

export const ALL_LEVELS = [
  ...easyAlgorithms,
  ...mediumAlgorithms,
  ...hardAlgorithms,
  ...expertAlgorithms,
  ...easyDataStructures,
  ...mediumDataStructures,
  ...hardDataStructures,
  ...expertDataStructures,
]

export const LEVELS_BY_ID = Object.fromEntries(ALL_LEVELS.map(l => [l.id, l]))

export const LEVELS_BY_CATEGORY = {
  algorithms: ALL_LEVELS.filter(l => l.category === 'algorithms'),
  dataStructures: ALL_LEVELS.filter(l => l.category === 'dataStructures'),
}

export const LEVELS_BY_DIFFICULTY = {
  easy: ALL_LEVELS.filter(l => l.difficulty === 'easy'),
  medium: ALL_LEVELS.filter(l => l.difficulty === 'medium'),
  hard: ALL_LEVELS.filter(l => l.difficulty === 'hard'),
  expert: ALL_LEVELS.filter(l => l.difficulty === 'expert'),
}

export function getLevelsByFilter(category, difficulty) {
  return ALL_LEVELS.filter(
    l => l.category === category && l.difficulty === difficulty
  )
}

export const DIFFICULTIES = ['easy', 'medium', 'hard', 'expert']
export const CATEGORIES = ['algorithms', 'dataStructures']

export const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
}

export const CATEGORY_LABELS = {
  algorithms: 'Algorithms',
  dataStructures: 'Data Structures',
}

export const DIFFICULTY_COLORS = {
  easy: { bg: '#1a3f1f', border: '#3fb950', text: '#3fb950' },
  medium: { bg: '#3f2f00', border: '#d29922', text: '#d29922' },
  hard: { bg: '#3f1a1a', border: '#f85149', text: '#f85149' },
  expert: { bg: '#1a1a3f', border: '#a371f7', text: '#a371f7' },
}
