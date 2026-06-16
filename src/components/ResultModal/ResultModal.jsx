export default function ResultModal({
  stars,
  allCorrect,
  blanks,
  answers,
  feedback,
  onRetry,
  onNext,
  onBack,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-lg animate-modal"
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${allCorrect ? 'var(--green)' : 'var(--red)'}`,
          boxShadow: allCorrect ? 'var(--glow-green)' : 'var(--glow-red)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2 text-xs"
          style={{ background: 'var(--bg-elevated)', borderBottom: `1px solid ${allCorrect ? 'var(--green)' : 'var(--red)'}33` }}
        >
          <span style={{ color: allCorrect ? 'var(--green)' : 'var(--red)' }}>
            {allCorrect ? '[ EXECUTION COMPLETE ]' : '[ EXECUTION FAILED ]'}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>codecloze@terminal</span>
        </div>

        <div className="p-6">
          {/* Stars */}
          <div className="flex justify-center gap-4 mb-5">
            {[1, 2, 3].map((n, i) => (
              <span
                key={n}
                className="text-4xl animate-star-pop"
                style={{
                  color: n <= stars ? 'var(--star)' : 'var(--border)',
                  textShadow: n <= stars ? '0 0 12px var(--yellow), 0 0 30px var(--yellow)' : 'none',
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Status message */}
          <div className="text-center mb-5">
            <p
              className="text-sm font-bold tracking-widest mb-1"
              style={{ color: allCorrect ? 'var(--green)' : 'var(--red)' }}
            >
              {allCorrect ? 'ALL TESTS PASSED' : 'TESTS FAILED'}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {allCorrect
                ? stars === 3
                  ? '// perfect score — no hints required'
                  : '// module completed successfully'
                : '// keep training — pattern recognition takes time'}
            </p>
          </div>

          {/* Correct answers */}
          <div
            className="p-4 mb-5 text-xs"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <p className="tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              &gt; EXPECTED_OUTPUT:
            </p>
            <div className="space-y-2">
              {blanks.map((blank, i) => {
                const isRight = feedback?.[i] ?? false
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: isRight ? 'var(--green)' : 'var(--red)', textShadow: isRight ? '0 0 6px var(--green)' : '0 0 6px var(--red)' }}>
                      {isRight ? '✓' : '✗'}
                    </span>
                    <div className="flex flex-wrap gap-2 items-center min-w-0">
                      <code
                        className="px-2 py-0.5"
                        style={{
                          background: isRight ? 'var(--green-dim)' : 'var(--bg-base)',
                          color: isRight ? 'var(--green)' : 'var(--text-bright)',
                          border: `1px solid ${isRight ? 'var(--green)' : 'var(--border)'}44`,
                        }}
                      >
                        {blank.answer}
                      </code>
                      {!isRight && answers[i] && (
                        <>
                          <span style={{ color: 'var(--text-muted)' }}>// you typed:</span>
                          <code
                            className="px-2 py-0.5"
                            style={{ background: 'var(--red-dim)', color: 'var(--red)', border: '1px solid rgba(255,60,60,0.3)' }}
                          >
                            {answers[i]}
                          </code>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="flex-1 py-2 text-xs tracking-widest transition-all"
              style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              &lt;-- BACK
            </button>
            <button
              onClick={onRetry}
              className="flex-1 py-2 text-xs tracking-widest transition-all"
              style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              &gt; RETRY
            </button>
            {onNext && (
              <button
                onClick={onNext}
                className="flex-1 py-2 text-xs font-bold tracking-widest transition-all"
                style={{
                  background: 'var(--green-dim)',
                  border: '1px solid var(--green)',
                  color: 'var(--green)',
                  boxShadow: 'var(--glow-green)',
                }}
              >
                NEXT &gt;&gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
