import { useEffect, useRef } from 'react'

export default function AnimatedGridPattern({
  gridSize = 32,
  opacity = 0.04,
  numFlickers = 8,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = () => Math.ceil(canvas.width / gridSize) + 1
    const rows = () => Math.ceil(canvas.height / gridSize) + 1

    const flickerCells = () =>
      Array.from({ length: numFlickers }, () => ({
        c: Math.floor(Math.random() * cols()),
        r: Math.floor(Math.random() * rows()),
        alpha: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        dir: Math.random() > 0.5 ? 1 : -1,
      }))

    let cells = flickerCells()
    let raf

    const draw = () => {
      if (!canvas.width || !canvas.height) { raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`
      ctx.lineWidth = 0.5
      const c = cols(), r = rows()
      for (let i = 0; i <= c; i++) {
        ctx.beginPath()
        ctx.moveTo(i * gridSize, 0)
        ctx.lineTo(i * gridSize, canvas.height)
        ctx.stroke()
      }
      for (let j = 0; j <= r; j++) {
        ctx.beginPath()
        ctx.moveTo(0, j * gridSize)
        ctx.lineTo(canvas.width, j * gridSize)
        ctx.stroke()
      }

      // Flickering cells
      cells.forEach(cell => {
        cell.alpha += cell.speed * cell.dir
        if (cell.alpha >= 1) { cell.alpha = 1; cell.dir = -1 }
        if (cell.alpha <= 0) {
          cell.alpha = 0
          cell.c = Math.floor(Math.random() * cols())
          cell.r = Math.floor(Math.random() * rows())
          cell.dir = 1
        }
        ctx.fillStyle = `rgba(0,255,204,${cell.alpha * opacity * 4})`
        ctx.fillRect(cell.c * gridSize, cell.r * gridSize, gridSize - 1, gridSize - 1)
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [gridSize, opacity, numFlickers])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
