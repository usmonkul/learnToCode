import Disclosure from '@/components/ui/Disclosure'

export default function Solution({ children }) {
  return (
    <div className="not-prose mt-4">
      <Disclosure summary="Yechimni ko'rsatish">{children}</Disclosure>
    </div>
  )
}
