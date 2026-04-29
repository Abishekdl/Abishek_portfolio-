import { lazy, Suspense, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useHasBooted } from './hooks/useHasBooted'
import { useScrollProgress } from './hooks/useScrollProgress'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import LearningJourney from './components/LearningJourney'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'

const BootSequence = lazy(() => import('./components/BootSequence'))

function LenisSync() {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return;
    const update = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [lenis])
  return null
}

export default function App() {
  const { hasBooted, markBooted } = useHasBooted()
  const [booting, setBooting] = useState(!hasBooted)
  const { scaleX } = useScrollProgress()

  const handleBootComplete = () => {
    markBooted()
    setBooting(false)
  }

  return (
    <ReactLenis root autoRaf={false} options={{ lerp: 0.08 }}>
      <LenisSync />
      {/* Global top-of-page scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '2px',
          background: '#00ff41',
          transformOrigin: 'left',
          scaleX,
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />

      <CustomCursor />

      <AnimatePresence>
        {booting && (
          <Suspense fallback={null}>
            <BootSequence onComplete={handleBootComplete} />
          </Suspense>
        )}
      </AnimatePresence>

      <motion.div
        initial={!hasBooted ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: booting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Nav />
        <main>
          <Hero />
          <About />
          <LearningJourney />
          <Projects />
          <Certificates />
          <Contact />
        </main>
      </motion.div>
    </ReactLenis>
  )
}
