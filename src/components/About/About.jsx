import hero from '../../assets/images/abner-hero.png'
import { mainIcons } from '../../data/designAssets.js'
import { FiArrowDown } from 'react-icons/fi'
import Reveal from '../Motion/Reveal.jsx'
import Typewriter from '../Motion/Typewriter.jsx'
import './About.css'
export default function About({ text, showTools = true, expanded = false }) {
  return <section id="sobre" className="container about">
    <div className="about-main">
      <Reveal as="img" className="about-photo" distance={12} src={hero} alt="Abner Almeida vestindo uma camisa do Brasil" width="600" height="800" fetchPriority="high" />
      <div className="about-copy">
        <p className="about-greeting"><Typewriter key={text.greeting} text={text.greeting} /></p>
        <h1><Typewriter key={`${text.greeting}-name`} text="Abner Almeida" delay={text.greeting.length * 0.055 + 0.1} /></h1>
        <Reveal as="p" className="about-role" delay={0.08}>{text.role}</Reveal>
        <Reveal as="p" delay={0.14}>{text.about}</Reveal>
        {expanded && <Reveal as="p" delay={0.2}>{text.aboutExperience}</Reveal>}
        <Reveal as="p" delay={0.26}>{text.goal}</Reveal>
        {expanded && <button className="about-scroll-cue" type="button" aria-label={text.aboutMore} title={text.aboutMore}
          onClick={() => {
            const title = document.getElementById('resume-title')
            title?.focus({ preventScroll: true })
            document.getElementById('curriculo')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
              block: 'start',
            })
          }}><FiArrowDown aria-hidden="true" /></button>}
      </div>
    </div>
    {showTools && <Reveal className="about-tools">
      <div className="about-icons">{mainIcons.map(({ name, image }) => <img key={name} src={image} alt={name} />)}</div>
      <p><strong>{text.skillsNote}</strong><br />{text.skillsMore}</p>
      <a href="#/sobre" className="button about-button">{text.aboutButton}</a>
    </Reveal>}
  </section>
}
