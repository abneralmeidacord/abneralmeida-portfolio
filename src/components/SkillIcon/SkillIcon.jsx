import './SkillIcon.css'

export default function SkillIcon({ skill, className, ...props }) {
  if (skill.image) {
    return <img src={skill.image} alt="" width="40" height="40" draggable={false}
      className={[className, 'skill-logo', skill.name === 'Affinity' ? 'skill-logo--affinity' : null].filter(Boolean).join(' ')} {...props} />
  }
  const Icon = skill.icon
  return <Icon className={className} {...props} />
}
