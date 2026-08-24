import { useState } from 'react'
import { cn } from '@/lib/cn'

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-xl',
}

function getInitials(name) {
  if (!name) return '?'
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
  return initials || '?'
}

export default function Avatar({ src, name, size = 'md', className }) {
  const [errored, setErrored] = useState(false)

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={name ? `${name} avatari` : "Foydalanuvchi avatari"}
        onError={() => setErrored(true)}
        className={cn('shrink-0 rounded-full object-cover', SIZE_CLASSES[size], className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={name ? `${name} avatari` : "Foydalanuvchi avatari"}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-200',
        SIZE_CLASSES[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
