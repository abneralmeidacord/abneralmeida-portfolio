// Datas têm precisão de mês. Sem datas exatas, preservamos a duração informada.
function monthIndex(value) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value)
  if (!match) throw new RangeError('Use datas no formato AAAA-MM')
  return Number(match[1]) * 12 + Number(match[2]) - 1
}

function currentMonth(now) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit',
  }).formatToParts(now)
  return Number(parts.find(part => part.type === 'year').value) * 12
    + Number(parts.find(part => part.type === 'month').value) - 1
}

function interval(item, now) {
  const start = monthIndex(item.startDate)
  const end = Math.min(item.endDate ? monthIndex(item.endDate) : Infinity, currentMonth(now))
  return [start, Math.max(start, end)]
}

export function getExperienceMonths(item, now = new Date()) {
  if (!item.startDate) return item.durationMonths ?? 0
  const [start, end] = interval(item, now)
  return end - start
}

export function getTotalExperienceMonths(items, now = new Date()) {
  let total = items.filter(item => !item.startDate).reduce((sum, item) => sum + getExperienceMonths(item, now), 0)
  const periods = items.filter(item => item.startDate).map(item => interval(item, now)).sort((a, b) => a[0] - b[0])
  let previousEnd = -Infinity
  // A união dos intervalos evita somar duas vezes os vínculos simultâneos.
  for (const [start, end] of periods) {
    total += Math.max(0, end - Math.max(start, previousEnd))
    previousEnd = Math.max(previousEnd, end)
  }
  return total
}

export function getDurationParts(totalMonths, language) {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const pt = language === 'pt'
  return {
    years, months,
    yearLabel: pt ? (years === 1 ? 'ano' : 'anos') : (years === 1 ? 'year' : 'years'),
    monthLabel: pt ? (months === 1 ? 'mês' : 'meses') : (months === 1 ? 'month' : 'months'),
  }
}

export function formatExperienceDuration(totalMonths, language) {
  const { years, months, yearLabel, monthLabel } = getDurationParts(totalMonths, language)
  const parts = []
  if (years) parts.push(`${years} ${yearLabel}`)
  if (months || !years) parts.push(`${months} ${monthLabel}`)
  return parts.join(language === 'pt' ? ' e ' : ' & ')
}
