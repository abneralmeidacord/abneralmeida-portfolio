import Experiences from '../components/Experiences/Experiences.jsx'
import Projects from '../components/Projects/Projects.jsx'
import './ExperiencesPage.css'

export default function ExperiencesPage({ text, language }) {
  return <section className="section container experience-page">
    <div className="section-heading"><h1 className="page-title">{text.experiencesPageTitle}</h1></div>
    <div className="experience-page-layout">
      <Projects text={text} language={language} embedded />
      <aside className="experience-page-summary" aria-label={text.experiencesTitle}>
        <Experiences text={text} language={language} />
      </aside>
    </div>
  </section>
}
