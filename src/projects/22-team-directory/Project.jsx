import { Users, UserRound, Github, Linkedin, Mail } from 'lucide-react'

const TEAM = [
  {
    name: 'Malika Yusupova',
    role: 'Frontend dasturchi',
    bio: "Foydalanuvchi interfeyslarini puxta va tez ishlaydigan qilib yaratadi.",
  },
  {
    name: 'Javlon Tursunov',
    role: 'Backend dasturchi',
    bio: "Server tomonidagi mantiq va ma'lumotlar bazasi uchun javobgar.",
  },
  {
    name: 'Nilufar Rashidova',
    role: 'UI/UX dizayner',
    bio: "Mahsulotning ko'rinishi va foydalanish qulayligini o'ylab chizadi.",
  },
  {
    name: 'Sardor Aliyev',
    role: 'Loyiha menejeri',
    bio: 'Jamoa ishini rejalashtiradi va muddatlarga rioya qilinishini nazorat qiladi.',
  },
  {
    name: 'Kamola Ergasheva',
    role: 'Marketing mutaxassisi',
    bio: "Mahsulotni foydalanuvchilarga to'g'ri yetkazish strategiyasini quradi.",
  },
  {
    name: 'Otabek Nazarov',
    role: 'QA muhandisi',
    bio: "Har bir yangilanishni chiqishdan oldin sinovdan o'tkazadi.",
  },
]

export default function TeamDirectoryProject() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <nav className="flex items-center justify-between gap-4 bg-white px-6 py-4 shadow-sm md:px-12">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
            <Users className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-slate-900">Jamoa</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <span className="hidden text-slate-900 sm:inline">Bosh sahifa</span>
          <span className="hidden sm:inline">Loyihalar</span>
          <span className="hidden sm:inline">Aloqa</span>
        </div>
      </nav>

      <header className="flex flex-col items-center gap-3 px-4 py-14 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Bizning jamoa</h1>
        <p className="max-w-md text-slate-500">
          Mahsulotni birgalikda yaratayotgan odamlar bilan tanishing.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-6 px-4 pb-20 md:px-12">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="flex w-full max-w-xs flex-1 basis-64 flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-md"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserRound className="h-8 w-8" />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">{member.name}</h2>
              <p className="text-sm text-indigo-600">{member.role}</p>
            </div>
            <p className="text-sm text-slate-500">{member.bio}</p>

            <div className="mt-auto flex items-center gap-3 pt-2">
              <button
                type="button"
                aria-label="Github"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Linkedin"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
