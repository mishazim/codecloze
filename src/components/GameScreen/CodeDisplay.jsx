import { useRef } from 'react'
import BlankInput from './BlankInput'

export default function CodeDisplay({
  template,
  blanks,
  answers,
  onAnswer,
  feedback,
  disabled,
  onSubmit,
}) {
  const inputRefs = useRef([])
  const parts = template.split(/(\{\{\d+\}\})/)

  const rendered = parts.map((part, i) => {
    const match = part.match(/^\{\{(\d+)\}\}$/)
    if (match) {
      const idx = parseInt(match[1], 10)
      const blank = blanks[idx]
      const status = feedback === null ? 'idle' : feedback[idx] ? 'correct' : 'wrong'
      const ref = el => { inputRefs.current[idx] = el }

      return (
        <BlankInput
          key={`blank-${idx}`}
          id={idx}
          value={answers[idx] ?? ''}
          onChange={val => onAnswer(idx, val)}
          status={status}
          answer={blank?.answer ?? ''}
          disabled={disabled}
          onEnter={() => {
            const next = inputRefs.current[idx + 1]
            if (next) next.focus()
            else onSubmit?.()
          }}
          inputRef={ref}
        />
      )
    }

    return (
      <span
        key={`text-${i}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-bright)',
          whiteSpace: 'pre',
          letterSpacing: '0.02em',
        }}
      >
        {part}
      </span>
    )
  })

  return (
    <pre
      style={{
        background: 'var(--bg-surface)',
        padding: '20px 24px',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        lineHeight: '1.9',
        fontSize: '0.8rem',
      }}
    >
      <code>{rendered}</code>
    </pre>
  )
}
