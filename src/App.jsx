import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import PageLoader from './components/Motion/PageLoader.jsx'
import { PageReadyContext } from './contexts/PageReadyContext.js'
import Header from './components/Header/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import ExperiencesPage from './pages/ExperiencesPage.jsx'
import usePageNavigation from './hooks/usePageNavigation.js'
import Footer from './components/Footer/Footer.jsx'
import { translations } from './data/translations.js'
import './App.css'
import './components/Motion/Motion.css'

const pages = { home: HomePage, about: AboutPage, skills: SkillsPage, experiences: ExperiencesPage }

// A nova página inicia seu próprio carregamento; idioma e âncoras não o reiniciam.
function PageShell({ route, text, language, setLanguage }) {
  const [ready, setReady] = useState(false)
  const [revealsReady, setRevealsReady] = useState(false)
  const finishLoading = useCallback(() => setReady(true), [])
  const finishTransition = useCallback(() => setRevealsReady(true), [])
  useEffect(() => {
    if (ready) document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [ready])
  const Page = pages[route.page]
  return <PageReadyContext.Provider value={revealsReady}><div className="page-shell">
    <AnimatePresence onExitComplete={finishTransition}>{!ready && <PageLoader key="loader" label={text.pageLoading} onReady={finishLoading} />}</AnimatePresence>
    <div className="site-content" inert={!ready} aria-hidden={!ready || undefined}>
      <a className="skip-link button" href="#main-content" onClick={event => {
        event.preventDefault()
        const main = document.getElementById('main-content')
        main.focus({ preventScroll: true })
        main.scrollIntoView({ behavior: 'instant' })
      }}>{text.skip}</a>
      <Header text={text} language={language} setLanguage={setLanguage} route={route} />
      <main id="main-content" tabIndex={-1}>
        <Page text={text} language={language} />
      </main>
      <Footer text={text} />
    </div>
  </div></PageReadyContext.Provider>
}

export default function App() {
  const [language, setLanguage] = useState('pt')
  const text = translations[language]
  const route = usePageNavigation()
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en' }, [language])
  useEffect(() => {
    const title = { home: language === 'pt' ? 'Portfólio' : 'Portfolio', about: text.nav[0], skills: text.nav[1], experiences: text.nav[2] }
    document.title = 'Abner Almeida | ' + title[route.page]
  }, [route.page, text, language])
  return (
    <MotionConfig reducedMotion="user">
      <PageShell key={route.page} route={route} text={text} language={language} setLanguage={setLanguage} />
    </MotionConfig>
  )
}
