import { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLevelsByFilter, DIFFICULTIES, DIFFICULTY_LABELS, CATEGORY_LABELS } from '../../data/index'
import { useProgress } from '../../context/ProgressContext'
import LevelCard from './LevelCard'

const DIFF_ACCENT = {
  easy:   'var(--green)',
  medium: 'var(--yellow)',
  hard:   'var(--red)',
  expert: 'var(--purple)',
}

const DIFF_GLOW = {
  easy:   'var(--glow-green)',
  medium: 'var(--glow-yellow)',
  hard:   'var(--glow-red)',
  expert: 'var(--glow-purple)',
}

const CARD_COLS = 2

export default function LevelSelect() {
  const { category, difficulty } = useParams()
  const navigate = useNavigate()
  const { progress } = useProgress()

  const levels = getLevelsByFilter(category, difficulty)
  const completedCount = levels.filter(l => progress[l.id]?.completed).length

  const backRef  = useRef(null)
  const tabsRef  = useRef(null)
  const mainRef  = useRef(null)

  useEffect(() => {
    function onKeyDown(e) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
      const back  = backRef.current
      const tabs  = tabsRef.current ? Array.from(tabsRef.current.querySelectorAll('button'))               : []
      const cards = mainRef.current ? Array.from(mainRef.current.querySelectorAll('button:not([disabled])')) : []
      const focused = document.activeElement
      const tabIdx  = tabs.indexOf(focused)
      const cardIdx = cards.indexOf(focused)

      if (focused === back) {
        e.preventDefault()
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') tabs[0]?.focus()
      } else if (tabIdx !== -1) {
        e.preventDefault()
        if (e.key === 'ArrowLeft')  tabIdx === 0 ? back?.focus() : tabs[tabIdx - 1].focus()
        if (e.key === 'ArrowRight') tabs[Math.min(tabIdx + 1, tabs.length - 1)].focus()
        if (e.key === 'ArrowDown')  cards[0]?.focus()
        if (e.key === 'ArrowUp')    back?.focus()
      } else if (cardIdx !== -1) {
        e.preventDefault()
        if (e.key === 'ArrowRight') cards[Math.min(cardIdx + 1, cards.length - 1)].focus()
        if (e.key === 'ArrowLeft')  cards[Math.max(cardIdx - 1, 0)].focus()
        if (e.key === 'ArrowDown')  cards[Math.min(cardIdx + CARD_COLS, cards.length - 1)].focus()
        if (e.key === 'ArrowUp') {
          if (cardIdx < CARD_COLS) tabs[DIFFICULTIES.indexOf(difficulty)]?.focus()
          else cards[cardIdx - CARD_COLS].focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [difficulty])


  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-6 py-1 text-xs"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <span>CODECLOZE v1.0 // MODULE SELECTOR</span>
        <span className="opacity-50">[ TERMINAL ACTIVE ]</span>
      </div>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      >
        <button
          ref={backRef}
          onClick={() => navigate(-1)}
          className="text-xs transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          &lt;-- BACK
        </button>

        <div className="text-center">
          <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
            ~/codecloze/{CATEGORY_LABELS[category]?.toLowerCase().replace(' ', '_')}/
            <span style={{ color: DIFF_ACCENT[difficulty] }}>{difficulty}</span>
          </div>
          <div className="text-sm font-bold tracking-widest" style={{ color: DIFF_ACCENT[difficulty] }}>
            {CATEGORY_LABELS[category]?.toUpperCase()} — {difficulty.toUpperCase()}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {completedCount}/{levels.length} modules completed
          </div>
        </div>

        {/* Difficulty tabs */}
        <div ref={tabsRef} className="flex gap-2">
          {DIFFICULTIES.map(d => {
            const active = d === difficulty
            const accent = DIFF_ACCENT[d]
            return (
              <button
                key={d}
                onClick={() => navigate(`/levels/${category}/${d}`)}
                className="px-5 py-3 text-sm font-bold tracking-widest transition-all"
                style={{
                  background: active ? `${accent}18` : 'transparent',
                  border: `1px solid ${active ? accent : 'var(--border)'}`,
                  color: active ? accent : 'var(--text-muted)',
                  boxShadow: active ? `0 0 8px ${accent}44` : 'none',
                  '--focus-color': accent,
                  '--focus-glow': DIFF_GLOW[d],
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' } }}
              >
                {active ? '▶ ' : ''}{DIFFICULTY_LABELS[d].toUpperCase()}
              </button>
            )
          })}
        </div>
      </header>

      {/* Grid */}
      <main ref={mainRef} className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        {levels.length === 0 ? (
          <div className="text-center py-20 text-xs" style={{ color: 'var(--text-muted)' }}>
            &gt; ERROR: no modules found in this directory_
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-wrap gap-3 justify-center">
            {levels.map(level => (
              <div key={level.id} style={{ width: '300px', height: '130px', maxWidth: '100%' }}>
                <LevelCard level={level} />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-4 px-10 py-3 text-sm font-bold tracking-widest transition-all"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.boxShadow = 'var(--glow-green)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          &lt;-- MAIN MENU
        </button>

      </main>
    </div>
  )
}
