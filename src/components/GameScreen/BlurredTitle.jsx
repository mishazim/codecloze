import { useState } from 'react'

export default function BlurredTitle({ name, onReveal }) {
  const [revealed, setRevealed] = useState(false)

  function handleClick() {
    if (!revealed) {
      setRevealed(true)
      onReveal?.()
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>MODULE:</span>
      <button
        onClick={handleClick}
        title={revealed ? name : 'Click to reveal (uses hint)'}
        style={{
          filter: revealed ? 'none' : 'blur(5px)',
          transition: 'filter 0.3s ease',
          cursor: revealed ? 'default' : 'pointer',
          userSelect: revealed ? 'text' : 'none',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'var(--cyan)',
          textShadow: revealed ? '0 0 10px var(--cyan)' : 'none',
          background: 'transparent',
          border: 'none',
          padding: 0,
          letterSpacing: '0.08em',
        }}
      >
        {name.toUpperCase()}
      </button>
      {!revealed && (
        <span
          className="text-xs px-1.5 py-0.5 cursor-pointer"
          style={{ color: 'var(--yellow)', border: '1px solid rgba(255,215,0,0.4)', opacity: 0.8 }}
          onClick={handleClick}
        >
          --hint
        </span>
      )}
      {revealed && (
        <span className="text-xs" style={{ color: 'var(--yellow)', opacity: 0.5 }}>[HINT_USED]</span>
      )}
    </div>
  )
}
