const LANGUAGES = [
  { id: 'python',     label: 'PYTHON' },
  { id: 'javascript', label: 'JS'     },
  { id: 'java',       label: 'JAVA'   },
  { id: 'cpp',        label: 'C++'    },
]

export default function LanguagePicker({ current, available, onChange }) {
  return (
    <div className="flex gap-2 text-xs">
      {LANGUAGES.filter(lang => available?.includes(lang.id)).map(lang => {
        const isActive = current === lang.id
        return (
          <button
            key={lang.id}
            onClick={() => onChange(lang.id)}
            style={{
              fontFamily: 'var(--font-mono)',
              width: '72px',
              textAlign: 'center',
              padding: '2px 0',
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 400,
              background: isActive ? 'var(--cyan-dim)' : 'transparent',
              border: `1px solid ${isActive ? 'var(--cyan)' : 'var(--border)'}`,
              color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
              boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ visibility: isActive ? 'visible' : 'hidden' }}>▶ </span>{lang.label}
          </button>
        )
      })}
    </div>
  )
}
