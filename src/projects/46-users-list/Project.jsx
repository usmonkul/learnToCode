import { useEffect, useState } from 'react'
import { Building2, Mail, MapPin, Phone, RefreshCw, UsersRound } from 'lucide-react'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
const BROKEN_URL = 'https://jsonplaceholder.typicode.com/userss' // xato holatini sinash uchun

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 rounded bg-slate-200" />
          <div className="h-3 w-1/3 rounded bg-slate-200" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 rounded bg-slate-100" />
        <div className="h-3 w-4/5 rounded bg-slate-100" />
      </div>
    </div>
  )
}

export default function UsersListProject() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [url, setUrl] = useState(API_URL)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false // komponent yopilsa yoki qayta so'rov ketsa, eski javobni e'tiborsiz qoldiramiz

    async function loadUsers() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Server xatosi: ${response.status}`)
        const data = await response.json()
        if (!ignore) setUsers(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadUsers()
    return () => {
      ignore = true
    }
  }, [url, reloadKey])

  function reload(nextUrl) {
    setUsers([])
    setUrl(nextUrl)
    setReloadKey((key) => key + 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200">
          <UsersRound className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Foydalanuvchilar</h1>
        <p className="mt-2 text-slate-500">Ma'lumotlar JSONPlaceholder API'dan yuklanadi.</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => reload(API_URL)}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" /> Qayta yuklash
          </button>
          <button
            type="button"
            onClick={() => reload(BROKEN_URL)}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white"
          >
            Xatoni sinash
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">Ma'lumotlarni yuklab bo'lmadi</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => reload(API_URL)}
              className="mt-4 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Qayta urinish
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {user.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">@{user.username}</p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-slate-400" /> {user.email.toLowerCase()}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-slate-400" /> {user.phone}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" /> {user.address.city}
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 shrink-0 text-slate-400" /> {user.company.name}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
