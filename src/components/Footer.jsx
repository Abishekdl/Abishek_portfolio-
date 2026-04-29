import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

function UptimeCounter() {
  const START = 847 * 86400 + 12 * 3600 + 33 * 60
  const [secs, setSecs] = useState(START)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const d = Math.floor(secs / 86400)
  const h = Math.floor((secs % 86400) / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return (
    <span>
      UP {d}d {String(h).padStart(2,'0')}h {String(m).padStart(2,'0')}m{' '}
      <motion.span key={s} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.1 }} style={{ display: 'inline-block' }}>
        {String(s).padStart(2,'0')}s
      </motion.span>
    </span>
  )
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      display: 'grid',
      gridTemplateColumns: '200px 1fr 1fr 1fr',
      background: 'var(--bg)',
      height: '60px',
    }}>
      <div style={{
        borderRight: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: '14px', color: 'var(--text-bright)', letterSpacing: '-0.2px' }}>ABISHEK.DEV</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '2px' }}>v2026.1</div>
        </div>
      </div>

      <div style={{ borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>
          MCA · VIT VELLORE · AWS:CERTIFIED
        </span>
      </div>

      <div style={{ borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '1px' }}>
          <UptimeCounter />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--border-2)', letterSpacing: '1px' }}>
          BUILT WITH CLAUDE CODE · REACT · MOTION
        </span>
      </div>
    </footer>
  )
}
