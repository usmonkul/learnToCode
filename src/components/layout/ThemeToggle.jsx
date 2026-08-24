import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

const ORDER = ['light', 'dark', 'system']
const ICONS = { light: Sun, dark: Moon, system: Monitor }
const LABELS = { light: "Yorug'", dark: "Qorong'i", system: 'Tizim' }

export default function ThemeToggle() {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const Icon = ICONS[preference]

  function handleClick() {
    const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length]
    setPreference(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full p-2 text-ink-muted hover:bg-canvas hover:text-ink"
      aria-label={`Mavzu: ${LABELS[preference]}. Almashtirish uchun bosing.`}
      title={`Mavzu: ${LABELS[preference]}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
