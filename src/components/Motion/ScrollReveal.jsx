import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const elements = { div: motion.div, article: motion.article, img: motion.img, li: motion.li }

export default function ScrollReveal({ as = 'div', direction = 'up', className = '', style, children, ...props }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.96, 1, 1, 0.98])
  const horizontal = direction === 'left' ? -48 : direction === 'right' ? 48 : 0
  const x = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [horizontal, 0, 0, horizontal / 2])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [horizontal ? 0 : 40, 0, 0, -32])
  const Element = elements[as]

  return <Element ref={ref} className={`scroll-reveal ${className}`}
    style={{ opacity: reducedMotion ? 1 : opacity, scale: reducedMotion ? 1 : scale,
      x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y, ...style }} {...props}>
    {children}
  </Element>
}
