import DocumentCard from '../DocumentCard/DocumentCard.jsx'
import ScrollReveal from '../Motion/ScrollReveal.jsx'
import { resumes } from '../../data/resumes.js'
import './Resume.css'

export default function Resume({ text, language }) {
  return <section id="curriculo" className="section container resume" aria-labelledby="resume-title">
    <ScrollReveal className="section-heading">
      <p className="eyebrow">{text.resumeEyebrow}</p>
      <h2 id="resume-title">{text.resumeTitle}</h2>
      <p>{text.resumeIntro}</p>
    </ScrollReveal>
    <div className="resume-list">
      {resumes.filter(resume => resume.language === language).map(resume => <DocumentCard key={resume.language}
        title={text.resumeLanguages[resume.language]}
        description={text.resumeDescriptions[resume.language]}
        badge={`PDF · ${resume.language.toUpperCase()}`}
        file={resume.file} text={text} readLabel={text.readResume} />)}
    </div>
  </section>
}
