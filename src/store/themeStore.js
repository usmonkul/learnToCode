import { create } from 'zustand'

const STORAGE_KEY = 'theme-preference'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(preference) {
  return preference === 'system' ? getSystemTheme() : preference
}

function applyTheme(resolved) {
  document.documentElement.setAttribute('data-theme', resolved)
}

function readStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
}

const initialPreference = readStoredPreference()
const initialResolvedTheme = resolveTheme(initialPreference)
applyTheme(initialResolvedTheme)

export const useThemeStore = create((set) => ({
  preference: initialPreference,
  resolvedTheme: initialResolvedTheme,
  setPreference: (preference) => {
    localStorage.setItem(STORAGE_KEY, preference)
    const resolvedTheme = resolveTheme(preference)
    applyTheme(resolvedTheme)
    set({ preference, resolvedTheme })
  },
}))

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (useThemeStore.getState().preference !== 'system') return
  const resolvedTheme = event.matches ? 'dark' : 'light'
  applyTheme(resolvedTheme)
  useThemeStore.setState({ resolvedTheme })
})
