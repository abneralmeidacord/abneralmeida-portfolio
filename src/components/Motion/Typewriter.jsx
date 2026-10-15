import { useContext, useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { PageReadyContext } from '../../contexts/PageReadyContext.js'

export default function Typewriter({ text, delay = 0 }) {
  const ready = useContext(PageReadyContext)
  const reducedMotion = useReducedMotion()
  const count = useMotionValue(0)
  const output = useTransform(count, value => text.slice(0, Math.round(value)))
  const caretDisplay = useTransform(count, value => value > 0 && Math.round(value) < text.length ? 'inline-block' : 'none')
  useEffect(() => {
    if (!ready || reducedMotion) return
    const controls = animate(count, text.length, {
      duration: text.length * 0.055, delay: 0.05 + delay, ease: 'linear',
    })
    return () => controls.stop()
  }, [ready, reducedMotion, count, text, delay])

  if (reducedMotion) return text
  return <span className="typewriter">
    <span className="motion-sr-only">{text}</span>
    <span className="typewriter-reserve" aria-hidden="true">{text}</span>
    <span className="typewriter-output" aria-hidden="true">
      <motion.span>{output}</motion.span><motion.span className="typewriter-caret" style={{ display: caretDisplay }} />
    </span>
  </span>
}
