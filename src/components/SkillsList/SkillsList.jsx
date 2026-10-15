// Adaptado de SkillsSection, de João Paulo Aramuni (MIT).
// Licença: docs/references/aramuni-skills-section-LICENSE.txt.
import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import ScrollReveal from '../Motion/ScrollReveal.jsx'
import './SkillsList.css'

export default function SkillsList({ skills, text }) {
  const [category, setCategory] = useState('all')
  const categories = ['all', ...new Set(skills.map(skill => skill.category))]
  const filtered = category === 'all' ? skills : skills.filter(skill => skill.category === category)

  return <div id="skills-view-content" className="skills-list-view">
    <div className="skills-category-filters" role="group" aria-label={text.skillsCategoryLabel}>
      {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
        {text.skillCategories[item]}<span>{item === 'all' ? skills.length : skills.filter(skill => skill.category === item).length}</span>
      </button>)}
    </div>
    <p className="skills-list-count" role="status">{filtered.length} {filtered.length === 1 ? text.skillsCountLabelSingular : text.skillsCountLabel}</p>
    <ul className="skills-detail-list" aria-label={text.skillsListView}>
      {filtered.map(skill => {
        const Icon = skill.icon
        return <ScrollReveal as="li" key={skill.name}>
          <a href={skill.link} target="_blank" rel="noopener noreferrer" style={{ '--skill': skill.color }}>
            <Icon className="skills-list-icon" aria-hidden="true" />
            <span className="skills-list-name">{skill.name}<small>{text.skillCategories[skill.category]}</small></span>
            <FiArrowUpRight className="skills-list-arrow" aria-hidden="true" />
          </a>
        </ScrollReveal>
      })}
    </ul>
  </div>
}
