import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { useScrollProgress } from '../hooks/useScrollProgress'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&'

function ScrambleNavLabel({ text }) {
  const ref = useRef(null)
  const tickerRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (tickerRef.current) gsap.ticker.remove(tickerRef.current)
    let frame = 0
    const totalFrames = 22
    const len = text.length
    const update = () => {
      let out = ''
      for (let i = 0; i < len; i++) {
        out += i < (frame / totalFrames) * len
          ? text[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      el.textContent = out
      if (frame >= totalFrames) { el.textContent = text; gsap.ticker.remove(update) }
      frame++
    }
    tickerRef.current = update
    gsap.ticker.add(update)
  }, [text])

  useEffect(() => () => { if (tickerRef.current) gsap.ticker.remove(tickerRef.current) }, [])

  return <span ref={ref} onMouseEnter={handleMouseEnter}>{text}</span>
}

// ── Set this to a Google Drive /preview URL or direct PDF URL when ready ──
const RESUME_URL = 'https://drive.google.com/file/d/1SL4XeyebJaHurJw7VwlQwwxveJw3N5ei/preview'

const NAV_LINKS = [
  { href: '#hero',     label: 'Home'     },
  { href: '#about',    label: 'About'    },
  { href: '#journey',  label: 'Journey'  },
  { href: '#projects', label: 'Projects' },
  { href: '#certs',    label: 'Certs'    },
  { action: 'resume',  label: 'Resume'   },
  { href: '#contact',  label: 'Contact'  },
]

function ResumeModal({ onClose }) {
  return (
    <motion.div
      key="resume-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.90, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Corner accents */}
        {[
          { top: '10px', left: '10px', borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', width: '16px', height: '16px' },
          { top: '10px', right: '10px', borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', width: '16px', height: '16px' },
          { bottom: '10px', left: '10px', borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', width: '16px', height: '16px' },
          { bottom: '10px', right: '10px', borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', width: '16px', height: '16px' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', pointerEvents: 'none', ...s }} />
        ))}

        {/* Modal header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '3px' }}>
              ABISHEK D — RÉSUMÉ
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {RESUME_URL && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '11px', padding: '8px 18px', textDecoration: 'none', display: 'inline-block' }}
              >
                OPEN ↗
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '8px 18px' }}
            >
              CLOSE
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
          {RESUME_URL ? (
            <iframe
              src={RESUME_URL}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block', minHeight: '70vh' }}
              title="Abishek D — Résumé"
              allow="autoplay"
            />
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '400px', gap: '16px',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '2px solid var(--border-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: '18px', color: 'var(--border-2)',
              }}>
                ☰
              </div>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)',
                letterSpacing: '3px', textAlign: 'center',
              }}>
                RESUME LOADING SOON
              </p>
              <p style={{
                fontFamily: 'var(--body)', fontSize: '13px', color: 'var(--text)',
                textAlign: 'center', maxWidth: '320px', lineHeight: 1.6,
              }}>
                The résumé will be embedded here once the link is configured.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Nav() {
  const { scaleX } = useScrollProgress()
  const [active, setActive] = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    const sections = ['hero', 'about', 'journey', 'projects', 'certs', 'contact']
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { threshold: 0.3 }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (showResume) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [showResume])

  const handleNavClick = (link) => {
    if (link.action === 'resume') {
      setShowResume(true)
      setMenuOpen(false)
    } else {
      setActive(link.href)
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '60px',
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '200px repeat(7, 1fr) 60px',
      }}>
        {/* Scroll progress bar */}
        <motion.div
          style={{
            scaleX, transformOrigin: 'left',
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '1px', background: 'var(--accent)', zIndex: 10,
            opacity: 0.8,
          }}
        />

        {/* Logo */}
        <a
          href="#hero"
          onClick={() => setMenuOpen(false)}
          style={{
            borderRight: '1px solid var(--border)',
            display: 'flex', alignItems: 'center',
            padding: '0 20px', gap: '6px',
            textDecoration: 'none',
          }}
        >
          <div>
            <div style={{
              fontFamily: 'var(--body)',
              fontWeight: 800,
              fontSize: '15px',
              color: 'var(--text-bright)',
              letterSpacing: '-0.3px',
              lineHeight: 1.1,
            }}>
              ABISHEK
            </div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              color: 'var(--text)',
              letterSpacing: '2px',
            }}>
              .DEV — 2026
            </div>
          </div>
          <span className="cursor-blink" style={{ width: '6px', height: '12px' }} />
        </a>

        {/* Nav links (desktop) */}
        {NAV_LINKS.map(link => {
          const isResume = link.action === 'resume'
          const isActive = !isResume && active === link.href
          return (
            <button
              key={isResume ? 'resume' : link.href}
              onClick={() => handleNavClick(link)}
              className={`nav-col${isActive ? ' active' : ''}`}
              style={{
                fontFamily: 'var(--body)',
                fontWeight: 500,
                fontSize: '13px',
                letterSpacing: '0.2px',
                color: isResume
                  ? 'var(--accent)'
                  : isActive ? 'var(--accent)' : 'var(--text)',
                position: 'relative',
                background: 'none',
                border: 'none',
                borderRight: '1px solid var(--border)',
                width: '100%',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '2px',
                    background: 'var(--accent)',
                  }}
                />
              )}
              {isResume && (
                <span style={{
                  position: 'absolute', top: '6px', right: '8px',
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: RESUME_URL ? 'var(--accent)' : 'var(--border-2)',
                }} />
              )}
              {isActive && !isResume ? (
                <motion.span
                  key={`active-${link.label}`}
                  initial={{ opacity: 0, filter: 'blur(6px)', letterSpacing: '4px' }}
                  animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.2px' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ display: 'inline-block' }}
                >
                  <ScrambleNavLabel text={link.label} />
                </motion.span>
              ) : (
                <ScrambleNavLabel text={link.label} />
              )}
            </button>
          )
        })}

        {/* Hamburger (mobile only) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--border)' }}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', flexDirection: 'column', gap: '4px',
              alignItems: 'center', justifyContent: 'center',
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text-2)', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }}
              style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text-2)' }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text-2)', transformOrigin: 'center' }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="nav-drawer"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.action === 'resume' ? 'resume' : link.href}
                className={!link.action && active === link.href ? 'active' : ''}
                onClick={() => handleNavClick(link)}
                style={{
                  padding: '20px 32px',
                  borderBottom: '1px solid var(--border)',
                  fontFamily: 'var(--body)', fontSize: '14px', fontWeight: 500, letterSpacing: '1px',
                  color: link.action === 'resume' ? 'var(--accent)' : 'var(--text)',
                  textDecoration: 'none',
                  transition: 'color 120ms, background 120ms',
                  background: 'none', border: 'none', width: '100%', textAlign: 'left',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                {link.label}
                {link.action === 'resume' && (
                  <span style={{ marginLeft: '8px', color: 'var(--accent)', fontSize: '11px' }}>↗</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume modal */}
      <AnimatePresence>
        {showResume && (
          <ResumeModal onClose={() => setShowResume(false)} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav { grid-template-columns: 1fr auto !important; }
          nav button.nav-col { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
