import { useEffect, useState } from 'react'
import { experiences } from '../../data/experiences.js'
import Reveal from '../Motion/Reveal.jsx'
import { formatExperienceDuration, getDurationParts, getExperienceMonths, getTotalExperienceMonths } from '../../utils/experienceDuration.js'
import './Experiences.css'
export default function Experiences({ text, language }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])
  const total = getTotalExperienceMonths(experiences, now)
  const { years, months, yearLabel, monthLabel } = getDurationParts(total, language)
  return <Reveal as="article" id="experiencias" className="experience-card">
    <p className="experience-intro">{text.workingFor}</p>
    <div className="experience-total">
      <strong>{years || months}</strong><span>{years ? yearLabel : monthLabel}</span>
      {years > 0 && months > 0 && <strong className="experience-months">{months} {monthLabel}</strong>}
    </div>
    <h3>{text.experiencesTitle}</h3>
    <div className="experience-list">{experiences.map(item => <div className="experience-item" key={item.id}>
      <p><strong>{item.company}</strong> ({typeof item.period === 'string' ? item.period : item.period[language]})</p>
      <p>{formatExperienceDuration(getExperienceMonths(item, now), language)}</p>
      <p className="experience-role">{item.role[language]}</p>
    </div>)}</div>
  </Reveal>
}
