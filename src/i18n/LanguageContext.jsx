import { createContext, useContext, useEffect, useState } from 'react'
import { translations, serviceTitles, serviceContent } from './translations.js'
import { servicePageData as basePageData, services as baseServices } from '../data/data.js'

const LanguageContext = createContext(null)

const LANGS = ['tr', 'nl', 'en']

const SERVICE_SLUGS = [
  'ic-mekan-boyama',
  'dis-cephe-boyama',
  'ahsap-tamiri-ve-boyama',
  'lateks-boyama',
  'duvar-kagidi',
]

const pickLang = () => {
  if (typeof window === 'undefined') return 'tr'
  const stored = window.localStorage.getItem('lang')
  if (stored && LANGS.includes(stored)) return stored
  const nav = (window.navigator.language || 'tr').toLowerCase()
  if (nav.startsWith('nl')) return 'nl'
  if (nav.startsWith('en')) return 'en'
  return 'tr'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(pickLang)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', language)
      document.documentElement.setAttribute('lang', language)
    }
  }, [language])

  const lookupRaw = (dict, keys) => {
    let cur = dict
    for (const k of keys) {
      if (cur && typeof cur === 'object' && k in cur) {
        cur = cur[k]
      } else {
        return undefined
      }
    }
    return cur
  }

  const t = (key) => {
    if (!key) return ''
    const keys = key.split('.')
    const fromCurrent = lookupRaw(translations[language], keys)
    if (fromCurrent !== undefined) return fromCurrent
    const fromTr = lookupRaw(translations.tr, keys)
    if (fromTr !== undefined) return fromTr
    if (fromTr === undefined && fromCurrent === undefined) return key
    return key
  }

  const nextLanguage = (prev) => {
    const idx = LANGS.indexOf(prev)
    if (idx < 0) return 'tr'
    return LANGS[(idx + 1) % LANGS.length]
  }

  const getPageData = (slug) => {
    const base = basePageData[slug]
    if (!base) return null
    const langContent = serviceContent?.[language]?.[slug] || {}
    const trContent = serviceContent?.tr?.[slug] || {}
    const pageTitle = serviceTitles[language]?.[slug] || serviceTitles.tr[slug] || slug

    const heroFeatures = (langContent.hero?.features && langContent.hero.features.length)
      ? langContent.hero.features
      : (trContent.hero?.features && trContent.hero.features.length)
        ? trContent.hero.features
        : (base.hero?.features || [])

    const cards = (langContent.cards && langContent.cards.length)
      ? langContent.cards
      : (trContent.cards && trContent.cards.length)
        ? trContent.cards
        : (base.cards || [])

    const processSteps = (langContent.process && langContent.process.length)
      ? langContent.process
      : (trContent.process && trContent.process.length)
        ? trContent.process
        : (base.process || [])

    const heroTitle = langContent.hero?.title || trContent.hero?.title || pageTitle
    const heroDescription = langContent.hero?.description
      || trContent.hero?.description
      || base.hero?.description
      || ''
    const ctaText = langContent.ctaText || trContent.ctaText || base.ctaText || ''
    const cardsTitle = langContent.cardsTitle || trContent.cardsTitle || base.cardsTitle || ''
    const processTitle = langContent.processTitle || trContent.processTitle || base.processTitle || ''

    return {
      ...base,
      pageHeaderTitle: pageTitle,
      hero: {
        ...(base.hero || {}),
        title: heroTitle,
        description: heroDescription,
        features: heroFeatures,
      },
      ctaText,
      cardsTitle,
      processTitle,
      cards,
      process: processSteps,
    }
  }

  const getServices = () => {
    return (baseServices || []).map((s) => ({
      ...s,
      title: serviceTitles[language]?.[s.slug] || s.title,
      description:
        (serviceContent?.[language]?.[s.slug]?.shortDescription)
        || (serviceContent?.tr?.[s.slug]?.shortDescription)
        || s.description,
    }))
  }

  const getSlugTitle = (slug) => serviceTitles[language]?.[slug] || serviceTitles.tr?.[slug] || slug

  const value = {
    language,
    setLanguage,
    languages: LANGS,
    toggleLanguage: () => setLanguage((prev) => nextLanguage(prev)),
    t,
    translations: translations[language],
    translationsAll: translations,
    serviceTitles: serviceTitles[language],
    serviceTitlesAll: serviceTitles,
    getPageData,
    getServices,
    getSlugTitle,
    serviceSlugs: SERVICE_SLUGS,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
