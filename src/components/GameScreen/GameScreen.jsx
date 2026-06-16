import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { LEVELS_BY_ID, ALL_LEVELS } from '../../data/index'
import { useGame } from '../../hooks/useGame'
import { useProgress } from '../../context/ProgressContext'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { maskAlgorithmName } from '../../utils/matching'
import BlurredTitle from './BlurredTitle'
import CodeDisplay from './CodeDisplay'
import AttemptsBar from './AttemptsBar'
import LanguagePicker from './LanguagePicker'
import ResultModal from '../ResultModal/ResultModal'

const DIFF_ACCENT = {
  easy:   'var(--green)',
  medium: 'var(--yellow)',
  hard:   'var(--red)',
  expert: 'var(--purple)',
}

export default function GameScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const level = LEVELS_BY_ID[id]
  const { language, setLanguage, saveResult } = useProgress()

  const nextLevel = useMemo(() => {
    if (!level) return null
    const siblings = ALL_LEVELS.filter(
      l => l.category === level.category && l.difficulty === level.difficulty
    )
    const idx = siblings.findIndex(l => l.id === id)
    return siblings[idx + 1] ?? null
  }, [id, level])

  const availableLanguages = level ? Object.keys(level.snippets) : []
  const activeLang = availableLanguages.includes(language) ? language : availableLanguages[0] ?? 'python'
  const snippet = level?.snippets[activeLang]

  const game = useGame(snippet?.blanks ?? [])

  useEffect(() => {
    game.reset(snippet?.blanks ?? [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLang, id])

  useEffect(() => {
    if (game.finished) {
      saveResult(id, { stars: game.stars, hintUsed: game.hintUsed })
    }
  }, [game.finished, game.stars, game.hintUsed, id, saveResult])

  function handleBack() {
    if (!level) { navigate('/'); return }
    navigate(-1)
  }

  useKeyboardShortcuts({
    submit: () => { if (!game.finished && snippet) game.submit() },
    back: handleBack,
  })

  if (!level) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ fontFamily: 'var(--font-mono)' }}>
        <p style={{ color: 'var(--red)' }}>&gt; ERROR: module not found</p>
        <button
          onClick={() => navigate('/')}
          style={{ color: 'var(--cyan)', border: '1px solid var(--cyan)', padding: '4px 16px', background: 'transparent', fontSize: '0.8rem' }}
        >
          &gt; cd ~/codecloze
        </button>
      </div>
    )
  }

  const accent = DIFF_ACCENT[level.difficulty]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-mono)' }}>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-6 py-1 text-xs"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        <span>CODECLOZE v1.0 // EXECUTION ENVIRONMENT</span>
        <span className="opacity-50">[ {level.difficulty.toUpperCase()} ]</span>
      </div>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      >
        <button
          onClick={handleBack}
          className="text-xs transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          &lt;-- BACK
        </button>

        <BlurredTitle name={level.name} onReveal={game.useHint} />

        <LanguagePicker
          current={activeLang}
          available={availableLanguages}
          onChange={setLanguage}
        />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 py-6">
        <div className="w-full max-w-4xl flex flex-col gap-5">

        {/* Info row */}
        <div className="flex items-start justify-between gap-4">
          <p
            className="text-xs leading-relaxed max-w-xl"
            style={{
              color: 'var(--text-secondary)',
              filter: game.hintUsed ? 'none' : 'blur(4px)',
              userSelect: game.hintUsed ? 'auto' : 'none',
              transition: 'filter 0.3s ease',
            }}
          >
            &gt; {level.description}
          </p>
          <span
            className="text-xs px-2 py-0.5 shrink-0 tracking-widest"
            style={{ color: accent, border: `1px solid ${accent}66`, background: `${accent}10` }}
          >
            {level.difficulty.toUpperCase()}
          </span>
        </div>

        {/* Terminal window chrome */}
        <div style={{ border: '1px solid var(--border)' }}>
          {/* Window title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2 text-xs"
            style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex gap-1.5">
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', boxShadow: '0 0 4px var(--red)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block', boxShadow: '0 0 4px var(--yellow)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 4px var(--green)' }} />
            </div>
            <span style={{ color: 'var(--text-muted)' }}>
              codecloze@terminal: ~/{game.hintUsed ? level.id : '???'}.{activeLang === 'javascript' ? 'js' : activeLang === 'cpp' ? 'cpp' : activeLang === 'java' ? 'java' : 'py'}
            </span>
          </div>

          {/* Code display */}
          {snippet ? (
            <CodeDisplay
              template={game.hintUsed ? snippet.template : maskAlgorithmName(snippet.template, level.id)}
              blanks={snippet.blanks}
              answers={game.answers}
              onAnswer={game.setAnswer}
              feedback={game.feedback}
              disabled={game.finished}
              onSubmit={game.submit}
            />
          ) : (
            <div className="text-xs text-center py-10" style={{ color: 'var(--text-muted)', background: 'var(--bg-surface)' }}>
              &gt; ERROR: no snippet for this language_
            </div>
          )}
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-4">
          <AttemptsBar attemptsUsed={game.attemptsUsed} maxAttempts={game.maxAttempts} />

          <button
            onClick={game.submit}
            disabled={game.finished || game.outOfAttempts || !snippet}
            className="text-xs px-6 py-2 font-bold tracking-widest transition-all"
            style={{
              background: (game.finished || game.outOfAttempts) ? 'transparent' : 'var(--green-dim)',
              border: `1px solid ${(game.finished || game.outOfAttempts) ? 'var(--border)' : 'var(--green)'}`,
              color: (game.finished || game.outOfAttempts) ? 'var(--text-muted)' : 'var(--green)',
              boxShadow: (game.finished || game.outOfAttempts) ? 'none' : 'var(--glow-green)',
              cursor: (game.finished || game.outOfAttempts) ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            &gt; EXECUTE
          </button>
        </div>

        {/* Inline feedback */}
        {game.feedback && !game.finished && !game.outOfAttempts && (
          <div
            className="text-xs px-4 py-2 animate-fade-in"
            style={{
              background: game.allCorrect ? 'var(--green-dim)' : 'var(--red-dim)',
              border: `1px solid ${game.allCorrect ? 'var(--green)' : 'var(--red)'}`,
              color: game.allCorrect ? 'var(--green)' : 'var(--red)',
            }}
          >
            &gt; {game.allCorrect
              ? 'ALL ASSERTIONS PASSED'
              : `${game.feedback.filter(Boolean).length}/${game.feedback.length} ASSERTIONS PASSED — RETRY`}
          </div>
        )}

        {/* Out of attempts prompt */}
        {game.outOfAttempts && !game.finished && (
          <div
            className="text-xs px-6 py-5 animate-fade-in text-center"
            style={{ background: 'var(--red-dim)', border: '1px solid var(--red)', color: 'var(--red)' }}
          >
            <p className="font-bold tracking-widest mb-1">[ MAX ATTEMPTS REACHED ]</p>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              &gt; Would you like the correct answers revealed?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={game.revealAnswers}
                className="px-5 py-2 text-xs font-bold tracking-widest transition-all"
                style={{ background: 'var(--red-dim)', border: '1px solid var(--red)', color: 'var(--red)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.2)'; e.currentTarget.style.boxShadow = 'var(--glow-red)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                REVEAL ANSWERS
              </button>
              <button
                onClick={() => game.reset()}
                className="px-5 py-2 text-xs font-bold tracking-widest transition-all"
                style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                &gt; RETRY
              </button>
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Ctrl+Enter to execute &nbsp;·&nbsp; Esc to go back &nbsp;·&nbsp; Tab to move between blanks
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(`/levels/${level.category}/${level.difficulty}`)}
            className="px-6 py-2 text-xs font-bold tracking-widest transition-all"
            style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            LEVEL SELECT
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-xs font-bold tracking-widest transition-all"
            style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            MAIN MENU
          </button>
        </div>

        </div>
      </main>

      {game.finished && (
        <ResultModal
          stars={game.stars}
          allCorrect={game.allCorrect}
          blanks={snippet?.blanks ?? []}
          answers={game.answers}
          feedback={game.feedback}
          onRetry={() => game.reset()}
          onNext={nextLevel ? () => navigate(`/play/${nextLevel.id}`) : null}
          onBack={handleBack}
        />
      )}
    </div>
  )
}
