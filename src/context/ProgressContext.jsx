import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'codecloze_progress'
const LANG_KEY = 'codecloze_lang'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
    } catch {
      return {}
    }
  })

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(LANG_KEY) ?? 'python'
  })

  const saveResult = useCallback((levelId, { stars, hintUsed }) => {
    setProgress(prev => {
      const existing = prev[levelId]
      if (existing && existing.stars >= stars) return prev
      const next = { ...prev, [levelId]: { stars, completed: true, hintUsed } }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const setLanguage = useCallback((lang) => {
    localStorage.setItem(LANG_KEY, lang)
    setLanguageState(lang)
  }, [])

  const getLevel = useCallback((levelId) => progress[levelId] ?? null, [progress])

  return (
    <ProgressContext.Provider value={{ progress, saveResult, getLevel, language, setLanguage }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
