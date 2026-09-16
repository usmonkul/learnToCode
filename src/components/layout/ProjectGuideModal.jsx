import { useEffect, useState } from 'react'
import { Info, X, ExternalLink } from 'lucide-react'

export default function ProjectGuideModal({ project }) {
  const [open, setOpen] = useState(false)
  const guide = project.guide

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  if (!guide) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Loyiha qo'llanmasi"
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur hover:bg-black/85"
      >
        <Info className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-slate-900 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Loyiha qo'llanmasi</p>
                <h2 className="mt-1 text-lg font-bold">{project.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Yopish"
                className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {guide.colors?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-700">Ranglar</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {guide.colors.map((color) => (
                      <div key={color.hex} className="flex items-center gap-3">
                        <span
                          className="h-6 w-6 shrink-0 rounded-full border border-slate-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm text-slate-600">{color.name}</span>
                        <span className="ml-auto font-mono text-xs text-slate-400">{color.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guide.fonts?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-700">Shriftlar</p>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                    {guide.fonts.map((font) => (
                      <li key={font}>{font}</li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.api && (
                <div>
                  <p className="text-sm font-semibold text-slate-700">API</p>
                  <a
                    href={guide.api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1.5 text-sm text-indigo-600 hover:underline"
                  >
                    {guide.api.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
