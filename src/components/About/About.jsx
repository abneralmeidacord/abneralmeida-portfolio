import hero from '../../assets/images/abner-hero.png'
import { mainIcons } from '../../data/designAssets.js'
import ScrollReveal from '../Motion/ScrollReveal.jsx'
import Typewriter from '../Motion/Typewriter.jsx'
import './About.css'
export default function About({ text, showTools = true, expanded = false }) {
  return <section id="sobre" className="container about">
    <div className="about-main">
      <ScrollReveal as="img" direction="right" className="about-photo" src={hero} alt="Abner Almeida vestindo uma camisa do Brasil" width="600" height="800" fetchPriority="high" />
      <ScrollReveal direction="left" className="about-copy">
        <p className="about-greeting"><Typewriter key={text.greeting} text={text.greeting} /></p>
        <h1><Typewriter key={text.greeting + '-name'} text="Abner Almeida" delay={text.greeting.length * 0.055 + 0.12} /></h1>
        <p className="about-role">{text.role}</p>
        <p>{text.about}</p>
        {expanded && <p>{text.aboutExperience}</p>}
        <p>{text.goal}</p>
      </ScrollReveal>
    </div>
    {showTools && <ScrollReveal className="about-tools">
      <div className="about-icons">{mainIcons.map(({ name, image }) => <img key={name} src={image} alt={name} />)}</div>
      <p><strong>{text.skillsNote}</strong><br />{text.skillsMore}</p>
      <a href="#/sobre" className="button about-button">{text.aboutButton}</a>
    </ScrollReveal>}
  </section>
}
