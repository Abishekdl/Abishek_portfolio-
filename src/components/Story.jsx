import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { timelineStops } from '../data/timeline'

function TerminalVisual() {
  return (
    <div style={{ border: '1px solid var(--border)', padding: '16px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', maxWidth: '280px', background: 'var(--bg-card)' }}>
      <div style={{ color: 'var(--border-2)', marginBottom: '8px' }}>┌─ terminal ─────────────┐</div>
      <div style={{ color: 'var(--accent)', marginBottom: '4px' }}>$ system --init</div>
      <div style={{ color: 'var(--text)' }}>Loading kernel modules...</div>
      <div style={{ color: 'var(--text)' }}>Mounting filesystems...</div>
      <div style={{ color: 'var(--accent)', marginTop: '4px' }}>$ _</div>
      <div style={{ color: 'var(--border-2)', marginTop: '8px' }}>└────────────────────────┘</div>
    </div>
  )
}

function TreeVisual() {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--border-2)', lineHeight: 1.4, maxWidth: '200px' }}>
      <div style={{ color: 'var(--accent)' }}>{'     *'}</div>
      <div style={{ color: 'var(--text-2)' }}>{'    /|\\'}</div>
      <div style={{ color: 'var(--text-2)' }}>{'   / | \\'}</div>
      <div style={{ color: 'var(--text)' }}>{'  /  |  \\'}</div>
      <div style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '11px' }}>{'  DEPLOYED'}</div>
      <div style={{ color: 'var(--border-2)' }}>{'    |||'}</div>
      <div style={{ color: 'var(--text)' }}>{'   /|||'}</div>
    </div>
  )
}

function WaveformVisual() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = 280; canvas.height = 80
    let t = 0

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4ade80'
    const draw = () => {
      ctx.clearRect(0, 0, 280, 80)
      ctx.strokeStyle = accentColor
      ctx.lineWidth = 1.5
      ctx.beginPath()
      if (collapsed) {
        ctx.moveTo(0, 40)
        for (let x = 0; x <= 280; x++) {
          const spike = x > 130 && x < 150 ? Math.sin((x - 130) / 3) * 30 : 0
          ctx.lineTo(x, 40 - spike)
        }
      } else {
        for (let x = 0; x <= 280; x++) {
          const noise = (Math.random() - 0.5) * 4
          const y = 40 + Math.sin(x * 0.05 + t) * 20 + Math.sin(x * 0.12 + t * 1.7) * 10 + noise
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        t += 0.06
      }
      ctx.stroke()
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [collapsed])

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          marginTop: '8px', fontFamily: 'var(--mono)', fontSize: '10px',
          border: '1px solid var(--border-2)', background: 'transparent', color: 'var(--accent)',
          padding: '4px 12px', cursor: 'pointer', letterSpacing: '1px',
        }}
      >
        {collapsed ? 'SUPERPOSE' : 'MEASURE'}
      </button>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', marginTop: '4px', letterSpacing: '2px' }}>
        QUANTUM STATE: {collapsed ? 'COLLAPSED' : 'SUPERPOSITION'}
      </div>
    </div>
  )
}

function CertVisual() {
  return (
    <div style={{
      border: '1px dashed var(--border-2)', padding: '20px 24px', maxWidth: '260px',
      position: 'relative', fontFamily: 'var(--mono)', background: 'var(--accent-dim)',
    }}>
      <div style={{ fontSize: '9px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>CERTIFICATE OF COMPLETION</div>
      <div style={{ fontSize: '14px', color: 'var(--text-bright)', fontWeight: '600', marginBottom: '4px' }}>AWS CLOUD PRACTITIONER</div>
      <div style={{ fontSize: '11px', color: 'var(--text-2)', marginBottom: '12px' }}>Amazon Web Services · Educate</div>
      <div style={{ fontSize: '10px', color: 'var(--text)' }}>Awarded to: Abishek D</div>
      <div style={{ fontSize: '10px', color: 'var(--text)', marginTop: '4px' }}>2024</div>
      <div style={{
        position: 'absolute', bottom: '12px', right: '16px',
        border: '2px solid var(--accent)', width: '28px', height: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '12px', color: 'var(--accent)', transform: 'rotate(-12deg)',
      }}>✓</div>
    </div>
  )
}

function LiveVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', width: '80px', height: '80px', borderRadius: '50%',
          border: '1px solid var(--accent-mid)',
          animation: 'pulse-ring 2s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '56px', height: '56px', borderRadius: '50%',
          border: '1px solid var(--accent)',
          opacity: 0.4,
          animation: 'pulse-ring 2s ease-out infinite 0.4s',
        }} />
        <span className="pulse-dot" style={{ width: '16px', height: '16px' }} />
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '3px' }}>
        ● LIVE IN PRODUCTION
      </div>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const VISUALS = {
  terminal: <TerminalVisual />,
  tree: <TreeVisual />,
  waveform: <WaveformVisual />,
  certificate: <CertVisual />,
  live: <LiveVisual />,
}

function TimelineStop({ stop, index }) {
  return (
    <div style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', padding: '0 10vw', flexShrink: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', width: '100%' }}>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(80px, 12vw, 140px)', color: 'var(--border)', lineHeight: 1, marginBottom: '16px', userSelect: 'none', letterSpacing: '4px' }}>
            {stop.year}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '12px' }}>
            {String(index + 1).padStart(2, '0')} / {String(timelineStops.length).padStart(2, '0')} — {stop.label}
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '32px', color: 'var(--text-bright)', letterSpacing: '2px', marginBottom: '16px' }}>
            {stop.title}
          </div>
          <div style={{ fontFamily: 'var(--body)', fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '380px', fontWeight: '300' }}>
            {stop.body}
          </div>
        </div>
        <div>
          {VISUALS[stop.visual]}
        </div>
      </div>
    </div>
  )
}

export default function Story() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(timelineStops.length - 1) * 100}vw`])
  const [activeStop, setActiveStop] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => {
      const idx = Math.round(v * (timelineStops.length - 1))
      setActiveStop(Math.min(Math.max(idx, 0), timelineStops.length - 1))
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <section ref={containerRef} id="story" style={{ height: `${timelineStops.length * 120}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ position: 'absolute', top: '20px', left: '48px', zIndex: 10 }}>
          <div className="section-label" style={{ marginBottom: '4px' }}>// abishek.log — journey timeline</div>
        </div>

        <motion.div style={{ display: 'flex', x, height: '100%' }}>
          {timelineStops.map((stop, i) => (
            <TimelineStop key={stop.id} stop={stop} index={i} />
          ))}
        </motion.div>

        <div style={{ position: 'absolute', bottom: '32px', left: '48px', right: '48px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '1px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, borderTop: '1px dashed var(--border)' }} />
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: `${(activeStop / (timelineStops.length - 1)) * 100}%`,
              height: '1px', background: 'var(--accent)',
              transition: 'width 0.3s ease',
            }} />
            {timelineStops.map((_, i) => (
              <div key={i} style={{
                position: 'absolute', top: '-4px',
                left: `${(i / (timelineStops.length - 1)) * 100}%`,
                width: '8px', height: '8px', borderRadius: '50%',
                border: `1px solid ${i <= activeStop ? 'var(--accent)' : 'var(--border)'}`,
                background: i === activeStop ? 'var(--accent)' : 'transparent',
                transform: 'translateX(-4px)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', left: '48px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)' }}>
          TIMELINE: {String(activeStop + 1).padStart(2, '0')}/{String(timelineStops.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}
