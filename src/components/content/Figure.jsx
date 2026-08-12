export default function Figure({ src, alt = '', caption }) {
  return (
    <figure className="not-prose my-6">
      <img src={src} alt={alt} className="w-full rounded-lg border border-line" />
      {caption && <figcaption className="mt-2 text-center text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  )
}
