const STATUS_STYLES = {
  idle: {
    border: '1px solid rgba(0,255,65,0.25)',
    background: 'var(--bg-input)',
    color: 'var(--green)',
    boxShadow: 'none',
  },
  correct: {
    border: '1px solid var(--green)',
    background: 'var(--green-dim)',
    color: 'var(--green)',
    boxShadow: 'var(--glow-green)',
    animation: 'correctPulse 0.5s ease both',
  },
  wrong: {
    border: '1px solid var(--red)',
    background: 'var(--red-dim)',
    color: 'var(--red)',
    boxShadow: 'var(--glow-red)',
    animation: 'shake 0.35s ease both',
  },
}

export default function BlankInput({
  id,
  value,
  onChange,
  status = 'idle',
  answer,
  disabled = false,
  onEnter,
  inputRef,
}) {
  const minWidth = Math.max(80, (answer?.length ?? 8) * 9 + 28)

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter?.()
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      className="text-sm rounded-none outline-none inline-block align-baseline transition-all duration-150"
      style={{
        minWidth,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        padding: '1px 6px',
        letterSpacing: '0.02em',
        caretColor: '#ffffff',
        caretShape: 'block',
        ...STATUS_STYLES[status],
      }}
    />
  )
}
