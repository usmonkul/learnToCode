import { Swords } from 'lucide-react'

export default function ArenaPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <Swords className="h-10 w-10 text-brand-600" />
      <h1 className="mt-4 text-2xl font-bold text-ink">Arena</h1>
      <p className="mt-2 text-ink-muted">
        Bu yerda tez orada dasturlash masalalarini yechib, bilimingizni sinab ko'rasiz. Hozircha ishlab
        chiqilmoqda.
      </p>
    </div>
  )
}
