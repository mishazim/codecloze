import { useEffect, useRef } from 'react'

export function useKeyboardShortcuts(handlers) {
  const ref = useRef(handlers)
  ref.current = handlers

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        ref.current.submit?.()
      }
      if (e.key === 'Escape') {
        ref.current.back?.()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
