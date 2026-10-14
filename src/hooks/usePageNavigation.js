import { useEffect, useState } from 'react'

// Rotas com # funcionam no Vite e também em hospedagens estáticas.
export function readPageRoute(hash) {
  if (!hash.startsWith('#/')) return { page: 'home', section: hash.slice(1) }
  const path = hash.slice(2)
  if (path === 'sobre') return { page: 'about', section: '' }
  if (path === 'habilidades') return { page: 'skills', section: '' }
  if (path === 'experiencias') return { page: 'experiences', section: '' }
  if (path === 'experiencias/projetos') return { page: 'experiences', section: 'projetos' }
  if (path === 'contato') return { page: 'home', section: 'contato' }
  return { page: 'home', section: '' }
}

export default function usePageNavigation() {
  const [route, setRoute] = useState(() => readPageRoute(window.location.hash))
  useEffect(() => {
    function navigate() { setRoute(readPageRoute(window.location.hash)) }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => {
    let frame
    function scrollToPage() {
      document.getElementById('main-content')?.focus({ preventScroll: true })
      const section = route.section && document.getElementById(route.section)
      if (section) section.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    function scheduleScroll() { frame = requestAnimationFrame(scrollToPage) }
    scheduleScroll()
    // No primeiro carregamento, a âncora do navegador pode alterar a rolagem.
    if (document.readyState !== 'complete') window.addEventListener('load', scheduleScroll, { once: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('load', scheduleScroll)
    }
  }, [route])
  return route
}
