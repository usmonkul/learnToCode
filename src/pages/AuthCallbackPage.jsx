import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const status = useAuthStore((state) => state.status)
  const oauthError = searchParams.get('error_description')
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (status === 'signedIn') navigate(redirect, { replace: true })
  }, [status, navigate, redirect])

  if (oauthError) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-ink">Tizimga kirishda xatolik yuz berdi.</p>
        <p className="mt-2 text-sm text-ink-muted">{oauthError}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center text-ink-muted">
      Tizimga kirilmoqda...
    </div>
  )
}
