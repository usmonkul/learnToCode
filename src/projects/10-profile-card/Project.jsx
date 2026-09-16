import { useState } from 'react'
import { UserRound, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function ProfileCardProject() {
  const [following, setFollowing] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4 py-20">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="h-24 bg-gradient-to-r from-fuchsia-500 to-orange-400" />
        <div className="-mt-12 flex flex-col items-center px-6 pb-8">
          <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-400">
            <UserRound className="h-12 w-12" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Dilnoza Karimova</h1>
          <p className="text-sm text-slate-500">Frontend dasturchi</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5" /> Toshkent, O'zbekiston
          </p>

          <div className="mt-6 grid w-full grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-slate-50 py-4 text-center">
            <div>
              <p className="text-lg font-bold text-slate-900">128</p>
              <p className="text-xs text-slate-400">loyiha</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">4.2k</p>
              <p className="text-xs text-slate-400">obunachi</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">312</p>
              <p className="text-xs text-slate-400">obuna</p>
            </div>
          </div>

          <button
            onClick={() => setFollowing((f) => !f)}
            className={cn(
              'mt-6 w-full rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
              following ? 'bg-slate-100 text-slate-900' : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'
            )}
          >
            {following ? "Obuna bo'lingan" : "Obuna bo'lish"}
          </button>
        </div>
      </div>
    </div>
  )
}
