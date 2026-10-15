import { experiences } from '../../data/experiences.js'
import ScrollReveal from '../Motion/ScrollReveal.jsx'
import './Experiences.css'
export default function Experiences({ text, language }) {
  return <ScrollReveal as="article" direction="right" id="experiencias" className="experience-card">
    <p className="experience-intro">{text.workingFor}</p>
    <div className="experience-total"><strong>2</strong><span>{text.years}</span><strong className="experience-months">{text.elevenMonths}</strong></div>
    <h3>{text.experiencesTitle}</h3>
    <div className="experience-list">{experiences.map(item => <div className="experience-item" key={item.id}>
      <p><strong>{item.company}</strong> ({typeof item.period === 'string' ? item.period : item.period[language]})</p>
      {item.duration && <p>{item.duration[language]}</p>}<p className="experience-role">{item.role[language]}</p>
    </div>)}</div>
  </ScrollReveal>
}
