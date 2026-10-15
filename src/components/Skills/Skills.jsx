import { lazy, Suspense, useState } from 'react'
import { FiGlobe, FiList } from 'react-icons/fi'
import Reveal from '../Motion/Reveal.jsx'
import { skills } from '../../data/skills.js'
import { designIcons, secondaryIcons } from '../../data/designAssets.js'
import Experiences from '../Experiences/Experiences.jsx'
import SkillsList from '../SkillsList/SkillsList.jsx'
import './Skills.css'
const SkillsGlobe = lazy(() => import('../SkillsGlobe/SkillsGlobe.jsx'))
export default function Skills({ text, language, dedicated = false }) {
  const [view, setView] = useState('default')
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
    <Reveal className="section-heading"><Heading className={dedicated ? 'page-title' : undefined}>{dedicated ? text.skillsPageTitle : text.skillsTitle}</Heading></Reveal>
    {dedicated && <div className="skills-view-switch" role="group" aria-label={text.skillsViewLabel}>
      <button type="button" aria-pressed={view === 'default'} aria-controls="skills-view-content" onClick={() => setView('default')}>
        <FiGlobe aria-hidden="true" />{text.skillsDefaultView}
      </button>
      <button type="button" aria-pressed={view === 'list'} aria-controls="skills-view-content" onClick={() => setView('list')}>
        <FiList aria-hidden="true" />{text.skillsListView}
      </button>
    </div>}
    {dedicated && view === 'list' ? <SkillsList skills={skills} text={text} /> :
    <div id={dedicated ? 'skills-view-content' : undefined} className={dedicated ? 'skills-layout skills-layout--dedicated' : 'skills-layout'}>
      {dedicated && <Reveal className="skills-globe-card"><Suspense fallback={<p className="globe-loading">HTML · CSS · React · TypeScript</p>}><SkillsGlobe skills={skills} hint={text.globeHint} pauseLabel={text.pause} resumeLabel={text.resume} unavailableLabel={text.globeUnavailable} /></Suspense></Reveal>}
      <div className="skills-grid">{cards.map((card, index) => <Reveal className="skill-card" key={card.label} delay={index * 0.055}>
        {card.trio ? <div className="skill-trio" aria-label="JavaScript, HTML e CSS">
          <img className="trio-js" src={designIcons.trioJavascript} alt="" />
          <img className="trio-html" src={designIcons.trioHtml} alt="" />
          <img className="trio-css" src={designIcons.trioCss} alt="" />
        </div> : <img src={card.image} alt="" loading="lazy" />}
        <span>{card.label}</span>
      </Reveal>)}</div>
      {!dedicated && <Experiences text={text} language={language} />}
    </div>}
    <Reveal className="skills-secondary">
      <div className="secondary-icons">{secondaryIcons.map(({ name, image }) => <img key={name} src={image} alt={name} loading="lazy" />)}</div>
      <p><strong>{text.secondary}</strong><br />{text.secondaryMore}</p>
    </Reveal>
    <div className="skills-strengths"><Reveal as="h3">{text.strengths}</Reveal><ul>{text.strengthItems.map((item, index) =>
      <Reveal as="li" key={item} distance={28} delay={index * 0.065}>{item}</Reveal>
    )}</ul></div>
  </section>
}
