import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import AnimatedGridPattern from './AnimatedGridPattern'
import profileImg from '../assets/profile.jpeg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  'AI/ML Developer',
  'Systems Engineer',
  'Full-Stack Developer',
  'Cloud Architect',
]

function ParticleField({ prefersReduced }) {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      opacity: 0.12 + Math.random() * 0.35,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
      dx: (Math.random() - 0.5) * 20,
      dy: -(10 + Math.random() * 20),
    }))
  }, [])

  if (prefersReduced) {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,255,204,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.4,
      }} />
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: '#00ffcc',
            boxShadow: `0 0 ${p.size * 2}px rgba(0,255,204,0.5)`,
          }}
          animate={{ y: [0, p.dy, 0], x: [0, p.dx, 0], opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()

  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const subtitleRef = useRef(null)
  const planeRef = useRef(null)
  const sectionRef = useRef(null)
  const profileRef = useRef(null)
  const orbitContainerRef = useRef(null)

  const heroY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 100])
  const particleY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -60])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, prefersReduced ? 1 : 0])

  useEffect(() => {
    // 03. GSAP SplitText (via split-type)
    if (!nameRef.current) return;
    const text = new SplitType(nameRef.current, { types: 'chars' });
    
    gsap.fromTo(text.chars,
      { y: -60, opacity: 0, filter: 'blur(8px)', skewX: 10 },
      { y: 0, opacity: 1, filter: 'blur(0px)', skewX: 0, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.3 }
    );

    return () => text.revert();
  }, [])

  useEffect(() => {
    // 04. Custom Vanilla ScrambleText Decoder
    let id;
    let cleanupScramble;
    
    const chars = '!<>-_\\\\/[]{}—=+*^?#________';
    const scrambleText = (node, newText, duration = 1.2) => {
      let frame = 0;
      const length = Math.max(node.innerText.length, newText.length);
      const totalFrames = duration * 60;
      
      const update = () => {
        let output = '';
        let complete = 0;
        for (let i = 0; i < length; i++) {
          if (i < (frame / totalFrames) * length) {
            output += newText[i] || '';
            complete++;
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        node.innerText = output;
        if (complete >= length) {
          gsap.ticker.remove(update);
        } else {
          frame++;
        }
      }
      gsap.ticker.add(update);
      return () => gsap.ticker.remove(update);
    };

    id = setInterval(() => {
      setRoleIndex(i => {
        const next = (i + 1) % ROLES.length;
        if (roleRef.current) {
          cleanupScramble = scrambleText(roleRef.current, ROLES[next], 1.2);
        }
        return next;
      })
    }, 4000);

    return () => {
      clearInterval(id);
      if (cleanupScramble) cleanupScramble();
    };
  }, [])

  useEffect(() => {
    if (prefersReduced) return

    // Subtitle word split — each word rises up from clip
    const el = subtitleRef.current
    if (!el) return
    el.style.overflow = 'hidden'
    const split = new SplitType(el, { types: 'words' })
    gsap.set(split.words, { yPercent: 110, opacity: 0 })
    gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.06,
      delay: 1.0,
    })

    // Paper plane scroll-tied
    const plane = planeRef.current
    const section = sectionRef.current
    if (plane && section) {
      gsap.to(plane, { opacity: 1, duration: 0.5, delay: 1.8 })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: self => {
            gsap.to(plane, { rotation: self.direction === 1 ? 30 : -150, duration: 0.3 })
          },
        },
      })
      tl.fromTo(plane, { x: 0, y: 0 }, { x: -180, y: 240, ease: 'none' })
    }

    // Profile image entrance + glow pulse
    const profile = profileRef.current
    if (profile) {
      gsap.fromTo(profile,
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.6 }
      )
      gsap.to(profile, {
        boxShadow: '0 0 48px rgba(0,255,204,0.55), 0 0 16px rgba(0,255,204,0.25)',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.7,
      })
    }

    // Orbit rings — each rotates at a different rate tied to scroll
    const orbitEl = orbitContainerRef.current
    if (orbitEl && section) {
      const rings = orbitEl.querySelectorAll('.orbit-ring')
      const rotations = [200, -320, 280]
      const scrubs = [2, 1.5, 2.8]
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: rotations[i],
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubs[i],
          },
        })
      })
    }

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(t => t.vars?.trigger === sectionRef.current && t.kill())
    }
  }, [prefersReduced])

  return (
    <section id="hero" ref={sectionRef} style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Paper plane */}
      <svg
        ref={planeRef}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        style={{
          position: 'absolute',
          top: '18%',
          right: '12%',
          zIndex: 10,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <path d="M2 20 L38 4 L28 36 L18 24 Z" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M18 24 L22 32 L28 20" fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
        <path d="M18 24 L38 4" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
      </svg>

      {/* Profile + orbit rings */}
      <div
        ref={orbitContainerRef}
        className="hero-orbit"
        style={{
          position: 'absolute',
          right: 'clamp(40px, 9vw, 140px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '420px',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {/* Orbit SVG rings */}
        <svg
          width="420" height="420" viewBox="0 0 420 420"
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          {/* Ring 1 — inner, faster */}
          <circle
            className="orbit-ring"
            cx="210" cy="210" r="112"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="0.9"
            opacity="0.28"
            strokeDasharray="55 25 35 45"
          />
          {/* Ring 2 — mid, counter-clockwise */}
          <circle
            className="orbit-ring"
            cx="210" cy="210" r="158"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="0.6"
            opacity="0.16"
            strokeDasharray="75 45 30 55"
          />
          {/* Ring 3 — outer, slowest */}
          <circle
            className="orbit-ring"
            cx="210" cy="210" r="198"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="0.45"
            opacity="0.09"
            strokeDasharray="95 55 45 35"
          />
        </svg>

        {/* Soft glow behind image */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,204,0.12) 0%, transparent 70%)',
          zIndex: 1,
        }} />

        {/* Profile image with monogram fallback */}
        <div ref={profileRef} style={{
          width: '168px', height: '168px', borderRadius: '50%',
          border: '1px solid rgba(0,255,204,0.25)',
          position: 'relative', zIndex: 2, opacity: 0,
          overflow: 'hidden', background: 'rgba(0,255,204,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={profileImg}
            alt=""
            onError={e => { e.currentTarget.style.display = 'none' }}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              position: 'absolute', inset: 0,
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
      {/* Background: animated grid + particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatedGridPattern opacity={0.04} gridSize={32} numFlickers={10} />
      </div>

      <motion.div style={{ position: 'absolute', inset: 0, y: particleY, zIndex: 1 }}>
        <ParticleField prefersReduced={prefersReduced} />
      </motion.div>

      {/* Radial glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 60% 60% at 35% 50%, rgba(0,255,204,1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2, height: '100vh' }}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(24px, 5vw, 80px)',
          maxWidth: '900px',
        }}>
          {/* System tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontFamily: 'var(--mono)', fontSize: '11px', color: '#444',
              letterSpacing: '3px', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
            ROOT@ABISHEK:~$&nbsp;&nbsp;node_id: AI-ML-CS-001
          </motion.div>

          {/* Name — letter stagger via SplitType */}
          <h1
            ref={nameRef}
            style={{
              fontFamily: 'var(--mono)', fontWeight: 800,
              fontSize: 'clamp(64px, 10vw, 120px)',
              color: '#f0f0f0',
              lineHeight: 0.9,
              letterSpacing: '-3px',
              marginBottom: '8px',
              display: 'flex',
              margin: 0
            }}
          >
            ABISHEK
          </h1>

          {/* Sub-name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            style={{
              fontFamily: 'var(--mono)', fontSize: 'clamp(14px, 1.8vw, 22px)',
              color: '#444', marginBottom: '28px', letterSpacing: '4px',
              marginTop: '8px'
            }}
          >
            D.
          </motion.div>

          {/* Role morph via ScrambleText */}
          <div style={{ height: '32px', marginBottom: '32px', overflow: 'hidden' }}>
            <div
              ref={roleRef}
              style={{
                fontFamily: 'var(--body)', fontSize: 'clamp(14px, 1.6vw, 20px)',
                color: '#888888', fontWeight: 400,
              }}
            >
              {ROLES[0]}
            </div>
          </div>

          {/* Bio — chars revealed via GSAP SplitType */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--body)', fontSize: 'clamp(14px, 1.3vw, 17px)',
              color: 'var(--text-2)', fontWeight: 400, lineHeight: 1.7,
              maxWidth: '520px', marginBottom: '40px',
              perspective: '400px',
            }}
          >
            I build intelligent systems — from low-level logic to deployed AI applications.
            MCA @ VIT Vellore · Open for full-time roles.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <button
              className="btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            style={{
              position: 'absolute', bottom: '40px',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px',
              fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)', letterSpacing: '3px',
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
            />
            SCROLL
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .hero-orbit { display: none !important; } }
      `}</style>
    </section>
  )
}
