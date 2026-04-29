import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const BOOT_LINES = [
  { text: '  ABISHEK_OS — kernel v2026.1', delay: 0 },
  { text: '  ─────────────────────────────────────────', delay: 200 },
  { text: '  [  0.001ms] Initializing CS foundation layer......', suffix: '  OK', delay: 400 },
  { text: '  [  0.042ms] Loading network stack (OSI L1-L7)......', suffix: '  OK', delay: 700 },
  { text: '  [  0.118ms] Mounting cloud services interface.....', suffix: '  OK', delay: 1000 },
  { text: '  [  0.203ms] Starting AI/ML application layer......', suffix: '  OK', delay: 1300 },
  { text: '  [  0.267ms] Verifying AWS Cloud Practitioner cert...', suffix: '  VERIFIED', delay: 1600 },
  { text: '  [  0.301ms] CachyOS kernel detected.................', suffix: '  OK', delay: 1900 },
  { text: '  ─────────────────────────────────────────', delay: 2200 },
  { text: '  System ready. Welcome, VISITOR.', delay: 2500 },
]

function BootLine({ line, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [showSuffix, setShowSuffix] = useState(false)
  const full = line.text

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(interval)
        if (line.suffix) {
          setTimeout(() => { setShowSuffix(true); onComplete?.() }, 100)
        } else {
          onComplete?.()
        }
      }
    }, 18)
    return () => clearInterval(interval)
  }, [])

  const suffixColor = line.suffix === '  VERIFIED' ? '#00ff41' : '#00ff41'

  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', lineHeight: '1.8', color: 'var(--accent)', whiteSpace: 'pre' }}>
      {displayed}
      {showSuffix && (
        <span style={{ color: suffixColor }}>{line.suffix}</span>
      )}
    </div>
  )
}

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(v => Math.max(v, i + 1)), line.delay)
    )
    const finalTimer = setTimeout(() => {
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 400)
      }, 500)
    }, 3200)
    return () => { timers.forEach(clearTimeout); clearTimeout(finalTimer) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, background: 'var(--bg)',
            zIndex: 9999, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '48px',
          }}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <BootLine key={i} line={line} onComplete={i === BOOT_LINES.length - 1 ? undefined : undefined} />
          ))}
          <div style={{ height: '16px' }} />
          {visibleLines >= BOOT_LINES.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text)', marginTop: '8px', paddingLeft: '2px' }}
            >
              &nbsp; press any key or wait...
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
