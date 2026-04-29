import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useInView } from '../hooks/useInView'
import { containerVariants, itemVariants, slideInRight, viewport } from '../hooks/useAnimationVariants'
import { useTextReveal } from '../hooks/useTextReveal'

function PacketNetwork({ triggered }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const triggerRef = useRef(false)
  const [received, setReceived] = useState(false)

  useEffect(() => { triggerRef.current = triggered }, [triggered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = 180

    const nodes = [
      { x: canvas.width * 0.1, y: 90, label: 'YOU' },
      { x: canvas.width * 0.35, y: 50, label: 'INTERNET' },
      { x: canvas.width * 0.65, y: 50, label: 'SERVER' },
      { x: canvas.width * 0.9, y: 90, label: 'ABISHEK', isTarget: true },
    ]
    const path = [0, 1, 2, 3]
    let packets = []
    let triggeredPacket = null

    const addIdlePacket = () => {
      packets.push({ pathIndex: 0, t: 0, speed: 0.003 + Math.random() * 0.002, opacity: 0.4 })
    }

    let idleTimer = setInterval(addIdlePacket, 1500)
    addIdlePacket()

    let lastTriggered = false

    const draw = () => {
      if (!canvas.width) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
      for (let i = 0; i < path.length - 1; i++) {
        ctx.beginPath(); ctx.moveTo(nodes[path[i]].x, nodes[path[i]].y)
        ctx.lineTo(nodes[path[i + 1]].x, nodes[path[i + 1]].y); ctx.stroke()
      }

      nodes.forEach((n, i) => {
        const isLast = n.isTarget && triggeredPacket?.arrived
        ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = isLast ? '#00ff41' : '#222'; ctx.fill()
        ctx.strokeStyle = isLast ? '#00ff41' : '#333'; ctx.lineWidth = 1; ctx.stroke()
        ctx.fillStyle = isLast ? '#00ff41' : '#555'
        ctx.font = "9px 'JetBrains Mono', monospace"; ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y + 18)
      })

      packets = packets.filter(p => {
        p.t += p.speed
        if (p.t >= 1) { p.pathIndex++; p.t = 0 }
        if (p.pathIndex >= path.length - 1) return false
        const a = nodes[path[p.pathIndex]], b = nodes[path[p.pathIndex + 1]]
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,65,${p.opacity})`; ctx.fill()
        return true
      })

      if (triggerRef.current && !lastTriggered) {
        lastTriggered = true
        triggeredPacket = { pathIndex: 0, t: 0, speed: 0.008, arrived: false, opacity: 1 }
      }

      if (triggeredPacket && !triggeredPacket.arrived) {
        triggeredPacket.t += triggeredPacket.speed
        if (triggeredPacket.t >= 1) { triggeredPacket.pathIndex++; triggeredPacket.t = 0 }
        if (triggeredPacket.pathIndex >= path.length - 1) {
          triggeredPacket.arrived = true
          setReceived(true)
          setTimeout(() => { setReceived(false); triggeredPacket = null; lastTriggered = false }, 3000)
        } else {
          const a = nodes[path[triggeredPacket.pathIndex]], b = nodes[path[triggeredPacket.pathIndex + 1]]
          const px = a.x + (b.x - a.x) * triggeredPacket.t, py = a.y + (b.y - a.y) * triggeredPacket.t
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2)
          ctx.fillStyle = '#00ff41'; ctx.fill()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => { clearInterval(idleTimer); cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', border: '1px solid #1a1a1a', marginBottom: '12px' }} />
      {received && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#00ff41', letterSpacing: '2px', padding: '8px 0' }}
        >
          MESSAGE RECEIVED ✓
        </motion.div>
      )}
    </div>
  )
}

const FILES = [
  { perm: 'drwxr-xr-x', type: 'email', value: 'abishekofficial2003@gmail.com', href: 'mailto:abishekofficial2003@gmail.com' },
  { perm: 'drwxr-xr-x', type: 'linkedin', value: 'linkedin.com/in/abishek-d-27983b249', href: 'https://www.linkedin.com/in/abishek-d-27983b249/' },
  { perm: 'drwxr-xr-x', type: 'github', value: 'github.com/Abishekdl', href: 'https://github.com/Abishekdl' },
  { perm: '-rw-r--r--', type: 'resume', value: 'abishek_resume_2026.pdf', href: '#' },
  { perm: '-rw-r--r--', type: 'cert', value: 'aws_cloud_practitioner.pdf', href: 'https://drive.google.com/file/d/1EKIZRnx-ptcOX-xmOMh815_rEetUjMKO/preview' },
]

export default function Contact() {
  const headingRef = useTextReveal('words')
  const { ref, isInView } = useInView()
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" style={{ background: 'var(--bg)', paddingTop: '40px', paddingBottom: 0, borderBottom: '1px solid var(--border)' }}>
      <div ref={ref} style={{ padding: '0 clamp(24px, 5vw, 80px)', marginBottom: '32px' }}>
        <div className="section-line" />
        <div className="section-label" style={{ marginBottom: '12px' }}>// Contact</div>
        <h2 ref={headingRef} className="section-title">
          Get in Touch
        </h2>
      </div>

      <div style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 0, paddingBottom: 0, paddingTop: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderTop: '1px solid var(--border)' }}>
        {/* Left column — staggered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ padding: '64px 64px 64px 0', borderRight: '1px solid var(--border)' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pulse-dot" />
              <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: '18px', color: 'var(--accent)', letterSpacing: '1px' }}>
                Available
              </span>
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: '15px', color: 'var(--text-2)', fontWeight: '300' }}>
              Open for full-time roles at product/AI companies
            </p>
          </motion.div>

          <motion.div variants={containerVariants} style={{ marginBottom: '32px' }}>
            {FILES.map((f) => (
              <motion.div
                key={f.type}
                variants={itemVariants}
                style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--border-2)' }}>{f.perm}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', width: '60px', flexShrink: 0 }}>{f.type}</span>
                <a
                  href={f.href}
                  style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
                >
                  {f.value}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '2px', marginBottom: '4px' }}>NODE LOCATION</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.8 }}>
              Vellore Institute of Technology<br />
              Tamil Nadu, India<br />
              <span style={{ color: 'var(--text)' }}>Available: Remote / Relocation</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', marginTop: '12px', letterSpacing: '1px' }}>
              AVG RESPONSE TIME: &lt; 24h
            </div>
          </motion.div>
        </motion.div>

        {/* Right column — slides in from right */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
        >
          <div className="visme_d" data-title="Agency Contact Form" data-url="p9nj94mv-agency-contact-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="176683" style={{ width: '100%', height: '100%' }}></div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
