import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Shared motion variants — import and use whileInView="show" on containers
export const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 28 },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

// Standard viewport settings for whileInView
export const viewport = { once: true, margin: '-80px' }

// Count-up hook: counts from 0 → target when isInView
export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) { setCount(target); return }
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration, prefersReduced])

  return { count, ref }
}
