import Experiences from '../components/Experiences.jsx'
import Projects from '../components/Projects.jsx'
import './ExperiencesPage.css'

export default function ExperiencesPage({ text, language }) {
  return <>
    <section className="section container experience-page">
      <div className="section-heading"><h1 className="page-title">{text.experiencesPageTitle}</h1></div>
      <div className="experience-page-summary"><Experiences text={text} language={language} /></div>
    </section>
    <Projects text={text} language={language} />
  </>
}
