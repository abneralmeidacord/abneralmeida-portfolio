import About from '../components/About/About.jsx'
import Skills from '../components/Skills/Skills.jsx'
import Projects from '../components/Projects/Projects.jsx'
import Contact from '../components/Contact/Contact.jsx'

export default function HomePage({ text, language }) {
  return <>
    <About text={text} />
    <Skills text={text} language={language} />
    <Projects text={text} language={language} />
    <Contact text={text} language={language} />
  </>
}
