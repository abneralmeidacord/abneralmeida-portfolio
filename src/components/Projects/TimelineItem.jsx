import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'
import ScrollReveal from '../Motion/ScrollReveal.jsx'

export default function TimelineItem({ project, index, last, language, text }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.05'] })
  const { scrollYProgress: lineProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const markerTop = useTransform(lineProgress, progress => `${progress * 100}%`)
  const markerOpacity = useTransform(lineProgress, [0, 0.001, 0.999, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.8, 1, 2, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.35, 0.8, 1, 0.8, 0.5])
  const halo = useTransform(scrollYProgress, [0, 0.5, 1], [0, 7, 0])
  const shadow = useTransform(halo, value => `0 0 0 ${value}px var(--color-shadow)`)

  return <li ref={ref} className="timeline-item">
    {!last && <span className="timeline-segment" aria-hidden="true">
      <span className="timeline-track" />
      <motion.span className="timeline-progress" style={{ scaleY: reducedMotion ? 1 : lineProgress }} />
      {!reducedMotion && <motion.span className="timeline-traveler" style={{ top: markerTop, opacity: markerOpacity }} />}
    </span>}
    <motion.span className="timeline-node" aria-hidden="true" style={{
      scale: reducedMotion ? 1 : scale, opacity: reducedMotion ? 1 : opacity,
      boxShadow: reducedMotion ? 'none' : shadow,
    }} />
    <time dateTime={project.date}>{project.period}</time>
    <ScrollReveal direction={index % 2 ? 'right' : 'left'}>
      <ProjectCard project={project} language={language} text={text} />
    </ScrollReveal>
  </li>
}
