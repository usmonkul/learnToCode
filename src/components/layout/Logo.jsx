export default function Logo({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 4 12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M18 4 12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 12 12 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" fillOpacity="0.55" />
    </svg>
  )
}
