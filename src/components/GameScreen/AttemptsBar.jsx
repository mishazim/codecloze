export default function AttemptsBar({ attemptsUsed, maxAttempts }) {
  const remaining = maxAttempts - attemptsUsed
  const pct = attemptsUsed / maxAttempts
  const filled = Math.round(pct * 10)
  const empty = 10 - filled
  const color = remaining <= 3 ? 'var(--red)' : remaining <= 6 ? 'var(--yellow)' : 'var(--green)'

  return (
    <div className="flex items-center gap-3 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: 'var(--text-muted)' }}>ATTEMPTS:</span>
      <span style={{ color: 'var(--text-secondary)' }}>[</span>
      <span style={{ color, letterSpacing: '-1px' }}>{'█'.repeat(filled)}</span>
      <span style={{ color: 'var(--border)', letterSpacing: '-1px', marginLeft: filled ? 0 : undefined }}>{'░'.repeat(empty)}</span>
      <span style={{ color: 'var(--text-secondary)' }}>]</span>
      <span style={{ color }}>
        {remaining}/{maxAttempts}
      </span>
    </div>
  )
}
