import {
  SiHtml5, SiJavascript, SiReact, SiTypescript, SiFigma, SiPython, SiBootstrap, SiGit, SiNextdotjs,
  SiJson, SiMdx, SiExpo, SiDocker, SiPostman, SiInsomnia, SiNotion, SiMiro, SiClickup,
  SiN8N, SiMake, SiApachenetbeanside, SiStyledcomponents, SiNodedotjs,
} from 'react-icons/si'
import { FaJava, FaGithub, FaCss3Alt } from 'react-icons/fa'
import { FiGitBranch } from 'react-icons/fi'
import { BsBraces } from 'react-icons/bs'
import canvaLogo from '../assets/icons/canva.svg'
import affinityLogo from '../assets/icons/affinity.svg'
import zustandLogo from '../assets/icons/zustand.svg'
export const skills = [
  { name: 'HTML', category: 'languages', icon: SiHtml5, color: 'var(--color-html)', link: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML' },
  { name: 'CSS', category: 'languages', icon: FaCss3Alt, color: 'var(--color-css)', link: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS' },
  { name: 'JavaScript', category: 'languages', icon: SiJavascript, color: 'var(--color-javascript)', link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' },
  { name: 'React', category: 'frameworks', icon: SiReact, color: 'var(--color-react)', link: 'https://react.dev/' },
  { name: 'TypeScript', category: 'languages', icon: SiTypescript, color: 'var(--color-typescript)', link: 'https://www.typescriptlang.org/' },
  { name: 'Figma', category: 'design', icon: SiFigma, color: 'var(--color-figma)', link: 'https://www.figma.com/' },
  { name: 'Git', category: 'tools', icon: SiGit, color: 'var(--color-git)', link: 'https://git-scm.com/' },
  { name: 'GitHub', category: 'tools', icon: FaGithub, color: 'var(--color-primary)', link: 'https://github.com/abneralmeidacord' },
  { name: 'Next.js', category: 'frameworks', icon: SiNextdotjs, color: 'var(--color-text)', link: 'https://nextjs.org/' },
  { name: 'Python', category: 'languages', icon: SiPython, color: 'var(--color-python)', link: 'https://www.python.org/' },
  { name: 'Bootstrap', category: 'frameworks', icon: SiBootstrap, color: 'var(--color-bootstrap)', link: 'https://getbootstrap.com/' },
  { name: 'Java', category: 'languages', icon: FaJava, color: 'var(--color-java)', link: 'https://dev.java/' },
  { name: 'JSON', category: 'languages', icon: SiJson, color: 'var(--color-primary)', link: 'https://www.json.org/json-en.html' },
  { name: 'MDX', category: 'languages', icon: SiMdx, color: 'var(--color-primary)', link: 'https://mdxjs.com/' },
  { name: 'React Native', category: 'frameworks', icon: SiReact, color: 'var(--color-react)', link: 'https://reactnative.dev/' },
  { name: 'Expo', category: 'frameworks', icon: SiExpo, color: 'var(--color-text)', link: 'https://expo.dev/' },
  { name: 'Zustand', category: 'frameworks', image: zustandLogo, color: 'var(--color-zustand)', link: 'https://zustand.docs.pmnd.rs/' },
  { name: 'Expo Router', category: 'frameworks', icon: FiGitBranch, color: 'var(--color-react)', link: 'https://expo.dev/router' },
  { name: 'Docker', category: 'tools', icon: SiDocker, color: 'var(--color-docker)', link: 'https://www.docker.com/' },
  { name: 'Canva', category: 'design', image: canvaLogo, color: 'var(--color-canva)', link: 'https://www.canva.com/' },
  { name: 'Postman', category: 'tools', icon: SiPostman, color: 'var(--color-postman)', link: 'https://www.postman.com/' },
  { name: 'Insomnia', category: 'tools', icon: SiInsomnia, color: 'var(--color-insomnia)', link: 'https://insomnia.rest/' },
  { name: 'Notion', category: 'tools', icon: SiNotion, color: 'var(--color-text)', link: 'https://www.notion.com/' },
  { name: 'Miro', category: 'design', icon: SiMiro, color: 'var(--color-miro)', link: 'https://miro.com/' },
  { name: 'ClickUp', category: 'tools', icon: SiClickup, color: 'var(--color-clickup)', link: 'https://clickup.com/' },
  { name: 'json-server', category: 'tools', icon: BsBraces, color: 'var(--color-primary)', link: 'https://github.com/typicode/json-server' },
  { name: 'n8n', category: 'tools', icon: SiN8N, color: 'var(--color-n8n)', link: 'https://n8n.io/' },
  { name: 'Make.com', category: 'tools', icon: SiMake, color: 'var(--color-make)', link: 'https://www.make.com/' },
  { name: 'NetBeans', category: 'tools', icon: SiApachenetbeanside, color: 'var(--color-netbeans)', link: 'https://netbeans.apache.org/' },
  { name: 'styled-components', category: 'frameworks', icon: SiStyledcomponents, color: 'var(--color-styled-components)', link: 'https://styled-components.com/' },
  { name: 'Node.js', category: 'tools', icon: SiNodedotjs, color: 'var(--color-node)', link: 'https://nodejs.org/' },
  { name: 'Affinity', category: 'design', image: affinityLogo, color: 'var(--color-affinity)', link: 'https://www.affinity.studio/' },
]
