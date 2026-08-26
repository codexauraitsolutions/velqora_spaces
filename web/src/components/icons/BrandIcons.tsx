type IconProps = { className?: string }

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function PinterestGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 19c1-3.2 1.9-6.6 2.6-9.3.4-1.6 2.9-1.7 3.4.1.4 1.5-.4 3.9-2.4 3.9-1.1 0-1.9-.9-1.6-2.2" strokeLinecap="round" />
      <circle cx="12" cy="9.6" r="0.15" fill="currentColor" />
    </svg>
  )
}

export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8.5h-1.4c-.8 0-1.2.5-1.2 1.3V11h2.5l-.3 2.2h-2.2V19h-2.3v-5.8H9V11h1.1V9.6C10.1 7.6 11 6.5 13 6.5H14v2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.8v4.4l4-2.2-4-2.2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsappGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M6.5 17.5 4.5 20l2.6-.7A8 8 0 1 0 4 12a7.9 7.9 0 0 0 1.1 4z" strokeLinejoin="round" />
      <path d="M9 10.4c.3 2.3 2.3 4.3 4.6 4.6.9.1 1-.6.6-1.2l-.8-1.1c-.2-.3-.6-.4-.9-.2l-.5.3c-.6-.4-1.2-1-1.6-1.6l.3-.5c.2-.3.1-.7-.2-.9l-1.1-.8c-.6-.4-1.3-.3-1.2.6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const BRAND_ICONS = {
  instagram: InstagramGlyph,
  pinterest: PinterestGlyph,
  facebook: FacebookGlyph,
  youtube: YoutubeGlyph,
  whatsapp: WhatsappGlyph,
}
