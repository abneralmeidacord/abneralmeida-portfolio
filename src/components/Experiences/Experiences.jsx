import { experiences } from '../../data/experiences.js'
import './Experiences.css'
export default function Experiences({ text, language }) {
  const durations = language === 'pt' ? ['1 ano e 8 meses', '5 meses', '10 meses'] : ['1 year & 8 months', '5 months', '10 months']
  return <article id="experiencias" className="experience-card">
    <p className="experience-intro">{text.workingFor}</p>
    <div className="experience-total"><strong>2</strong><span>{text.years}</span><strong className="experience-months">{text.elevenMonths}</strong></div>
    <h3>{text.experiencesTitle}</h3>
    <div className="experience-list">{experiences.map((item, index) => <div className="experience-item" key={item.company}>
      <p><strong>{item.company}</strong> ({item.period})</p>
      <p>{durations[index]}</p><p className="experience-role">{item.role[language]}</p>
    </div>)}</div>
  </article>
}
