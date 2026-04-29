import { useState, useRef, lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects } from '../data/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useTextReveal } from '../hooks/useTextReveal'

gsap.registerPlugin(ScrollTrigger)

const ProjectModal = lazy(() => import('./ProjectModal'))

function Badge({ type, label }) {
  const cls = { live: 'badge-live', ai: 'badge-ai', edge: 'badge-edge', iot: 'badge-iot' }[type]
  return (
    <span className={cls}>
      {type === 'live' && <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />}
      {label.replace('● ', '').replace('◈ ', '').replace('⬡ ', '').replace('◎ ', '')}
    </span>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const headingRef = useTextReveal('words')

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = cardRefs.current.filter(Boolean)

    // Initial hidden state
    gsap.set(cards, { opacity: 0, y: 60 })

    // Reveal each card on scroll
    cards.forEach(card => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        },
      })
    })

    // Expand/collapse detail on scroll — height animation (no layout thrash)
    cards.forEach(card => {
      const detail = card.querySelector('.project-detail')
      if (!detail) return

      let isExpanded = false

      ScrollTrigger.create({
        trigger: card,
        start: 'top 52%',
        end: 'top 8%',
        onEnter: () => {
          if (isExpanded) return
          isExpanded = true
          card.classList.add('expanded')
          detail.style.display = 'block'
          detail.style.overflow = 'hidden'
          gsap.fromTo(detail,
            { height: 0, opacity: 0 },
            {
              height: 'auto',
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              clearProps: 'overflow',
              onComplete: () => {
                gsap.from(detail.querySelectorAll('.detail-row'), {
                  opacity: 0, y: 14, stagger: 0.07, duration: 0.35, ease: 'power2.out',
                })
              },
            }
          )
        },
        onLeaveBack: () => {
          if (!isExpanded) return
          isExpanded = false
          detail.style.overflow = 'hidden'
          gsap.to(detail, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              detail.style.display = 'none'
              card.classList.remove('expanded')
            },
          })
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="projects" ref={sectionRef} style={{ background: 'var(--bg)', paddingTop: '100px', borderBottom: '1px solid var(--border)', position: 'relative' }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1400px', margin: '0 auto 40px' }}>
        <div className="section-line" />
        <div className="section-label" style={{ marginBottom: '12px' }}>// Lab — Deployed Systems</div>
        <h2 ref={headingRef} className="section-title">Projects</h2>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text)', marginTop: '8px' }}>
          4 systems built · 1 in production · scroll to reveal
        </p>
      </div>

      {/* Vertical stack — 1px gaps between cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', position: 'relative' }}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={el => cardRefs.current[i] = el}
            className="project-card"
            style={{
              background: 'var(--bg)',
              padding: '48px clamp(24px, 5vw, 80px)',
              position: 'relative',
              borderLeft: '2px solid var(--border-2)',
            }}
          >
            {/* Preview — always visible */}
            <div className="project-preview">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--border-2)' }}>{project.num}</span>
                <Badge type={project.badge} label={project.badgeLabel} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '10px' }}>
                {project.category}
              </div>
              <h3 style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 'clamp(20px, 2.8vw, 30px)', color: 'var(--text-bright)', marginBottom: '12px', lineHeight: 1.2 }}>
                {project.title}
              </h3>
              <p style={{ fontFamily: 'var(--body)', fontSize: '15px', color: 'var(--text-2)', marginBottom: '20px', lineHeight: 1.6, maxWidth: '720px', fontWeight: 400 }}>
                {project.impact}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--border-2)', letterSpacing: '2px', display: 'flex', gap: '12px' }}>
                <span>SCROLL ↓ TO EXPAND</span>
                <span>·</span>
                <span>CLICK TO OPEN</span>
              </div>
            </div>

            {/* Detail — hidden by default, revealed by FLIP on scroll */}
            <div
              className="project-detail"
              style={{ display: 'none', marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}
            >
              <div className="detail-row" style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>
                  PROBLEM
                </div>
                <p style={{ fontFamily: 'var(--body)', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '720px', fontWeight: 400 }}>
                  {project.problem}
                </p>
              </div>
              <div className="detail-row" style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>
                  APPROACH
                </div>
                <p style={{ fontFamily: 'var(--body)', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '720px', fontWeight: 400 }}>
                  {project.approach}
                </p>
              </div>
              <div className="detail-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {project.techDetail.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="detail-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '12px', padding: '8px 20px', textDecoration: 'none', display: 'inline-block' }}
                  >
                    VIEW CODE ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: '12px', padding: '8px 20px', textDecoration: 'none', display: 'inline-block' }}
                  >
                    LIVE DEMO ↗
                  </a>
                )}
                <button
                  onClick={() => setSelected(project)}
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '8px 20px' }}
                >
                  FULL DETAILS →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </Suspense>

      <style>{`
        .project-card { cursor: pointer; }
        .project-card:hover { border-left-color: var(--accent) !important; background: var(--bg-card) !important; }
        .project-card.expanded { border-left-color: var(--accent) !important; }
        @media (max-width: 768px) {
          .project-card { padding: 32px 20px !important; }
        }
      `}</style>
    </section>
  )
}
