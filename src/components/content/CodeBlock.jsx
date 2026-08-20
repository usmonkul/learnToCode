import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useThemeStore } from '@/store/themeStore'

export default function CodeBlock({ lang = 'text', children }) {
  const [copied, setCopied] = useState(false)
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme)
  const code = children.trim()

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Highlight theme={resolvedTheme === 'dark' ? themes.oneDark : themes.oneLight} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="not-prose my-6 overflow-hidden rounded-lg border border-line">
          <div className="flex items-center justify-between border-b border-line bg-canvas-muted px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {lang}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-brand-600"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Nusxalandi' : 'Nusxalash'}
            </button>
          </div>
          <pre className={cn(className, 'overflow-x-auto px-4 py-3 text-sm')} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
