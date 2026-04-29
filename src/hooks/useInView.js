import { useInView as useMotionInView } from 'motion/react'
import { useRef } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const isInView = useMotionInView(ref, { once: true, margin: '-100px', ...options })
  return { ref, isInView }
}
