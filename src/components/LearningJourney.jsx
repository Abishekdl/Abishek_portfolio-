import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { timelineStops } from '../data/timeline'
import { useTextReveal } from '../hooks/useTextReveal'

export default function LearningJourney() {
  const headingRef = useTextReveal('words')
  const containerRef = useRef(null)
  const last = timelineStops.length - 1
  const [activeCard, setActiveCard] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${last * 100}vw`]
  )

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActiveCard(Math.round(v * last))
  })

  return (
    <>
      {/* Outer section — tall for scroll space */}
      <section
        id="journey"
        ref={containerRef}
        className="journey-section"
        style={{
          height: `${timelineStops.length * 100}vh`,
          position: 'relative',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Sticky viewport */}
        <div
          className="journey-sticky"
          style={{
            position: 'sticky',
            top: '60px',
            height: 'calc(100vh - 60px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '28px clamp(24px, 5vw, 80px) 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <div>
              <div className="section-line" style={{ marginBottom: '8px' }} />
              <div className="section-label" style={{ marginBottom: '4px' }}>// Learning Journey</div>
              <h2 ref={headingRef} className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 54px)' }}>
                The Road So Far
              </h2>
            </div>

            {/* Progress indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '3px',
              }}>
                {String(activeCard + 1).padStart(2, '0')} / {String(timelineStops.length).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {timelineStops.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeCard ? 20 : 6,
                      background: i === activeCard ? 'var(--accent)' : 'var(--border-2)',
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '6px', borderRadius: '3px' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Horizontally scrolling cards strip */}
          <motion.div
            className="journey-cards-strip"
            style={{
              x,
              display: 'flex',
              flex: 1,
            }}
          >
            {timelineStops.map((stop, i) => (
              <div
                key={stop.id}
                className="journey-card"
                style={{
                  width: '100vw',
                  flexShrink: 0,
                  height: '100%',
                  borderRight: i < last ? '1px solid var(--border)' : 'none',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 clamp(40px, 8vw, 120px)',
                  overflow: 'hidden',
                }}
              >
                {/* Large year watermark */}
                <div style={{
                  position: 'absolute',
                  right: '4%', bottom: '-8%',
                  fontFamily: 'var(--body)', fontWeight: 800,
                  fontSize: 'clamp(120px, 20vw, 280px)',
                  color: i === last ? 'var(--accent)' : 'var(--text-bright)',
                  opacity: i === last ? 0.07 : 0.04,
                  lineHeight: 1,
                  letterSpacing: '-10px',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {stop.year}
                </div>

                {/* Vertical accent line */}
                <div style={{
                  position: 'absolute', left: 'clamp(40px, 8vw, 120px)',
                  top: 0, bottom: 0,
                  width: '1px',
                  background: i === last
                    ? 'linear-gradient(to bottom, transparent, var(--accent), transparent)'
                    : 'linear-gradient(to bottom, transparent, var(--border-2), transparent)',
                  opacity: 0.5,
                }} />

                {/* Content */}
                <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1, paddingLeft: '32px' }}>
                  {/* Label row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                      background: i === last ? 'var(--accent)' : 'var(--border-2)',
                      boxShadow: i === last ? '0 0 14px rgba(0,255,204,0.6)' : 'none',
                    }} />
                    <span className="section-label" style={{ letterSpacing: '4px' }}>{stop.label}</span>
                  </div>

                  {/* Year */}
                  <div style={{
                    fontFamily: 'var(--body)', fontWeight: 800,
                    fontSize: 'clamp(52px, 7vw, 88px)',
                    color: i === last ? 'var(--accent)' : 'var(--text-bright)',
                    lineHeight: 0.9, marginBottom: '20px',
                    letterSpacing: '-3px',
                  }}>
                    {stop.year}
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 'clamp(12px, 1.4vw, 17px)',
                    color: 'var(--text-2)',
                    letterSpacing: '3px',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                  }}>
                    {stop.title}
                  </div>

                  {/* Body */}
                  <p style={{
                    fontFamily: 'var(--body)', fontSize: 'clamp(14px, 1.2vw, 16px)',
                    color: 'var(--text)',
                    lineHeight: 1.8, maxWidth: '520px',
                  }}>
                    {stop.body}
                  </p>

                  {/* NOW badge */}
                  {i === last && (
                    <div style={{
                      marginTop: '36px', display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span className="pulse-dot" />
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: '10px',
                        color: 'var(--accent)', letterSpacing: '3px',
                      }}>
                        CURRENT SYSTEM
                      </span>
                    </div>
                  )}
                </div>

                {/* Card index — top right */}
                <div style={{
                  position: 'absolute', top: '24px', right: '32px',
                  fontFamily: 'var(--mono)', fontSize: '10px',
                  color: 'var(--border-2)', letterSpacing: '2px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom progress bar */}
          <motion.div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '2px', background: 'var(--accent)',
            scaleX: scrollYProgress, transformOrigin: 'left',
            opacity: 0.7,
          }} />

          {/* Scroll hint — only visible on first card */}
          <motion.div
            animate={{ opacity: activeCard === 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', bottom: '20px', right: '32px',
              fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)',
              letterSpacing: '3px', display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            SCROLL TO NAVIGATE
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Mobile: vertical fallback via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .journey-section { height: auto !important; }
          .journey-sticky {
            position: relative !important;
            top: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          .journey-cards-strip {
            transform: none !important;
            flex-direction: column !important;
          }
          .journey-card {
            width: 100% !important;
            min-height: 380px !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </>
  )
}
