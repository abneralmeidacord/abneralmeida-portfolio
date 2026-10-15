import { useContext, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { PageReadyContext } from '../../contexts/PageReadyContext.js'

const elements = { div: motion.div, article: motion.article, img: motion.img, p: motion.p, li: motion.li, h3: motion.h3 }

// IntersectionObserver dispara a entrada uma vez; não há atualização React por scroll.
export default function Reveal({ as = 'div', delay = 0, distance = 18, className = '', children, ...props }) {
  const ref = useRef(null)
  const ready = useContext(PageReadyContext)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.08, margin: '0px 0px -24px 0px' })
  const Element = elements[as]
  const hidden = { opacity: 0, y: distance }
  return <Element ref={ref} className={`reveal ${className}`} {...props}
    initial={reducedMotion ? false : hidden}
    animate={reducedMotion || (ready && inView) ? { opacity: 1, y: 0 } : hidden}
    transition={{ duration: reducedMotion ? 0 : 0.58, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </Element>
}
