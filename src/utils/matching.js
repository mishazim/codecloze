export function normalizedMatch(userAnswer, correctAnswer) {
  const normalize = s => s.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalize(userAnswer) === normalize(correctAnswer)
}

export function scoreAttempt(blanks, userAnswers) {
  return blanks.map((blank, i) => normalizedMatch(userAnswers[i] ?? '', blank.answer))
}

// Derive all likely name variants from a level id (e.g. "binary-search")
// and replace them in the template so the algorithm name isn't revealed.
export function maskAlgorithmName(template, levelId) {
  const snake  = levelId.replace(/-/g, '_')                                        // binary_search
  const camel  = levelId.replace(/-([a-z])/g, (_, c) => c.toUpperCase())           // binarySearch
  const pascal = camel[0].toUpperCase() + camel.slice(1)                            // BinarySearch
  const upper  = snake.toUpperCase()                                                // BINARY_SEARCH

  const variants = [...new Set([snake, camel, pascal, upper])]
  let result = template
  for (const name of variants) {
    result = result.replace(new RegExp(`\\b${name}\\b`, 'g'), '???')
  }
  return result
}
