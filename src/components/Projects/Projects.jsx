import ProjectCard from './ProjectCard.jsx'
import { projects } from '../../data/projects.js'
import './Projects.css'
export default function Projects({ text, language }) {
  const chronologicalProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date))
  return <section id="projetos" className="section container">
    <div className="section-heading"><h2>{text.projectsTitle}</h2></div>
    <ol className="project-timeline">{chronologicalProjects.map(project => <li className="timeline-item" key={project.id}>
      <time dateTime={project.date}>{project.period}</time><ProjectCard project={project} language={language} text={text} />
    </li>)}</ol>
  </section>
}
