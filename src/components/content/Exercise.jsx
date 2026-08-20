export default function Exercise({ title = 'Mashq', children }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-950">
      <p className="mb-2 font-semibold text-brand-900 dark:text-brand-200">{title}</p>
      <div className="text-sm leading-relaxed text-ink">{children}</div>
    </div>
  )
}
