import { Link } from 'react-router-dom'
import { Flame, LogOut } from 'lucide-react'
import { useAuthStore, signOut, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import Avatar from '@/components/ui/Avatar'

export default function UserMenu() {
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)

  if (status === 'loading') return null

  if (status === 'signedOut') {
    return (
      <Link
        to="/login"
        className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted hover:bg-canvas-muted hover:text-ink"
      >
        Kirish
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <span
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-ink-muted"
        title={`Eng uzun ketma-ketlik: ${streak.longest} kun`}
      >
        <Flame className="h-4 w-4 text-brand-600" />
        {streak.current}
      </span>
      <Link
        to="/profile"
        className="rounded-full ring-offset-2 ring-offset-canvas transition-shadow hover:ring-2 hover:ring-brand-500/40"
        aria-label="Profil"
        title="Profil"
      >
        <Avatar src={getAvatarUrl(user)} name={getDisplayName(user)} size="sm" />
      </Link>
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-md p-2 text-ink-muted hover:bg-canvas-muted hover:text-ink"
        aria-label="Chiqish"
        title="Chiqish"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}
