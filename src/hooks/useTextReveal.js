import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function useTextReveal(type = 'words') {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    el.style.overflow = 'hidden'

    const split = new SplitType(el, { types: type })
    const targets =
      type === 'chars' ? split.chars
      : type === 'lines' ? split.lines
      : split.words

    gsap.set(targets, { yPercent: 110, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: type === 'chars' ? 0.03 : 0.08,
        })
      },
      onLeaveBack: () => {
        gsap.to(targets, {
          yPercent: 110,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.02,
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [type])

  return ref
}
