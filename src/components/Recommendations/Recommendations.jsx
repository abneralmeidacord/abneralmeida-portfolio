import { recommendations } from '../../data/recommendations.js'
import DocumentCard from '../DocumentCard/DocumentCard.jsx'
import Reveal from '../Motion/Reveal.jsx'
import './Recommendations.css'

export default function Recommendations({ text, language }) {
  const localize = value => typeof value === 'string' ? value : value?.[language]
  return <section id="recomendacoes" className="section container recommendations" aria-labelledby="recommendations-title">
    <Reveal className="section-heading">
      <p className="eyebrow">{text.recommendationsEyebrow}</p>
      <h2 id="recommendations-title">{text.recommendationsTitle}</h2>
      <p>{text.recommendationsIntro}</p>
    </Reveal>
    <div className="recommendations-list">
      {recommendations.length === 0 ? <DocumentCard title={text.recommendationsTitle}
        description={text.recommendationsEmpty} text={text} readLabel={text.readLetter} /> :
        recommendations.map(letter => <DocumentCard key={letter.file}
          title={localize(letter.title)} description={[letter.author, localize(letter.role)].filter(Boolean).join(' · ')}
          file={letter.file} text={text} readLabel={text.readLetter} />)}
    </div>
  </section>
}
