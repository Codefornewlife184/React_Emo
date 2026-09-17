import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const META_NAMES = [
  'description',
  'keywords',
  'author',
  'robots',
  'viewport',
]
const OG_PROPS = [
  'og:title',
  'og:description',
  'og:type',
  'og:url',
  'og:image',
  'og:site_name',
  'og:locale',
  'og:locale:alternate',
]
const TWITTER_NAMES = [
  'twitter:card',
  'twitter:site',
  'twitter:title',
  'twitter:description',
  'twitter:image',
]

function removeTag(sel, attr, name, existingAttr) {
  if (typeof document === 'undefined') return
  document.querySelectorAll(sel).forEach((el) => {
    const v = el.getAttribute(attr)
    if (existing && existing.includes(v)) el.remove()
  })
}

function setMetaName(name, content) {
  if (typeof document === 'undefined' || content == null) return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function setMetaProp(prop, content, idx = 0) {
  if (typeof document === 'undefined' || content == null) return
  const list = document.head.querySelectorAll(`meta[property="${prop}"]`)
  let el = list[idx]
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function setLinkCanonical(href) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setHreflangs(base, pathname) {
  if (typeof document === 'undefined') return
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((x) => x.remove())
  const LANG_MAP = [
    { lang: 'tr', code: 'tr-TR' },
    { lang: 'nl', code: 'nl-NL' },
    { lang: 'en', code: 'en-US' },
    { lang: 'x-default', code: 'x-default' },
  ]
  LANG_MAP.forEach(({ lang, code }) => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'alternate')
    l.setAttribute('hreflang', code)
    l.setAttribute('href', base + pathname)
    document.head.appendChild(l)
  })
}

function stripTrailingSlash(p) {
  if (!p) return '/'
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p
}

export function resolveSeoByPath(t, seoMeta, pathname) {
  const clean = stripTrailingSlash(pathname || '/')
  const pages = seoMeta.pages || {}
  const gallerySlugs = seoMeta.gallerySlugs || {}

  if (clean === '/') {
    return {
      key: 'home',
      title: pages.home?.title || seoMeta.siteName,
      description: pages.home?.description || '',
      keywords: pages.home?.keywords || '',
    }
  }

  const p = clean.replace(/^\//, '')
  const segments = p.split('/')

  if (segments[0] === 'gallery' && segments[1]) {
    const slug = segments[1]
    const g = gallerySlugs[slug] || pages.gallery
    return {
      key: `gallery:${slug}`,
      title: g?.title || pages.gallery?.title || seoMeta.siteName,
      description: g?.description || pages.gallery?.description || '',
      keywords: pages.gallery?.keywords || '',
    }
  }

  if (segments[0] === 'service') {
    if (segments[1]) {
      const slug = segments[1]
      const s = pages[slug]
      return {
        key: `service:${slug}`,
        title: s?.title || pages.services?.title || seoMeta.siteName,
        description: s?.description || pages.services?.description || '',
        keywords: s?.keywords || pages.services?.keywords || '',
      }
    }
    return {
      key: 'services',
      title: pages.services?.title || seoMeta.siteName,
      description: pages.services?.description || '',
      keywords: pages.services?.keywords || '',
    }
  }

  const KEYS = [
    ['about', 'about'],
    ['feature', 'feature'],
    ['project', 'project'],
    ['team', 'team'],
    ['appointment', 'appointment'],
    ['testimonial', 'testimonial'],
    ['contact', 'contact'],
    ['privacy', 'privacy'],
    ['gallery', 'gallery'],
  ]
  for (const [seg, k] of KEYS) {
    if (segments[0] === seg) {
      return {
        key: k,
        title: pages[k]?.title || seoMeta.siteName,
        description: pages[k]?.description || '',
        keywords: pages[k]?.keywords || '',
      }
    }
  }

  return {
    key: 'notFound',
    title: pages.notFound?.title || seoMeta.siteName,
    description: pages.notFound?.description || '',
    keywords: pages.notFound?.keywords || '',
  }
}

export default function SeoHead() {
  const location = useLocation()
  const { language, t } = useLanguage()

  useEffect(() => {
    if (typeof document === 'undefined') return
    const seoMeta = (t && typeof t === 'function' ? t('seo') : null) || {}
    if (!seoMeta.pages) return

    const pathname = stripTrailingSlash(location.pathname)
    const resolved = resolveSeoByPath(t, seoMeta, pathname)
    const base = seoMeta.canonicalBase || 'https://emoschildersbedrijf.nl'
    const canonical = base + pathname

    document.title = resolved.title

    setMetaName('description', resolved.description)
    setMetaName('keywords', resolved.keywords)
    setMetaName('author', 'Emo Schildersbedrijf')
    setMetaName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

    setMetaProp('og:title', resolved.title)
    setMetaProp('og:description', resolved.description)
    setMetaProp('og:type', 'website')
    setMetaProp('og:url', canonical)
    setMetaProp('og:image', base + (seoMeta.ogImage || '/carousel/carousel-ic-cephe-min.webp'))
    setMetaProp('og:site_name', seoMeta.siteName || 'Emo Schildersbedrijf')
    setMetaProp('og:locale', seoMeta.locale || (language === 'tr' ? 'tr_TR' : language === 'nl' ? 'nl_NL' : 'en_US'))
    const altLocales = []
    if (language !== 'tr') altLocales.push('tr_TR')
    if (language !== 'nl') altLocales.push('nl_NL')
    if (language !== 'en') altLocales.push('en_US')
    document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((x) => x.remove())
    altLocales.forEach((loc) => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:locale:alternate')
      el.setAttribute('content', loc)
      document.head.appendChild(el)
    })

    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:site', seoMeta.twitterSite || '@emoschilders')
    setMetaName('twitter:title', resolved.title)
    setMetaName('twitter:description', resolved.description)
    setMetaName('twitter:image', base + (seoMeta.ogImage || '/carousel/carousel-ic-cephe-min.webp'))

    setLinkCanonical(canonical)
    setHreflangs(base, pathname)
  }, [location.pathname, language, t])

  return null
}
