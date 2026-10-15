import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export default function PageLoader({ label, onReady }) {
  const progress = useMotionValue(0.05)
  const smoothProgress = useSpring(progress, { stiffness: 160, damping: 28 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    let completed = 0
    let finishTimer
    const started = performance.now()
    const controller = new AbortController()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(resolve => {
      window.addEventListener('load', resolve, { once: true, signal: controller.signal })
    })
    const photo = document.querySelector('img[fetchpriority="high"]')
    const tasks = [loaded, document.fonts?.ready || Promise.resolve(), photo?.decode?.().catch(() => {}) || Promise.resolve()]
    const resources = Promise.allSettled(tasks.map(task => Promise.resolve(task).finally(() => {
      completed += 1
      if (!cancelled) progress.set(0.05 + completed / tasks.length * 0.95)
    })))
    let timeout
    const deadline = new Promise(resolve => { timeout = setTimeout(resolve, 5000) })
    Promise.race([resources, deadline]).then(() => {
      if (cancelled) return
      clearTimeout(timeout)
      progress.set(1)
      finishTimer = setTimeout(onReady, reducedMotion ? 0 : Math.max(180, 450 - (performance.now() - started)))
    })
    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timeout)
      clearTimeout(finishTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [onReady, progress, reducedMotion])

  return <motion.div className="page-loader" role="status" aria-live="polite"
    exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
    <span className="page-loader-logo" aria-hidden="true">abner<span>.</span></span>
    <motion.svg className="page-loader-spinner" viewBox="0 0 50 50" aria-hidden="true"
      animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
      <motion.circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0.2 }} animate={reducedMotion ? undefined : { pathLength: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
    </motion.svg>
    <p>{label}</p>
    <div className="page-loader-track" aria-hidden="true">
      <motion.div className="page-loader-progress" style={{ scaleX: reducedMotion ? progress : smoothProgress }} />
    </div>
  </motion.div>
}
