import TimelineItem from './TimelineItem.jsx'
import Reveal from '../Motion/Reveal.jsx'
import { projects } from '../../data/projects.js'
import './Projects.css'
export default function Projects({ text, language, embedded = false }) {
  const chronologicalProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date))
  return <section id="projetos" className={embedded ? 'projects-embedded' : 'section container'}>
    <Reveal className="section-heading"><h2>{text.projectsTitle}</h2></Reveal>
    <div className="project-timeline-shell">
      <ol className="project-timeline">{chronologicalProjects.map((project, index) =>
        <TimelineItem key={project.id} project={project} last={index === chronologicalProjects.length - 1} language={language} text={text} />
      )}</ol>
    </div>
  </section>
}
