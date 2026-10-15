import TimelineItem from './TimelineItem.jsx'
import ScrollReveal from '../Motion/ScrollReveal.jsx'
import { projects } from '../../data/projects.js'
import './Projects.css'
export default function Projects({ text, language, embedded = false }) {
  const chronologicalProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date))
  return <section id="projetos" className={embedded ? 'projects-embedded' : 'section container'}>
    <ScrollReveal className="section-heading"><h2>{text.projectsTitle}</h2></ScrollReveal>
    <div className="project-timeline-shell">
      <ol className="project-timeline">{chronologicalProjects.map((project, index) =>
        <TimelineItem key={project.id} project={project} index={index} last={index === chronologicalProjects.length - 1} language={language} text={text} />
      )}</ol>
    </div>
  </section>
}
