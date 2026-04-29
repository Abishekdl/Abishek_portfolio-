import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const [mode, setMode] = useState('default')

  useEffect(() => {
    let raf
    const lerp = (a, b, t) => a + (b - a) * t

    let ringPos = { x: -100, y: -100 }

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`
      }
      if (ringRef.current) {
        ringPos.x = lerp(ringPos.x, pos.current.x, 0.12)
        ringPos.y = lerp(ringPos.y, pos.current.y, 0.12)
        ringRef.current.style.transform = `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnterClick = () => setMode('click')
    const onEnterCard = () => setMode('card')
    const onLeave = () => setMode('default')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor="card"]').forEach(el => {
      el.addEventListener('mouseenter', el.dataset.cursor === 'card' ? onEnterCard : onEnterClick)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor="card"]').forEach(el => {
        el.addEventListener('mouseenter', el.dataset.cursor === 'card' ? onEnterCard : onEnterClick)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  const ringSize = mode === 'card' ? 40 : mode === 'click' ? 32 : 32
  const dotSize = 12

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: dotSize, height: dotSize,
          pointerEvents: 'none', zIndex: 99999,
          willChange: 'transform',
        }}
      >
        {mode === 'card' ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="#00ff41" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="#00ff41" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="#00ff41" strokeWidth="1" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="#00ff41" strokeWidth="1" />
            <circle cx="6" cy="6" r="1.5" fill="#00ff41" />
          </svg>
        )}
      </div>
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: ringSize, height: ringSize,
          border: `1px solid ${mode === 'default' ? 'rgba(0,255,65,0.4)' : '#00ff41'}`,
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  )
}
