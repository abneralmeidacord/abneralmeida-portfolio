import { profile } from '../../data/profile.js'
import { designIcons } from '../../data/designAssets.js'
import './SocialLinks.css'
export default function SocialLinks() {
  const links = [
    { name: 'LinkedIn', href: profile.linkedin, image: designIcons.linkedin },
    { name: 'Instagram', href: profile.instagram, image: designIcons.instagram },
    { name: 'E-mail', href: 'mailto:' + profile.email, image: designIcons.gmail },
    { name: 'GitHub', href: profile.github, image: designIcons.github },
    { name: 'WhatsApp', href: profile.whatsapp, image: designIcons.whatsapp },
  ]
  return <div className="social-links">{links.map(({name, href, image}) => <a href={href} target="_blank" rel="noreferrer" key={name} aria-label={name} title={name} className={name === 'E-mail' ? 'social-email' : undefined}><img src={image} alt="" loading="lazy" /></a>)}</div>
}
