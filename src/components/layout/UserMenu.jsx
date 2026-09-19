import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { useAuthStore, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import Avatar from '@/components/ui/Avatar'
import ThemeToggle from '@/components/layout/ThemeToggle'

// Header action cluster, left to right: streak, theme toggle, profile.
// Logout lives on the profile page only.
export default function UserMenu() {
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)

  if (status === 'loading') return <ThemeToggle />

  if (status === 'signedOut') {
    return (
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <Link
          to="/login"
          className="rounded-full bg-brand-200 px-4 py-2 text-sm font-medium text-brand-800 hover:bg-brand-300 dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-900"
        >
          Kirish
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <span
        className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5 text-sm font-semibold tabular-nums text-ink"
        title={`Eng uzun ketma-ketlik: ${streak.longest} kun`}
        aria-label={`Kunlik ketma-ketlik: ${streak.current} kun`}
      >
        <Flame className="h-4 w-4 text-brand-600" />
        {streak.current}
      </span>
      <ThemeToggle />
      <Link
        to="/profile"
        className="ml-0.5 rounded-full ring-offset-2 ring-offset-canvas-muted transition-shadow hover:ring-2 hover:ring-brand-500/40"
        aria-label="Profil"
        title="Profil"
      >
        <Avatar src={getAvatarUrl(user)} name={getDisplayName(user)} size="sm" />
      </Link>
    </div>
  )
}
