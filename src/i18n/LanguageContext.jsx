import { createContext, useContext, useEffect, useState } from 'react'
import { translations, serviceTitles, serviceContent } from './translations.js'
import { servicePageData as basePageData, services as baseServices } from '../data/data.js'

const LanguageContext = createContext(null)

const LANGS = ['nl', 'en', 'tr']

// Dil değişim sırasını açık şekilde tanımlıyoruz (Sıra kaymasını %100 önler)
const NEXT_LANG_MAP = {
  nl: 'en',
  en: 'tr',
  tr: 'nl'
}

const SERVICE_SLUGS = [
  'ic-mekan-boyama',
  'dis-cephe-boyama',
  'ahsap-tamiri-ve-boyama',
  'lateks-boyama',
  'duvar-kagidi',
]

const pickLang = () => {
  if (typeof window === 'undefined') return 'nl'
  const stored = window.localStorage.getItem('lang')
  if (stored && LANGS.includes(stored)) return stored
  return 'nl'
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
    if (!dict) return undefined
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
    
    // 1. Önce seçili aktif dilde ara
    const fromCurrent = lookupRaw(translations[language], keys)
    if (fromCurrent !== undefined && fromCurrent !== '') return fromCurrent

    // 2. Yoksa varsayılan NL (Hollandaca) yedeğe bak
    const fromNl = lookupRaw(translations.nl, keys)
    if (fromNl !== undefined && fromNl !== '') return fromNl

    return key
  }

  const getSlugTitle = (slug) => {
    return (
      serviceTitles?.[language]?.[slug] ||
      serviceTitles?.nl?.[slug] ||
      slug
    )
  }

  const getServices = () => {
    return (baseServices || []).map((s) => ({
      ...s,
      title: getSlugTitle(s.slug),
      description:
        serviceContent?.[language]?.[s.slug]?.shortDescription ||
        serviceContent?.nl?.[s.slug]?.shortDescription ||
        s.description,
    }))
  }

  const getPageData = (slug) => {
    const base = basePageData[slug]
    if (!base) return null
    const langContent = serviceContent?.[language]?.[slug] || {}
    const nlContent = serviceContent?.nl?.[slug] || {}
    const pageTitle = getSlugTitle(slug)

    const heroFeatures = (langContent.hero?.features && langContent.hero.features.length)
      ? langContent.hero.features
      : (nlContent.hero?.features && nlContent.hero.features.length)
        ? nlContent.hero.features
        : (base.hero?.features || [])

    const cards = (langContent.cards && langContent.cards.length)
      ? langContent.cards
      : (nlContent.cards && nlContent.cards.length)
        ? nlContent.cards
        : (base.cards || [])

    const processSteps = (langContent.process && langContent.process.length)
      ? langContent.process
      : (nlContent.process && nlContent.process.length)
        ? nlContent.process
        : (base.process || [])

    return {
      ...base,
      pageHeaderTitle: pageTitle,
      hero: {
        ...(base.hero || {}),
        title: langContent.hero?.title || nlContent.hero?.title || pageTitle,
        description: langContent.hero?.description || nlContent.hero?.description || base.hero?.description || '',
        features: heroFeatures,
      },
      ctaText: langContent.ctaText || nlContent.ctaText || base.ctaText || '',
      cardsTitle: langContent.cardsTitle || nlContent.cardsTitle || base.cardsTitle || '',
      processTitle: langContent.processTitle || nlContent.processTitle || base.processTitle || '',
      cards,
      process: processSteps,
    }
  }

  // Doğrudan spesifik dil atamak için garanti fonksiyon
  const changeLanguage = (newLang) => {
    if (LANGS.includes(newLang)) {
      setLanguage(newLang)
    }
  }

  // Sırayla geçiş için tam eşleşen toggle
  const toggleLanguage = () => {
    setLanguage((prev) => NEXT_LANG_MAP[prev] || 'nl')
  }

  const value = {
    language,
    setLanguage: changeLanguage,
    languages: LANGS,
    toggleLanguage,
    t,
    getServices,
    getPageData,
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