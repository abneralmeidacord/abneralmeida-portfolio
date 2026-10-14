import { lazy, Suspense } from 'react'
import { skills } from '../../data/skills.js'
import { designIcons, secondaryIcons } from '../../data/designAssets.js'
import Experiences from '../Experiences/Experiences.jsx'
import './Skills.css'
const SkillsGlobe = lazy(() => import('../SkillsGlobe/SkillsGlobe.jsx'))
export default function Skills({ text, language, dedicated = false }) {
  const Heading = dedicated ? 'h1' : 'h2'
  const cards = [
    { image: designIcons.languages, label: text.languages },
    { image: designIcons.githubCard, label: 'Git & GitHub' },
    { trio: true, label: text.bigThree },
    { image: designIcons.reactCard, label: 'React & React Native' },
    { image: designIcons.typescriptCard, label: 'TypeScript' },
    { image: designIcons.figma, label: 'Figma' },
  ]
  return <section id="habilidades" className="section container skills-section">
    <div className="section-heading"><Heading className={dedicated ? 'page-title' : undefined}>{dedicated ? text.skillsPageTitle : text.skillsTitle}</Heading></div>
    <div className={dedicated ? 'skills-layout skills-layout--dedicated' : 'skills-layout'}>
      {dedicated && <div className="skills-globe-card"><Suspense fallback={<p className="globe-loading">HTML · CSS · React · TypeScript</p>}><SkillsGlobe skills={skills} hint={text.globeHint} pauseLabel={text.pause} resumeLabel={text.resume} unavailableLabel={text.globeUnavailable} /></Suspense></div>}
      <div className="skills-grid">{cards.map(card => <div className="skill-card" key={card.label}>
        {card.trio ? <div className="skill-trio" aria-label="JavaScript, HTML e CSS">
          <img className="trio-js" src={designIcons.trioJavascript} alt="" />
          <img className="trio-html" src={designIcons.trioHtml} alt="" />
          <img className="trio-css" src={designIcons.trioCss} alt="" />
        </div> : <img src={card.image} alt="" loading="lazy" />}
        <span>{card.label}</span>
      </div>)}</div>
      {!dedicated && <Experiences text={text} language={language} />}
    </div>
    <div className="skills-secondary">
      <div className="secondary-icons">{secondaryIcons.map(({ name, image }) => <img key={name} src={image} alt={name} loading="lazy" />)}</div>
      <p><strong>{text.secondary}</strong><br />{text.secondaryMore}</p>
    </div>
    <div className="skills-strengths"><h3>{text.strengths}</h3><ul>{text.strengthItems.map(item => <li key={item}>{item}</li>)}</ul></div>
  </section>
}
