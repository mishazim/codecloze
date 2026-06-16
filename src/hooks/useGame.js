import { useState, useCallback } from 'react'
import { scoreAttempt } from '../utils/matching'

const MAX_ATTEMPTS = 10

export function useGame(blanks) {
  const [answers, setAnswers] = useState(() => blanks.map(() => ''))
  const [feedback, setFeedback] = useState(null)   // null | boolean[]
  const [attemptsUsed, setAttemptsUsed] = useState(0)
  const [hintUsed, setHintUsed] = useState(false)
  const [finished, setFinished] = useState(false)
  const [outOfAttempts, setOutOfAttempts] = useState(false)
  const [shaking, setShaking] = useState([])

  const setAnswer = useCallback((index, value) => {
    setAnswers(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }, [])

  const useHint = useCallback(() => setHintUsed(true), [])

  const submit = useCallback(() => {
    const results = scoreAttempt(blanks, answers)
    const allCorrect = results.every(Boolean)
    const nextAttempts = attemptsUsed + 1

    setFeedback(results)
    setAttemptsUsed(nextAttempts)

    const wrongIndices = results.map((ok, i) => ok ? null : i).filter(i => i !== null)
    if (!allCorrect && wrongIndices.length) {
      setShaking(wrongIndices)
      setTimeout(() => setShaking([]), 400)
    }

    if (allCorrect) {
      setFinished(true)
    } else if (nextAttempts >= MAX_ATTEMPTS) {
      setOutOfAttempts(true)
    }
  }, [blanks, answers, attemptsUsed])

  const revealAnswers = useCallback(() => {
    setFinished(true)
  }, [])

  const computeStars = useCallback(() => {
    if (!feedback) return 0
    const allCorrect = feedback.every(Boolean)
    if (!allCorrect) return 0
    if (attemptsUsed === 1 && !hintUsed) return 3
    if (attemptsUsed <= 3 && !hintUsed) return 2
    return 1
  }, [feedback, attemptsUsed, hintUsed])

  const reset = useCallback((newBlanks) => {
    const b = newBlanks ?? blanks
    setAnswers(b.map(() => ''))
    setFeedback(null)
    setAttemptsUsed(0)
    setHintUsed(false)
    setFinished(false)
    setOutOfAttempts(false)
    setShaking([])
  }, [blanks])

  return {
    answers, setAnswer,
    feedback, attemptsUsed, attemptsLeft: MAX_ATTEMPTS - attemptsUsed,
    hintUsed, useHint,
    submit, finished, outOfAttempts, revealAnswers, shaking,
    stars: computeStars(),
    allCorrect: feedback ? feedback.every(Boolean) : false,
    reset,
    maxAttempts: MAX_ATTEMPTS,
  }
}
