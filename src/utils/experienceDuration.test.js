import { test } from 'node:test'
import assert from 'node:assert/strict'
import { experiences } from '../data/experiences.js'
import { formatExperienceDuration, getExperienceMonths, getTotalExperienceMonths } from './experienceDuration.js'

const october = new Date('2026-10-15T12:00:00Z')

test('dados atuais: 35 meses anteriores mais um mês na PUC, sem duplicar vínculos', () => {
  assert.equal(getTotalExperienceMonths(experiences, october), 36)
  assert.equal(getExperienceMonths(experiences[3], october), 1)
  assert.equal(getExperienceMonths(experiences[4], october), 1)
})

test('recalcula os vínculos em andamento e não conta datas futuras', () => {
  assert.equal(getTotalExperienceMonths(experiences, new Date('2027-01-15T12:00:00Z')), 39)
  assert.equal(getExperienceMonths({ startDate: '2026-11' }, october), 0)
})

test('soma períodos separados, preserva intervalos sem trabalho e une sobreposições', () => {
  const items = [
    { startDate: '2025-09', endDate: '2026-02' },
    { startDate: '2025-01', endDate: '2025-04' },
    { startDate: '2025-11', endDate: '2026-01' },
    { startDate: '2026-01', endDate: '2026-03' },
  ]
  assert.equal(getTotalExperienceMonths(items, october), 9)
})

test('um vínculo encerrado não continua crescendo', () => {
  assert.equal(getExperienceMonths({ startDate: '2024-12', endDate: '2025-05' }, october), 5)
})

test('formata anos e meses em PT/EN, incluindo singular e virada do ano', () => {
  assert.equal(formatExperienceDuration(0, 'pt'), '0 meses')
  assert.equal(formatExperienceDuration(1, 'pt'), '1 mês')
  assert.equal(formatExperienceDuration(12, 'pt'), '1 ano')
  assert.equal(formatExperienceDuration(13, 'pt'), '1 ano e 1 mês')
  assert.equal(formatExperienceDuration(35, 'pt'), '2 anos e 11 meses')
  assert.equal(formatExperienceDuration(36, 'en'), '3 years')
  assert.equal(formatExperienceDuration(13, 'en'), '1 year & 1 month')
})
