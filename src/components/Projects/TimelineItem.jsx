import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'

export default function TimelineItem({ project, last, language, text }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const height = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.68', 'end 0.68'] })
  const progress = useSpring(scrollYProgress, { stiffness: 600, damping: 40, mass: 0.2, restDelta: 0.0001 })
  const cursorY = useTransform(() => progress.get() * height.get())
  const cursorOpacity = useTransform(scrollYProgress, [0, 0.025, 0.975, 1], [0, 1, 1, 0])
  const nodeScale = useTransform(progress, [0, 0.08, 0.45, 0.8, 1], [1, 1.8, 1.45, 1, 1])
  const nodeOpacity = useTransform(progress, [0, 0.04, 1], [0.4, 1, 1])

  useLayoutEffect(() => {
    if (last || reducedMotion) return
    const item = ref.current
    const measure = () => height.set(item.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(item)
    return () => observer.disconnect()
  }, [height, last, reducedMotion])

  return <li ref={ref} className="timeline-item">
    {!last && <span className="timeline-segment" aria-hidden="true">
      <span className="timeline-track" />
      <motion.span className="timeline-progress" style={{ scaleY: reducedMotion ? 1 : progress }} />
      {!reducedMotion && <motion.span className="timeline-traveler" style={{ y: cursorY, opacity: cursorOpacity }} />}
    </span>}
    <motion.span className="timeline-node" aria-hidden="true" style={{ scale: reducedMotion ? 1 : nodeScale, opacity: reducedMotion ? 1 : nodeOpacity }} />
    <time dateTime={project.date}>{project.period}</time>
    <ProjectCard project={project} language={language} text={text} />
  </li>
}
