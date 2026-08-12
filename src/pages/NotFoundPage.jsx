import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink">Sahifa topilmadi</h1>
      <p className="mt-2 text-ink-muted">
        Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
