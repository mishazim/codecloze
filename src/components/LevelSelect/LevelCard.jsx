import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

const COMPLEXITY_MAP = {
  1: 'O(1)', 2: 'O(α(n))', 3: 'O(log n)', 4: 'O(log² n)',
  5: 'O(√n)', 6: 'O(n)', 7: 'O(n log log n)', 8: 'O(n log n)',
  9: 'O(n^2.807)', 10: 'O(n²)', 11: 'O(n² log n)', 12: 'O(n³)',
  13: 'O(VE²)', 14: 'O(2ⁿ)', 15: 'O(n!)',
}

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

function StarDisplay({ count }) {
  return (
    <div className="flex gap-0.5 text-xs">
      {[1, 2, 3].map(n => (
        <span key={n} style={{ color: n <= count ? 'var(--star)' : 'var(--border)', textShadow: n <= count ? '0 0 6px var(--yellow)' : 'none' }}>★</span>
      ))}
    </div>
  )
}

export default function LevelCard({ level }) {
  const navigate = useNavigate()
  const { getLevel } = useProgress()
  const saved = getLevel(level.id)
  const accent = DIFF_ACCENT[level.difficulty]
  const [revealed, setRevealed] = useState(false)
  const nameVisible = saved?.completed || revealed

  return (
    <button
      onClick={() => navigate(`/play/${level.id}`)}
      className="group text-left px-4 py-3 transition-all duration-150 flex flex-col w-full h-full"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${saved?.completed ? accent : 'var(--border)'}`,
        boxShadow: saved?.completed ? `0 0 8px ${accent}44` : 'none',
        '--focus-color': accent,
        '--focus-glow': DIFF_GLOW[level.difficulty],
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent
        e.currentTarget.style.boxShadow = `0 0 12px ${accent}55`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = saved?.completed ? accent : 'var(--border)'
        e.currentTarget.style.boxShadow = saved?.completed ? `0 0 8px ${accent}44` : 'none'
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs opacity-40 shrink-0" style={{ color: accent }}>▶</span>
          <span
            className="font-bold text-xs tracking-wide truncate"
            style={{
              color: accent,
              filter: nameVisible ? 'none' : 'blur(4px)',
              userSelect: nameVisible ? 'auto' : 'none',
              transition: 'filter 0.2s',
            }}
          >
            {level.name.toUpperCase()}
          </span>
        </div>
        {!nameVisible ? (
          <button
            onClick={e => { e.stopPropagation(); setRevealed(true) }}
            className="shrink-0 transition-all"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.05em',
              color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.3)',
              background: 'var(--cyan-dim)',
              padding: '1px 5px',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            [REVEAL]
          </button>
        ) : saved?.completed ? (
          <StarDisplay count={saved.stars} />
        ) : (
          <span className="text-xs" style={{ color: 'var(--border)' }}>[ -- ]</span>
        )}
      </div>

      {/* Description — grows to fill available height */}
      <p
        className="text-xs leading-relaxed line-clamp-2 flex-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        {level.description}
      </p>

      {/* Footer row — always pinned to bottom */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <code
            className="text-xs px-1.5 py-0.5"
            style={{
              color: accent,
              border: `1px solid ${accent}55`,
              background: `${accent}0d`,
            }}
          >
            {COMPLEXITY_MAP[level.complexityRank] ?? '—'}
          </code>
          {saved?.hintUsed && (
            <span style={{ color: 'var(--yellow)', opacity: 0.5, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
              [HINT]
            </span>
          )}
        </div>
        <span
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: accent }}
        >
          LOAD &gt;
        </span>
      </div>
    </button>
  )
}
