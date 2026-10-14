import About from '../components/About.jsx'
import Recommendations from '../components/Recommendations.jsx'

export default function AboutPage({ text }) {
  return <>
    <About text={text} showTools={false} />
    <Recommendations text={text} />
  </>
}
