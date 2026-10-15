import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const storageKey = 'portfolio-theme'
const validTheme = value => value === 'dark' || value === 'light'

function readPreference() {
  try {
    const value = localStorage.getItem(storageKey)
    return validTheme(value) ? value : null
  } catch { return null }
}

function applyTheme(theme) {
  // Update tokens before React renders themed components such as the 3D globe.
  document.documentElement.dataset.theme = theme
  const background = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background)
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const explicitPreference = useRef(false)
  const changeTheme = useCallback(next => {
    applyTheme(next)
    setTheme(next)
  }, [])

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    explicitPreference.current = readPreference() !== null
    const onSystemChange = event => {
      if (!explicitPreference.current) changeTheme(event.matches ? 'dark' : 'light')
    }
    const onStorageChange = event => {
      if (event.key !== storageKey && event.key !== null) return
      const saved = validTheme(event.newValue) ? event.newValue : null
      explicitPreference.current = saved !== null
      changeTheme(saved || (system.matches ? 'dark' : 'light'))
    }
    system.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorageChange)
    return () => {
      system.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorageChange)
    }
  }, [changeTheme])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    explicitPreference.current = true
    changeTheme(next)
    try { localStorage.setItem(storageKey, next) } catch { /* The toggle still works without storage. */ }
  }, [theme, changeTheme])

  return useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
}
