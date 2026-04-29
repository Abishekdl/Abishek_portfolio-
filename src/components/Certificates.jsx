import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { certificates } from '../data/certificates'
import {
  containerVariants, itemVariants, slideInLeft, viewport,
} from '../hooks/useAnimationVariants'
import { useTextReveal } from '../hooks/useTextReveal'

const TYPE_LABELS = {
  award:    { label: 'AWARD',    cls: 'badge-award' },
  cert:     { label: 'CERT',     cls: 'badge-cert'  },
  workshop: { label: 'WORKSHOP', cls: 'badge-workshop' },
}

function CertModal({ cert, onClose }) {
  const { label, cls } = TYPE_LABELS[cert.type]
  return (
    <motion.div
      key="cert-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        layoutId={`cert-${cert.id}`}
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          maxWidth: '560px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Certificate decorative border */}
        <div style={{
          position: 'absolute', inset: '10px',
          border: '1px solid rgba(0,255,204,0.12)',
          pointerEvents: 'none',
        }} />

        {/* Corner accents */}
        {[
          { top: '10px', left: '10px', borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', width: '16px', height: '16px' },
          { top: '10px', right: '10px', borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', width: '16px', height: '16px' },
          { bottom: '10px', left: '10px', borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', width: '16px', height: '16px' },
          { bottom: '10px', right: '10px', borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', width: '16px', height: '16px' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', pointerEvents: 'none', ...s }} />
        ))}

        <div style={{ padding: '48px 48px 40px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--border-2)' }}>{cert.num}</span>
            <span className={cls}>{label}</span>
          </div>

          {/* Issuer seal placeholder */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              border: '2px solid var(--accent)', margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--accent)',
              letterSpacing: '1px',
            }}>
              SEAL
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '3px' }}>
              CERTIFICATE OF {cert.type === 'award' ? 'ACHIEVEMENT' : cert.type === 'cert' ? 'COMPLETION' : 'PARTICIPATION'}
            </div>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--body)', fontWeight: 800, fontSize: '28px',
            color: 'var(--text-bright)', textAlign: 'center',
            lineHeight: 1.2, marginBottom: '10px',
          }}>
            {cert.title}
          </h2>

          {/* Issuer + year */}
          <div style={{
            textAlign: 'center',
            fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)',
            letterSpacing: '2px', marginBottom: '28px',
          }}>
            {cert.issuer} · {cert.year}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginBottom: '24px' }} />

          {/* Description */}
          <p style={{
            fontFamily: 'var(--body)', fontSize: '14px', color: 'var(--text-2)',
            lineHeight: 1.7, textAlign: 'center', fontWeight: 400, marginBottom: cert.link ? '24px' : '32px',
          }}>
            {cert.description}
          </p>

          {/* Embedded certificate viewer */}
          {cert.link && (
            <div style={{
              marginBottom: '24px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              borderRadius: '2px',
              background: 'var(--bg)',
            }}>
              <iframe
                src={cert.link}
                style={{ width: '100%', height: '360px', border: 'none', display: 'block' }}
                title={`${cert.title} Certificate`}
                allow="autoplay"
              />
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '12px', padding: '10px 24px', textDecoration: 'none', display: 'inline-block' }}
              >
                VERIFY ↗
              </a>
            ) : (
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '11px',
                color: 'var(--border-2)', letterSpacing: '2px',
                alignSelf: 'center',
              }}>
                — ON FILE
              </span>
            )}
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '10px 24px' }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CertCard({ cert, onClick }) {
  const [unrolling, setUnrolling] = useState(false)
  const { label, cls } = TYPE_LABELS[cert.type]

  const handleClick = () => {
    if (unrolling) return
    setUnrolling(true)
    setTimeout(() => {
      setUnrolling(false)
      onClick(cert)
    }, 420)
  }

  return (
    <motion.div
      layoutId={`cert-${cert.id}`}
      variants={itemVariants}
      onClick={handleClick}
      animate={unrolling ? {
        rotateX: [0, -15, 5, 0],
        scaleY: [1, 0.88, 1.04, 1],
        background: ['var(--bg)', 'rgba(0,255,204,0.08)', 'var(--bg-card)'],
      } : {}}
      transition={unrolling ? { duration: 0.42, ease: [0.16, 1, 0.3, 1] } : {}}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,255,204,0.08)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderLeft: '2px solid var(--border-2)',
        padding: '28px',
        display: 'flex', flexDirection: 'column',
        minHeight: '220px',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: '800px',
        transition: 'border-color 200ms',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.borderLeftColor = 'var(--accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.borderLeftColor = 'var(--border-2)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--border-2)' }}>{cert.num}</span>
        <span className={cls}>{label}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--body)', fontWeight: 700, fontSize: '18px',
        color: 'var(--text-bright)', lineHeight: 1.2, marginBottom: '6px',
      }}>
        {cert.title}
      </h3>

      <div style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)',
        letterSpacing: '1px', marginBottom: '14px',
      }}>
        <span>{cert.issuer}</span>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <span>{cert.year}</span>
      </div>

      <p style={{
        fontFamily: 'var(--body)', fontSize: '13px', color: 'var(--text)',
        lineHeight: 1.6, flex: 1, fontWeight: 400,
      }}>
        {cert.description}
      </p>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {cert.link ? (
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px' }}>
            VERIFY ↗
          </span>
        ) : (
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--border-2)', letterSpacing: '2px' }}>
            — ON FILE
          </span>
        )}
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--border-2)', letterSpacing: '1px' }}>
          CLICK TO VIEW
        </span>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  const headingRef = useTextReveal('words')
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certs" style={{
      background: 'var(--bg-2)',
      padding: '100px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ marginBottom: '56px' }}
        >
          <div className="section-line" />
          <div className="section-label" style={{ marginBottom: '12px' }}>// Credentials</div>
          <h2 ref={headingRef} className="section-title">Certificates</h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text)', marginTop: '10px' }}>
            {certificates.length} credentials · {certificates.filter(c => c.link).length} verifiable
          </p>
        </motion.div>

        {/* Staggered grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {certificates.map(cert => (
            <CertCard key={cert.id} cert={cert} onClick={setSelectedCert} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
