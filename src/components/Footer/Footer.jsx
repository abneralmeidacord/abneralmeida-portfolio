import { FiArrowUpRight } from 'react-icons/fi'
import './Footer.css'
export default function Footer({ text }) {
  return <footer className="container footer"><p>© {new Date().getFullYear()} Abner Almeida<span>{text.footer}</span></p><a href="#/">{text.backTop}<FiArrowUpRight /></a></footer>
}
