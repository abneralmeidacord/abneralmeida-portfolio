import { useContext, useEffect, useMemo, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'
import { PageReadyContext } from '../../contexts/PageReadyContext.js'

export default function Typewriter({ text, delay = 0 }) {
  const ready = useContext(PageReadyContext)
  const reducedMotion = useReducedMotion()
  const characters = useMemo(() => Array.from(text), [text])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!ready || reducedMotion) return
    const playback = animate(0, characters.length, {
      duration: characters.length * 0.055,
      delay: delay + 0.3,
      ease: 'linear',
      onUpdate: value => setCount(Math.floor(value)),
    })
    return () => playback.stop()
  }, [ready, reducedMotion, characters, delay])

  const finished = reducedMotion || count >= characters.length
  return <span className="typewriter">
    <span className="motion-sr-only">{text}</span>
    <span className="typewriter-reserve" aria-hidden="true">{text}</span>
    <span className="typewriter-output" aria-hidden="true">
      {reducedMotion ? text : characters.slice(0, count).join('')}
      {ready && count > 0 && !finished && <motion.span className="typewriter-caret"
        animate={{ opacity: [1, 0] }} transition={{ duration: 0.45, repeat: Infinity }} />}
    </span>
  </span>
}
