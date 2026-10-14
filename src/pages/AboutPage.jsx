import About from '../components/About/About.jsx'
import Recommendations from '../components/Recommendations/Recommendations.jsx'
import Resume from '../components/Resume/Resume.jsx'

export default function AboutPage({ text, language }) {
  return <>
    <About text={text} showTools={false} />
    <Resume text={text} language={language} />
    <Recommendations text={text} language={language} />
  </>
}
