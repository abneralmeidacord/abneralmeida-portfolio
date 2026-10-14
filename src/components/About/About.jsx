import hero from '../assets/images/abner-hero.png'
import { mainIcons } from '../../data/designAssets.js'
import './About.css'
export default function About({ text, showTools = true }) {
  return <section id="sobre" className="container about">
    <div className="about-main">
      <div className="about-copy">
        <p className="about-greeting">{text.greeting}</p>
        <h1>Abner Almeida</h1>
        <p className="about-role">{text.role}</p>
        <p>{text.about}</p><p>{text.goal}</p>
      </div>
      <img className="about-photo" src={hero} alt="Abner Almeida vestindo uma camisa do Brasil" width="600" height="800" fetchPriority="high" />
    </div>
    {showTools && <div className="about-tools">
      <div className="about-icons">{mainIcons.map(({name, image}) => <img key={name} src={image} alt={name} />)}</div>
      <p><strong>{text.skillsNote}</strong><br />{text.skillsMore}</p>
      <a href="#/sobre" className="button about-button">{text.aboutButton}</a>
    </div>}
  </section>
}
