import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  containerVariants, slideInLeft, viewport,
} from '../hooks/useAnimationVariants'
import { useTextReveal } from '../hooks/useTextReveal'

gsap.registerPlugin(ScrollTrigger)

const IDENTITY_CHIPS = [
  'MCA @ VIT Vellore',
  'Strong in Systems + AI/ML',
  'Built real-world applications',
  'Interested in AI + Security',
]

const SKILLS = [
  { cat: 'LANGUAGES',  items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript'] },
  { cat: 'FRONTEND',   items: ['React', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion'] },
  { cat: 'BACKEND',    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs'] },
  { cat: 'DEVOPS',     items: ['Docker', 'AWS', 'Git', 'Linux'] },
  { cat: 'AI / ML',    items: ['YOLOv12', 'BLIP', 'scikit-learn', 'LangChain', 'TensorFlow'] },
  { cat: 'DATABASES',  items: ['PostgreSQL', 'Firebase', 'MongoDB'] },
]

const chipVariants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}


export default function About() {
  const headingRef = useTextReveal('words')
  const sectionRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    const container = skillsRef.current
    if (!container) return

    const rows = container.querySelectorAll('.skill-row')
    const tags = container.querySelectorAll('.tag')

    gsap.set(rows, { opacity: 0, y: 32 })
    gsap.set(tags, { opacity: 0, y: 16, scale: 0.88 })

    const rowTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        })
        gsap.to(tags, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.04,
          delay: 0.1,
        })
      },
      onLeaveBack: () => {
        gsap.to(rows, { opacity: 0, y: 32, duration: 0.3, ease: 'power2.in', stagger: 0.04 })
        gsap.to(tags, { opacity: 0, y: 16, scale: 0.88, duration: 0.2, ease: 'power1.in' })
      },
    })

    return () => rowTrigger.kill()
  }, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const decorY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const decorOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0.045, 0.045, 0])
  const leftColY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const rightColY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <section id="about" ref={sectionRef} style={{
      background: 'var(--bg-2)',
      padding: '100px 0',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Parallax background watermark */}
      <motion.div style={{
        position: 'absolute', right: '-3%', top: '8%',
        y: decorY, opacity: decorOpacity,
        fontFamily: 'var(--body)', fontWeight: 800,
        fontSize: 'clamp(100px, 18vw, 240px)',
        color: 'var(--text-bright)',
        letterSpacing: '-10px', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>
        WHO
      </motion.div>

      <div style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ marginBottom: '64px' }}
        >
          <div className="section-line" />
          <div className="section-label" style={{ marginBottom: '12px' }}>// About</div>
          <h2 ref={headingRef} className="section-title">Who I Am</h2>
          {/* Animated underline */}
          <motion.div style={{
            height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)',
            scaleX: lineScaleX, transformOrigin: 'left', marginTop: '16px',
          }} />
        </motion.div>

        {/* 2-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}>
          {/* Left — bio + chips, slower parallax */}
          <motion.div style={{ y: leftColY }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p style={{
                fontFamily: 'var(--body)', fontSize: '16px', color: 'var(--text-2)',
                lineHeight: 1.8, marginBottom: '32px', fontWeight: 400,
              }}>
                {"An innoventive mind fueled by curiosity, creativity, and a passion for crafting impactful digital solutions. I bring hands-on experience in full-stack development, intelligent systems, and cloud-native technologies. With a sharp learning curve and a collaborative mindset, I thrive where innovation meets execution.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                    viewport={viewport}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p style={{
                fontFamily: 'var(--body)', fontSize: '15px', color: 'var(--text)',
                lineHeight: 1.7, marginBottom: '40px', fontWeight: 400,
              }}>
                {"Currently expanding skills in system design, machine learning models, operating systems, and real-time applications. Eager to contribute as a Software Developer.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                    viewport={viewport}
                    transition={{ delay: 1.5 + i * 0.03, duration: 0.2 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: 'var(--accent)', marginLeft: '4px', display: 'inline-block' }}
                >
                  _
                </motion.span>
              </motion.p>
            </motion.div>

            {/* Identity chips — slide from left */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {IDENTITY_CHIPS.map((chip) => (
                <motion.div
                  key={chip}
                  variants={chipVariants}
                  whileHover={{ x: 8, borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 20px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    cursor: 'default',
                    transition: 'border-color 200ms, background 200ms',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '12px' }}>→</span>
                  <span style={{ fontFamily: 'var(--body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-2)' }}>
                    {chip}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — skills matrix, faster parallax */}
          <motion.div style={{ y: rightColY }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text)',
                letterSpacing: '3px', marginBottom: '28px', textTransform: 'uppercase',
              }}>
                Tech Stack
              </div>

              <div ref={skillsRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                {SKILLS.map(({ cat, items }) => (
                  <div key={cat} className="skill-row">
                    <div style={{
                      fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text)',
                      letterSpacing: '3px', marginBottom: '8px',
                    }}>
                      {cat}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {items.map((skill) => (
                        <span key={skill} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
