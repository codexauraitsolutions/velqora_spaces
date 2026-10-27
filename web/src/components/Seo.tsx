import { useEffect } from 'react'

const SITE_URL = 'https://velqoraspaces.com'
const DEFAULT_TITLE = 'VELQORASPACES | Interiors Designing Studio'
const DEFAULT_DESCRIPTION =
  'VELQORASPACES is an interiors designing studio in Hyderabad crafting bespoke residential and commercial interiors — from first sketch to final handover.'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo({
  title,
  description,
  path = '',
  noindex = false,
}: {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | VELQORASPACES` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path, noindex])

  return null
}
