import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Quote } from 'lucide-react'
import { getAllCourses, getLessons } from '@/courses/registry'
import { getChallenges, getTopics } from '@/arena/registry'
import { cn } from '@/lib/cn'
import CourseCard from '@/components/layout/CourseCard'
import Footer from '@/components/layout/Footer'

const TESTIMONIALS = [
  {
    quote:
      "Mantiq kursidan boshladim — birinchi marta «algoritm» degan so'z qo'rqitmadi. Ikki oyda Python'da yakuniy loyihani yozdim.",
    initials: 'MK',
    name: 'Madina Karimova',
    role: 'Talaba, Namangan',
    tone: 'brand',
  },
  {
    quote:
      "SQL darslaridagi maydoncha hammasini o'zgartirdi: o'qib, darhol so'rov yozib ko'rasiz. Arenadagi 12 masalani ish uchun mashq qildim.",
    initials: 'JT',
    name: "Jasur To'rayev",
    role: 'Sotuvdan analitikaga oʼtdi',
    tone: 'brand2',
  },
  {
    quote: "Git kursi 29 ta qisqa darsdan iborat — kuniga bittasi. Streak ko'rinib turgani uchun tashlab ketmadim.",
    initials: 'SA',
    name: 'Sarvar Aliyev',
    role: "Frontend'ni o'rganmoqda",
    tone: 'brand',
  },
]

export default function HomePage() {
  const courses = getAllCourses()
  const lessonCount = courses.reduce((total, course) => total + getLessons(course.id).length, 0)
  const arenaChallengeCount = getTopics().reduce((total, topic) => total + getChallenges(topic.id).length, 0)

  return (
    <div>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div>
            <span className="rounded-full bg-brand2-100 px-3.5 py-1.5 text-xs font-medium text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
              Bepul · O'zbek tilida
            </span>
            <h1 className="mt-5 max-w-[15ch] text-5xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
              Kod yozishni noldan o'rganing
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
              Mantiqiy fikrlashdan boshlab Git, Python, SQL va React'gacha — har bir dars tushuntirish, misol va
              amaliy mashq bilan. Kompyuter oldida ham, daftar bilan ham.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/kurslar"
                className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
              >
                Kurslarni ko'rish <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/arena"
                className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink hover:bg-canvas"
              >
                Arenani sinash
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-6">
              <div>
                <p className="font-heading text-2xl text-ink">{courses.length}</p>
                <p className="mt-0.5 text-sm text-ink-muted">kurs</p>
              </div>
              <span className="h-8 w-px bg-line" />
              <div>
                <p className="font-heading text-2xl text-ink">{lessonCount}</p>
                <p className="mt-0.5 text-sm text-ink-muted">dars</p>
              </div>
              <span className="h-8 w-px bg-line" />
              <div>
                <p className="font-heading text-2xl text-ink">{arenaChallengeCount}</p>
                <p className="mt-0.5 text-sm text-ink-muted">Arena masalasi</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[40px] bg-gradient-to-br from-brand2-200 to-brand-200 dark:from-brand2-900 dark:to-brand-900" />
            <div className="absolute -bottom-6 -left-6 w-56 rounded-3xl bg-canvas p-5 shadow-lg">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-brand-600" />
                <span className="font-heading text-base text-ink">5 kunlik ketma-ketlik</span>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {[1, 1, 1, 1, 1, 0, 0].map((filled, index) => (
                  <span
                    key={index}
                    className={cn('h-2 flex-1 rounded-full', filled ? 'bg-brand-600' : 'bg-canvas-muted')}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-xs text-ink-muted">Bugun 1 dars qoldi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[40px] bg-brand2-100 p-10 lg:p-12 dark:bg-brand2-950">
          <p className="text-xs font-medium uppercase tracking-[.12em] text-brand2-700 dark:text-brand2-300">Qanday ishlaydi</p>
          <h2 className="mt-2.5 max-w-[24ch] text-3xl text-ink">Uch qadamda birinchi darsingizgacha</h2>
          <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: 'Kursni tanlang',
                body: "Yetti kurs — mantiqiy fikrlashdan Supabase'gacha. Tajribangiz bo'lmasa, «Mantiqiy va Algoritmik Fikrlash»dan boshlang.",
              },
              {
                step: 2,
                title: "O'qing va yozib ko'ring",
                body: "Har bir darsda tushuntirish, kod misoli, mashq va test bor. SQL darslarida so'rovni to'g'ridan-to'g'ri sahifada bajarasiz.",
              },
              {
                step: 3,
                title: 'Ketma-ketlikni uzmang',
                body: 'Tugallangan darslar va kunlik streak profilingizda saqlanadi — istalgan qurilmadan davom etasiz.',
              },
            ].map(({ step, title, body }) => (
              <div key={step}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand2-300 font-heading text-2xl text-brand2-900 dark:bg-brand2-800 dark:text-brand2-200">
                  {step}
                </span>
                <h3 className="mt-4.5 text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.12em] text-brand-700 dark:text-brand-300">Kurslar</p>
            <h2 className="mt-2.5 text-3xl text-ink">Nimalarni o'rganasiz</h2>
          </div>
          <Link
            to="/kurslar"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-canvas"
          >
            Barchasi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-xs font-medium uppercase tracking-[.12em] text-brand-700 dark:text-brand-300">O'quvchilar fikri</p>
        <h2 className="mt-2.5 max-w-[26ch] text-3xl text-ink">Noldan boshlaganlar nima deydi</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="rounded-3xl bg-canvas-muted p-6">
              <Quote className="h-5 w-5 text-brand-600" />
              <p className="mt-3.5 text-base leading-relaxed text-ink">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full font-heading text-sm',
                    item.tone === 'brand2'
                      ? 'bg-brand2-200 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400'
                      : 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-400'
                  )}
                >
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-start gap-6 rounded-[40px] bg-brand-200 p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12 dark:bg-brand-900">
          <div>
            <h2 className="max-w-[22ch] text-3xl text-ink">Bugun birinchi darsni tugatib qo'ying</h2>
            <p className="mt-3 max-w-[44ch] text-base text-brand-900 dark:text-brand-100">
              Ro'yxatdan o'tish bepul. Progress va kunlik ketma-ketlik hisobingizda saqlanadi.
            </p>
          </div>
          <div className="flex flex-none gap-3">
            <Link
              to="/login"
              className="rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
            >
              Bepul boshlash
            </Link>
            <Link
              to="/kurslar"
              className="rounded-full border border-brand-400 px-6 py-3.5 text-sm font-semibold text-brand-800 hover:bg-brand-100 dark:border-brand-600 dark:text-brand-100 dark:hover:bg-brand-800"
            >
              Kurslar ro'yxati
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
