import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Flame, Swords } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-ink">Dasturlashni o'z sur'atingizda o'rganing</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Git, Python, SQL, React va boshqa kurslar — bosqichma-bosqich, amaliy mashqlar bilan.
        </p>
        <Link
          to="/kurslar"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Kurslarni ko'rish
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-line p-5">
          <BookOpen className="h-6 w-6 text-brand-600" />
          <h2 className="mt-3 font-semibold text-ink">Amaliy kurslar</h2>
          <p className="mt-1 text-sm text-ink-muted">Har bir mavzu tushuntirish va mashqlar bilan tushuntiriladi.</p>
        </div>
        <div className="rounded-lg border border-line p-5">
          <Flame className="h-6 w-6 text-brand-600" />
          <h2 className="mt-3 font-semibold text-ink">Progressni kuzating</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Tugallangan darslar va kunlik ketma-ketligingizni (streak) ko'ring.
          </p>
        </div>
        <div className="rounded-lg border border-line p-5">
          <Swords className="h-6 w-6 text-brand-600" />
          <h2 className="mt-3 font-semibold text-ink">Arena</h2>
          <p className="mt-1 text-sm text-ink-muted">Masalalarni yeching va bilimingizni sinab ko'ring.</p>
        </div>
      </div>
    </div>
  )
}
