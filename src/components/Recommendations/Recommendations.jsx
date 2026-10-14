import { recommendations } from '../../data/recommendations.js'
import './Recommendations.css'

export default function Recommendations({ text }) {
  return <section className="section container recommendations" aria-labelledby="recommendations-title">
    <div className="section-heading"><h2 id="recommendations-title">{text.recommendationsTitle}</h2></div>
    {recommendations.length === 0 ? <p className="recommendations-empty">{text.recommendationsEmpty}</p> :
      <div className="recommendations-list">{recommendations.map(letter => <article className="recommendation-card" key={letter.file}>
        <h3>{letter.title}</h3>
        <p>{letter.author}{letter.role && ' · ' + letter.role}</p>
        <div className="recommendation-links">
          <a className="button" href={letter.file} target="_blank" rel="noreferrer">{text.readLetter}</a>
          <a href={letter.file} download>{text.downloadLetter}</a>
        </div>
      </article>)}</div>}
  </section>
}
