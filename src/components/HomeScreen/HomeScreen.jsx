import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import {
  DIFFICULTIES, DIFFICULTY_LABELS, DIFFICULTY_COLORS,
  getLevelsByFilter,
} from '../../data/index'

const CATEGORIES = [
  { id: 'algorithms',     label: 'ALGORITHMS',      cmd: 'algo' },
  { id: 'dataStructures', label: 'DATA_STRUCTURES',  cmd: 'ds'   },
]

const DIFF_META = {
  easy:   { rank: '[ RANK-1 ]', color: 'var(--green)',  glow: 'var(--glow-green)'  },
  medium: { rank: '[ RANK-2 ]', color: 'var(--yellow)', glow: 'var(--glow-yellow)' },
  hard:   { rank: '[ RANK-3 ]', color: 'var(--red)',    glow: 'var(--glow-red)'    },
  expert: { rank: '[ RANK-4 ]', color: 'var(--purple)', glow: 'var(--glow-purple)' },
}

function DifficultyCard({ category, difficulty, progress }) {
  const navigate = useNavigate()
  const levels = getLevelsByFilter(category, difficulty)
  const completed = levels.filter(l => progress[l.id]?.completed).length
  const pct = levels.length ? Math.round((completed / levels.length) * 100) : 0
  const meta = DIFF_META[difficulty]

  return (
    <button
      onClick={() => navigate(`/levels/${category}/${difficulty}`)}
      className="group text-left p-6 transition-all duration-150"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid var(--border)`,
        color: meta.color,
        '--focus-color': meta.color,
        '--focus-glow': meta.glow,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = meta.color
        e.currentTarget.style.boxShadow = `0 0 12px ${meta.color}55, inset 0 0 12px ${meta.color}08`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs opacity-60">{meta.rank}</span>
        <span className="font-bold tracking-widest text-sm">
          {DIFFICULTY_LABELS[difficulty].toUpperCase()}
        </span>
      </div>

      <div className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
        <span style={{ color: meta.color }}>{completed}</span>
        <span className="opacity-40"> / {levels.length} modules loaded</span>
      </div>

      {/* ASCII progress bar */}
      <div className="font-mono text-xs flex items-center gap-1">
        <span className="opacity-40">[</span>
        <span style={{ color: meta.color }}>
          {'█'.repeat(Math.round(pct / 10))}
        </span>
        <span style={{ color: 'var(--border)' }}>
          {'░'.repeat(10 - Math.round(pct / 10))}
        </span>
        <span className="opacity-40">]</span>
        <span className="ml-1 opacity-50 text-xs">{pct}%</span>
      </div>

      <div
        className="mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: meta.color }}
      >
        &gt; cd ./{difficulty} _
      </div>
    </button>
  )
}

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('algorithms')
  const [showInstructions, setShowInstructions] = useState(false)
  const { progress } = useProgress()
  const helpRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    const COLS = 2
    function onKeyDown(e) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
      const help = helpRef.current
      const container = mainRef.current
      if (!container) return
      const buttons = Array.from(container.querySelectorAll('button:not([disabled])'))
      const focused = document.activeElement

      if (focused === help) {
        e.preventDefault()
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') buttons[0]?.focus()
        return
      }

      const idx = buttons.indexOf(focused)
      if (idx === -1) return
      e.preventDefault()
      let next = idx
      if (e.key === 'ArrowRight') next = Math.min(idx + 1, buttons.length - 1)
      if (e.key === 'ArrowLeft')  next = Math.max(idx - 1, 0)
      if (e.key === 'ArrowDown')  next = Math.min(idx + COLS, buttons.length - 1)
      if (e.key === 'ArrowUp') {
        if (idx - COLS < 0) { help?.focus(); return }
        next = idx - COLS
      }
      if (next !== idx) buttons[next].focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-6 py-1 text-xs"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <span>CODECLOZE v1.0 // DS&amp;A PATTERN RECOGNITION SYSTEM</span>
        <span className="opacity-50">[ TERMINAL ACTIVE ]</span>
      </div>

      {/* Hero */}
      <header className="flex flex-col items-center px-6 pt-14 pb-10">

        {/* ASCII title box */}
        <div className="relative inline-block mb-8">
          <pre
            className="leading-snug"
            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >{`╔════════════════════════════════════════════════╗
║                                                ║
║                                                ║
║                                                ║
║                                                ║
║                                                ║
╚════════════════════════════════════════════════╝`}</pre>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          >
            <span
              className="tracking-widest"
              style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              // DS&amp;A PATTERN TRAINER
            </span>
            <span
              className="font-bold term-text-glow"
              style={{ fontSize: '2.8rem', color: 'var(--green)', lineHeight: 1 }}
            >
              CODE<span style={{ color: 'var(--cyan)' }}>CLOZE</span>
            </span>
          </div>
        </div>

        <p className="text-sm mb-2 text-center" style={{ color: 'var(--text-secondary)' }}>
          &gt; INITIALIZING PATTERN RECOGNITION TRAINING MODULE...
        </p>
        <p className="text-xs mb-6 text-center" style={{ color: 'var(--text-muted)' }}>
          Fill in blanked code snippets. Earn stars. Master DS&amp;A.
        </p>

        <button
          ref={helpRef}
          onClick={() => setShowInstructions(v => !v)}
          className="text-xs transition-all px-3 py-1"
          style={{
            color: 'var(--cyan)',
            border: '1px solid var(--cyan)',
            background: 'transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan-dim)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          &gt; {showInstructions ? 'CLOSE' : 'HELP'} --instructions
        </button>

        {showInstructions && (
          <div className="flex justify-center mt-4 w-full">
            <div
              className="w-full max-w-lg p-5 text-xs animate-fade-in"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <div className="text-center mb-3" style={{ color: 'var(--green)' }}>HELP --instructions</div>
              {[
                'Select a category (ALGORITHMS or DATA_STRUCTURES)',
                'Choose difficulty rank (1–4)',
                'Fill in the blanked-out parts of the code snippet',
                'Submit with [ EXECUTE ] or Ctrl+Enter',
                'Blanks flash green (correct) or red (wrong)',
                '10 attempts per level — click blurred title for a hint',
                'Earn ★★★ with no hints on the first try',
              ].map((line, i) => (
                <div key={i} className="flex justify-center gap-3 mb-1">
                  <span style={{ color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}.</span>
                  <span className="max-w-xs">{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main panel */}
      <main ref={mainRef} className="flex-1 flex flex-col items-center px-6 pb-16">
        <div className="w-full max-w-2xl">

          {/* Category selector */}
          <div className="mb-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            &gt; SELECT CATEGORY:
          </div>
          <div className="flex justify-center gap-3 mb-8">
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-1 px-6 py-4 text-base font-bold tracking-widest transition-all"
                  style={{
                    background: active ? 'var(--green-dim)' : 'transparent',
                    border: `1px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                    color: active ? 'var(--green)' : 'var(--text-secondary)',
                    boxShadow: active ? 'var(--glow-green)' : 'none',
                  }}
                >
                  {active ? '▶ ' : '  '}{cat.label}
                </button>
              )
            })}
          </div>

          {/* Difficulty grid */}
          <div className="mb-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            &gt; SELECT DIFFICULTY:
          </div>
          <div className="grid grid-cols-2 gap-3">
            {DIFFICULTIES.map(diff => (
              <DifficultyCard
                key={diff}
                category={activeCategory}
                difficulty={diff}
                progress={progress}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3 text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
      >
        CODECLOZE // ALL SYSTEMS OPERATIONAL
        <span className="ml-2 term-cursor" />
      </footer>
    </div>
  )
}
