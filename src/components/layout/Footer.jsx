import { Link } from 'react-router-dom'
import { getAllCourses } from '@/courses/registry'

export default function Footer() {
  const courses = getAllCourses()

  return (
    <footer className="bg-[#16140f] px-12 pb-9 pt-14 text-[#f5f4ef]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center font-heading text-lg text-[#f5f4ef]">
            Yaratuvchi.uz
          </Link>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-[#f5f4ef]/60">
            O'zbek tilidagi bepul dasturlash darsliklari — mantiqiy fikrlashdan to'liq web ilovagacha.
          </p>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-[#f5f4ef]/45">Kurslar</p>
          <div className="flex flex-col gap-2.5">
            {courses.map((course) => (
              <Link key={course.id} to={`/${course.id}`} className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
                {course.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-[#f5f4ef]/45">Platforma</p>
          <div className="flex flex-col gap-2.5">
            <Link to="/arena" className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
              Arena masalalari
            </Link>
            <Link to="/profile" className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
              Mening progressim
            </Link>
            <Link to="/login" className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
              Kirish
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-[#f5f4ef]/45">Loyiha</p>
          <div className="flex flex-col gap-2.5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-11 flex max-w-6xl items-center justify-between gap-5 border-t border-[#f5f4ef]/10 pt-5">
        <p className="text-sm text-[#f5f4ef]/45">© 2026 Yaratuvchi.uz. Ochiq kodli loyiha.</p>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-[#f5f4ef]/70 hover:text-brand-300">
          GitHub
        </a>
      </div>
    </footer>
  )
}
