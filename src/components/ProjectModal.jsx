import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const OS_BOOT_LINES = [
  'BIOS v2.6.8 — Abishek System',
  'Initializing hardware components...',
  'Loading kernel modules... OK',
  'Mounting filesystems... OK',
  'Starting network services... OK',
  'Launching window manager...',
  '> AbishekOS Desktop loaded',
  '> React 18 · TypeScript · Zustand',
  'SYSTEM READY ✓',
]

function OSBootSim() {
  const [lines, setLines] = useState([])
  useEffect(() => {
    let i = 0
    setLines([])
    const id = setInterval(() => {
      if (i < OS_BOOT_LINES.length) {
        setLines(l => [...l, OS_BOOT_LINES[i]])
        i++
      } else {
        clearInterval(id)
      }
    }, 350)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: '#000', border: '1px solid var(--border)', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', minHeight: '280px', borderRadius: '4px' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px', marginBottom: '16px' }}>OS BOOT SEQUENCE</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: line.startsWith('>') ? 'var(--accent)' : line.includes('OK') ? '#4ade80' : line.includes('✓') ? 'var(--accent)' : 'var(--text-2)' }}>
            {line}
          </motion.div>
        ))}
        {lines.length === OS_BOOT_LINES.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '2px' }}>DESKTOP RUNNING</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function FruitDetectionSim() {
  const boxes = [
    { label: 'Apple',  conf: '94.2%', x: 10, y: 15, w: 28, h: 35 },
    { label: 'Mango',  conf: '87.1%', x: 42, y: 10, w: 25, h: 38 },
    { label: 'Banana', conf: '91.8%', x: 72, y: 20, w: 22, h: 30 },
  ]
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>DETECTION OUTPUT</div>
      <div style={{ position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', flex: 1, overflow: 'hidden', minHeight: '200px' }}>
        {boxes.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3, duration: 0.4 }}
            style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, border: '1px solid var(--accent)' }}>
            <div style={{ position: 'absolute', top: '-18px', left: 0, fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--accent)', background: 'var(--bg)', padding: '1px 4px', whiteSpace: 'nowrap' }}>
              {b.label} {b.conf}
            </div>
          </motion.div>
        ))}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(transparent, var(--accent-mid), transparent)', animation: 'scan-line 2s linear infinite' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {boxes.map(b => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', width: '50px' }}>{b.label}</span>
            <div style={{ flex: 1, background: 'var(--border)', height: '3px' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: b.conf }} transition={{ delay: 0.5, duration: 0.8 }} style={{ height: '100%', background: 'var(--accent)' }} />
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)', width: '36px' }}>{b.conf}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuantumSim() {
  const canvasRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  const animRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth; canvas.height = 120
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5; ctx.beginPath()
      const W = canvas.width
      if (collapsed) {
        ctx.moveTo(0, 60)
        for (let x = 0; x <= W; x++) {
          const spike = x > W * 0.45 && x < W * 0.55 ? Math.sin((x - W * 0.45) / (W * 0.05) * Math.PI) * 45 : 0
          ctx.lineTo(x, 60 - spike)
        }
      } else {
        for (let x = 0; x <= W; x++) {
          const y = 60 + Math.sin(x * 0.04 + t) * 22 + Math.sin(x * 0.1 + t * 1.5) * 12 + (Math.random() - 0.5) * 3
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        t += 0.08
      }
      ctx.stroke()
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [collapsed])
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>QUANTUM WAVEFUNCTION</div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', border: '1px solid var(--border)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => setCollapsed(c => !c)}
          style={{ fontFamily: 'var(--mono)', fontSize: '10px', border: '1px solid var(--border-2)', background: 'transparent', color: 'var(--accent)', padding: '6px 14px', cursor: 'pointer', letterSpacing: '1px' }}>
          {collapsed ? 'SUPERPOSE' : 'MEASURE'}
        </button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>
          STATE: {collapsed ? 'COLLAPSED' : 'SUPERPOSITION'}
        </span>
      </div>
    </div>
  )
}

function GardenSim() {
  const [data, setData] = useState({ temp: 28.4, humidity: 67, soil: 'OPTIMAL', status: 'HEALTHY' })
  useEffect(() => {
    const id = setInterval(() => {
      setData(d => ({
        temp: +(d.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        humidity: Math.min(99, Math.max(1, Math.round(d.humidity + (Math.random() - 0.5) * 1))),
        soil: 'OPTIMAL', status: 'HEALTHY',
      }))
    }, 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>IoT DASHBOARD — LIVE</div>
      {[
        { label: 'TEMP',     value: `${data.temp}°C`, color: 'var(--text-bright)' },
        { label: 'HUMIDITY', value: `${data.humidity}%`, color: 'var(--text-bright)' },
        { label: 'SOIL',     value: data.soil, color: 'var(--accent)' },
        { label: 'STATUS',   value: data.status, color: 'var(--accent)', dot: true },
      ].map(item => (
        <div key={item.label} style={{ border: '1px solid var(--border)', padding: '12px', background: 'var(--bg-card)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '18px', color: item.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {item.dot && <span className="pulse-dot" style={{ width: '8px', height: '8px' }} />}
            <motion.span key={item.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{item.value}</motion.span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ThreatSim() {
  const [threatLevel, setThreatLevel] = useState(42)
  const [logs, setLogs] = useState([
    '[14:23:01] Suspicious packet detected — 192.168.1.44',
    '[14:23:04] Rate limit triggered — API endpoint',
    '[14:23:09] Alert resolved — false positive',
  ])
  useEffect(() => {
    const id = setInterval(() => {
      setThreatLevel(l => Math.min(99, Math.max(5, l + Math.round((Math.random() - 0.5) * 8))))
      const now = new Date()
      const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      const events = [
        `[${t}] Packet scan from 10.0.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        `[${t}] Auth attempt blocked — /api/admin`,
        `[${t}] Rate limit triggered — /api/detect`,
        `[${t}] Threat resolved — false positive`,
      ]
      setLogs(l => [...l.slice(-5), events[Math.floor(Math.random() * events.length)]])
    }, 2500)
    return () => clearInterval(id)
  }, [])
  const barColor = threatLevel > 70 ? '#f87171' : threatLevel > 40 ? '#fbbf24' : 'var(--accent)'
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '2px' }}>THREAT MONITOR</span>
        <span className="badge-live" style={{ fontSize: '9px' }}><span className="pulse-dot" style={{ width: '6px', height: '6px' }} />LIVE</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-2)', marginBottom: '6px' }}>THREAT LEVEL: {threatLevel}%</div>
        <div style={{ background: 'var(--border)', height: '6px' }}>
          <motion.div animate={{ width: `${threatLevel}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', background: barColor }} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '8px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '2px', marginBottom: '6px' }}>EVENT LOG</div>
        {logs.map((log, i) => (
          <motion.div key={`${i}-${log}`} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', padding: '2px 0', borderBottom: '1px solid var(--border)' }}>
            {log}
          </motion.div>
        ))}
      </div>
      <a href="https://ai-threat-monitor.vercel.app" target="_blank" rel="noopener noreferrer"
        style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '1px' }}>
        VIEW LIVE DEPLOYMENT →
      </a>
    </div>
  )
}

const SIMS = { 1: OSBootSim, 2: FruitDetectionSim, 3: ThreatSim, 4: GardenSim }

export default function ProjectModal({ project, onClose }) {
  const Sim = SIMS[project.id]

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 200, overflow: 'auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        layoutId={`project-${project.id}`}
        style={{
          width: '100%', maxWidth: '1200px', minHeight: '100vh',
          background: 'var(--bg)', padding: '48px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '3px' }}>
            {project.num} / {project.category}
          </span>
          <button onClick={onClose}
            style={{ fontFamily: 'var(--mono)', fontSize: '12px', border: '1px solid var(--border-2)', background: 'transparent', color: 'var(--text-2)', padding: '6px 14px', cursor: 'pointer', letterSpacing: '2px', transition: 'all 150ms' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border-2)'; e.target.style.color = 'var(--text-2)' }}
          >
            ESC ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--body)', fontWeight: 800, fontSize: '38px', color: 'var(--text-bright)', letterSpacing: '-0.5px', marginBottom: '32px', lineHeight: 1.1 }}>
              {project.title}
            </h2>

            {[
              { label: 'THE PROBLEM',  content: project.problem  },
              { label: 'THE APPROACH', content: project.approach },
              { label: 'THE RESULT',   content: project.result   },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>{s.label}</div>
                <p style={{ fontFamily: 'var(--body)', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, fontWeight: '300' }}>{s.content}</p>
              </div>
            ))}

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>TECH STACK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.techDetail.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {project.codeUrl && (
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div style={{ minHeight: '400px' }}>
            {Sim && <Sim />}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scan-line {
          0%   { top: 0; }
          100% { top: 100%; }
        }
        @media (max-width: 768px) {
          div[style*='grid-template-columns: 1fr 1fr'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
