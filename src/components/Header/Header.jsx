import { useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import './Header.css'
const sections = ['#/sobre', '#/habilidades', '#/experiencias']
export default function Header({ text, language, setLanguage, route }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-logo" href="#/" aria-label="Abner Almeida" onClick={() => setMenuOpen(false)}>abner<span>.</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? text.closeMenu : text.menu} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>
          {sections.map((href, index) => <a key={href} href={href} aria-current={((index === 0 && route.page === 'about') || (index === 1 && route.page === 'skills') || (index === 2 && route.page === 'experiences')) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{text.nav[index]}</a>)}
          <a className="button header-contact" href="#/contato" onClick={() => setMenuOpen(false)}>{text.contactNav}<FiArrowUpRight /></a>
        </nav>
        <div className="language-switch" aria-label="Language / Idioma">
          {['pt', 'en'].map(item => <button key={item} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
        </div>
      </div>
    </header>
  )
}
