import { FiArrowUpRight } from 'react-icons/fi'
import { designIcons } from '../../data/designAssets.js'
import './ProjectCard.css'
export default function ProjectCard({ project, language, text }) {
  return <article className="project-card">
    <a href={project.repository} target="_blank" rel="noreferrer" className="project-image-link" aria-label={text.repository + ': ' + project.name}>
      <img src={project.image} alt={project.name + ' — preview'} loading="lazy" width="640" height="360" />
    </a>
    <div className="project-copy">
      <p className="project-type">{text.projectType[project.type]}</p><h3>{project.name}</h3>
      <p className="project-description">{project.description[language]}</p>
      <ul className="project-technologies">{project.technologies.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="project-links"><a href={project.repository} target="_blank" rel="noreferrer"><img src={designIcons.githubCard} alt="" width="12" height="12" />{text.repository}<FiArrowUpRight /></a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{text.demo}<FiArrowUpRight /></a>}</div>
    </div>
  </article>
}
