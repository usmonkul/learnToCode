import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Eye,
  EyeOff,
  Flame,
  Github,
  Loader2,
  Lock,
  Mail,
  User,
} from 'lucide-react'
import { signInWithPassword, signUpWithPassword, signInWithOAuth } from '@/store/authStore'
import { cn } from '@/lib/cn'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-md border bg-canvas py-2 pl-9 pr-9 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:outline-none focus:ring-2'
const inputOk = 'border-line focus:border-brand-500 focus:ring-brand-500/20'
const inputError = 'border-red-400 focus:border-red-500 focus:ring-red-500/20'

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.48c-.28 1.5-1.14 2.77-2.41 3.62v3.01h3.89c2.28-2.1 3.56-5.19 3.56-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.89-3.01c-1.08.73-2.46 1.16-4.06 1.16-3.12 0-5.76-2.11-6.7-4.94H1.29v3.11C3.26 21.31 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.29A7.2 7.2 0 0 1 4.92 12c0-.8.14-1.57.38-2.29V6.6H1.29A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.29 5.4z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.3 0 3.26 2.69 1.29 6.6l4.01 3.11C6.24 6.88 8.88 4.75 12 4.75z"
      />
    </svg>
  )
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{message}</p>
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [mode, setMode] = useState('signIn')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function switchMode(nextMode) {
    setMode(nextMode)
    setFieldErrors({})
    setAuthError('')
    setConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  function clearFieldError(field) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  function validate() {
    const errors = {}
    if (mode === 'signUp' && !fullName.trim()) {
      errors.fullName = "Ismingizni kiriting"
    }
    if (!EMAIL_RE.test(email)) {
      errors.email = "Email manzilini to'g'ri kiriting"
    }
    if (password.length < 6) {
      errors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
    }
    if (mode === 'signUp' && confirmPassword !== password) {
      errors.confirmPassword = "Parollar mos kelmadi"
    }
    return errors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setAuthError('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    const { error } =
      mode === 'signIn'
        ? await signInWithPassword(email, password)
        : await signUpWithPassword(email, password, fullName.trim())
    setSubmitting(false)

    if (error) {
      setAuthError(error.message)
      return
    }
    navigate(redirect, { replace: true })
  }

  async function handleOAuth(provider) {
    setAuthError('')
    const { error } = await signInWithOAuth(provider, redirect)
    if (error) setAuthError(error.message)
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifa
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-ink">
            {mode === 'signIn' ? "Xush kelibsiz" : "Hisob yarating"}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {mode === 'signIn'
              ? "Davom etish uchun hisobingizga kiring."
              : "Progressingizni saqlash uchun ro'yxatdan o'ting."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-canvas-muted p-1">
            <button
              type="button"
              onClick={() => switchMode('signIn')}
              className={cn(
                'rounded-full py-1.5 text-sm font-medium transition-colors',
                mode === 'signIn' ? 'bg-canvas text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
              )}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => switchMode('signUp')}
              className={cn(
                'rounded-full py-1.5 text-sm font-medium transition-colors',
                mode === 'signUp' ? 'bg-canvas text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
              )}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {authError && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
            {mode === 'signUp' && (
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-ink">
                  Ism-familiya
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Alisher Navoiy"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value)
                      clearFieldError('fullName')
                    }}
                    className={cn(inputBase, 'pr-3', fieldErrors.fullName ? inputError : inputOk)}
                  />
                </div>
                <FieldError message={fieldErrors.fullName} />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="siz@misol.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    clearFieldError('email')
                  }}
                  className={cn(inputBase, 'pr-3', fieldErrors.email ? inputError : inputOk)}
                />
              </div>
              <FieldError message={fieldErrors.email} />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-ink">
                Parol
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    clearFieldError('password')
                  }}
                  className={cn(inputBase, fieldErrors.password ? inputError : inputOk)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError message={fieldErrors.password} />
            </div>

            {mode === 'signUp' && (
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-ink">
                  Parolni tasdiqlang
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value)
                      clearFieldError('confirmPassword')
                    }}
                    className={cn(inputBase, fieldErrors.confirmPassword ? inputError : inputOk)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                    aria-label={showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError message={fieldErrors.confirmPassword} />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signIn' ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-ink-muted">yoki</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-canvas-muted"
            >
              <GoogleIcon className="h-4 w-4" />
              Google orqali {mode === 'signIn' ? "kirish" : "ro'yxatdan o'tish"}
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('github')}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-canvas-muted"
            >
              <Github className="h-4 w-4" />
              GitHub orqali {mode === 'signIn' ? "kirish" : "ro'yxatdan o'tish"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 lg:flex lg:flex-col lg:justify-center lg:px-14">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative max-w-sm">
          <p className="text-sm font-semibold text-brand-100">Darsliklar</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Progressingiz siz bilan qoladi</h2>
          <p className="mt-3 text-brand-100">
            Kirgandan so'ng tugallangan darslaringiz va kunlik ketma-ketligingiz saqlanadi — istalgan
            qurilmadan davom eting.
          </p>

          <div className="mt-8 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white">
              <Flame className="h-5 w-5 text-orange-300" />
              <span className="font-semibold">5 kunlik ketma-ketlik</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {["Git nima?", "O'zgaruvchilar", "SELECT va FROM"].map((title) => (
                <li key={title} className="flex items-center gap-2 text-sm text-brand-50">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-xs text-brand-200">
            Namuna ko'rinish — kirgandan so'ng bu sizning haqiqiy progressingiz bo'ladi.
          </p>
        </div>
      </div>
    </div>
  )
}
