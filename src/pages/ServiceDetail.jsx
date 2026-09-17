import { createElement, useMemo, useState } from 'react'
import * as FaIcons from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'
import useWowReveal from '../hooks/useWowReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { services } from '../data/data.js'
import { FaCalendarDays, FaPhone, FaCalendarCheck, FaMagnifyingGlassPlus } from 'react-icons/fa6'

const legacyIconMap = {
  'brush': 'Brush',
  'leaf': 'Leaf',
  'cogs': 'Gears',
  'palette': 'Palette',
  'home': 'House',
  'door-closed': 'DoorClosed',
  'spray-can': 'SprayCan',
  'hammer': 'Hammer',
  'scroll': 'Scroll',
  'lightbulb': 'Lightbulb',
  'shield-alt': 'ShieldHalved',
  'toolbox': 'Toolbox',
  'award': 'Award',
  'search': 'MagnifyingGlass',
  'window-restore': 'WindowRestore',
  'plus-square': 'SquarePlus',
  'building': 'Building',
  'warehouse': 'Warehouse',
  'tree': 'Tree',
  'calendar-check': 'CalendarCheck',
  'coins': 'Coins',
  'file-alt': 'FileLines',
  'users-cog': 'UsersGear',
  'clipboard-list': 'ListCheck',
  'paint-roller': 'PaintRoller',
  'sitemap': 'Sitemap',
  'clipboard-check': 'ClipboardCheck',
  'city': 'City',
  'hard-hat': 'HardHat',
  'vial': 'Vial',
  'wallet': 'Wallet',
  'flask': 'Flask',
  'cloud-sun-rain': 'CloudSun',
  'stamp': 'Stamp',
  'search-plus': 'Search',
  'screwdriver': 'Screwdriver',
  'sandwich': 'Grip',
  'door-open': 'DoorOpen',
  'seal': 'Stamp',
  'broom': 'Broom',
  'shield-virus': 'ShieldHalved',
  'fill-drip': 'FillDrip',
  'cubes': 'Cubes',
  'roller': 'PaintRoller',
  'square': 'Square',
  'layer-group': 'LayerGroup',
  'swatchbook': 'Palette',
  'trowel': 'Toolbox',
  'user-tie': 'UserTie',
  'th-large': 'Grip',
  'magic': 'WandMagicSparkles',
  'paint-brush': 'Brush',
  'images': 'Images',
  'box': 'Box',
  'gem': 'Gem',
  'camera-retro': 'Camera',
  'hand-sparkles': 'HandSparkles',
  'fill': 'FillDrip',
  'tint': 'Droplet',
}

const iconLookup = (name) => {
  if (!name) return FaIcons.FaPaintRoller
  const clean = name.replace(/^fa-/, '')
  const mapped = legacyIconMap[clean]
  const base = mapped || clean
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
  const faName = `Fa${base}`
  if (FaIcons[faName]) return FaIcons[faName]
  const fallbackKeys = Object.keys(FaIcons).filter((k) => !k.includes('Brand') && !k.includes('Logo'))
  if (fallbackKeys.length === 0) return () => null
  const idx = Math.abs(clean.length) % fallbackKeys.length
  return FaIcons.FaPaintRoller || FaIcons[fallbackKeys[0]]
}

const SLUG_TO_FOLDER = {
  'ic-mekan-boyama': 'ic-cephe',
  'dis-cephe-boyama': 'dis-cephe',
  'ahsap-tamiri-ve-boyama': 'ahsap',
  'lateks-boyama': 'lateks',
  'duvar-kagidi': 'duvar-kagidi',
}

const GALLERY_FILES = {
  'ic-cephe': ['1-min.webp','2-min.webp','3-min.webp','4-min.webp','5-min.webp','6-min.webp','7-min.webp','8-min.webp'],
  'dis-cephe': ['9-min.webp','10-min.webp','11-min.webp','12-min.webp','13-min.webp','14-min.webp','15-min.webp','16-min.webp'],
  'ahsap': ['15-min.webp','16-min.webp','17-min.webp','18-min.webp','19-min.webp','20-min.webp','21-min.webp','22-min.webp'],
  'lateks': ['23.png','24.png','25.png','26.png'],
  'duvar-kagidi': ['27-min.webp','28-min.webp','29-min.webp','30-min.webp'],
}

export default function ServiceDetail({ slug }) {
  const { t, getPageData, getSlugTitle } = useLanguage()
  const ref = useWowReveal()
  const data = getPageData(slug)
  const pageTitle = getSlugTitle(slug)
  const currentService = services.find((s) => s.slug === slug)
  const delays = ['0.1s', '0.3s', '0.5s', '0.1s', '0.3s', '0.5s']
  const featureDelays = ['0.1s', '0.3s', '0.5s', '0.7s']
  const processDelays = ['0.1s', '0.3s', '0.5s', '0.7s']

  const folder = SLUG_TO_FOLDER[slug] || 'ic-cephe'
  const files = GALLERY_FILES[folder] || GALLERY_FILES['ic-cephe']
  const galleryImages = useMemo(() => files.map((f) => ({
    src: `/${folder}/${f}`,
    alt: `${pageTitle} - ${f}`,
  })), [folder, files, pageTitle])

  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const handleLb = (payload) => {
    if (payload?.action === 'close') setLbOpen(false)
    else if (payload?.action === 'navigate') setLbIndex(payload.index)
  }

  if (!data) {
    return (
      <div className="container text-center py-5">
        <h2>{t('common.error')}</h2>
        <Link to="/service" className="btn btn-primary mt-3">{t('common.services')}</Link>
      </div>
    )
  }

  const features = (data.hero?.features || []).map((f) => ({
    ...f,
    desc: f.description || f.desc,
    title: f.title,
  }))

  const cards = (data.cards || []).map((c) => ({
    ...c,
    desc: c.description || c.desc,
  }))

  const process = (data.process || []).map((s) => ({
    ...s,
    desc: s.description || s.desc,
  }))

  return (
    <div ref={ref}>
      <PageHeader title={data.pageHeaderTitle || pageTitle} activePage={data.pageHeaderTitle || pageTitle} />

      {/* 1. BÖLÜM: HERO + ÖZELLİKLER */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <h4 className="section-title">{t('serviceDetail.subTitle')}</h4>
              <h1 className="display-5 mb-4">{data.hero.title}</h1>
              {data.hero.subtitle && (
                <p className="lead mb-3" style={{ color: '#0b2960' }}>
                  <strong>{data.hero.subtitle}</strong>
                </p>
              )}
              <p className="mb-4">{data.hero.description || data.hero.intro}</p>
              <div className="row g-3 mb-4">
                {features.map((f, i) => {
                  const Icon = iconLookup(f.icon)
                  return (
                    <div key={i} className="col-lg-6 col-md-6 wow fadeIn" data-wow-delay={featureDelays[i % featureDelays.length]}>
                      <div className="d-flex align-items-start">
                        <div
                          className="d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                          style={{ width: '45px', height: '45px', backgroundColor: '#25acbf', borderRadius: '6px' }}
                        >
                          {createElement(Icon, { size: 16, style: { color: '#0b2960' } })}
                        </div>
                        <div className="ms-3">
                          <h5 className="mb-1">{f.title}</h5>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/appointment" className="btn btn-primary py-3 px-5 d-inline-flex align-items-center justify-content-center" style={{ whiteSpace: 'nowrap', width: 'auto' }}>
                  <FaCalendarDays style={{ color: '#fff', marginRight: '10px' }} />
                  {t('buttons.freeAppointment')}
                </Link>
                <Link to="/contact" className="btn py-3 px-5 d-inline-flex align-items-center justify-content-center" style={{ backgroundColor: '#0b2960', color: '#fff', borderColor: '#0b2960', whiteSpace: 'nowrap', width: 'auto' }}>
                  <FaPhone style={{ color: '#fff', marginRight: '10px' }} />
                  {t('buttons.contactUs')}
                </Link>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="about-img h-100" style={{ minHeight: '420px' }}>
                {currentService && (
                  <>
                    <img className="img-fluid" src={currentService.image} alt={currentService.title} style={{ objectFit: 'cover' }} />
                    <img
                      className="img-fluid"
                      src={services[(services.indexOf(currentService) + 2) % services.length].image}
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: HİZMET KARTLARI */}
      <div className="container-xxl py-5 bg-light">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '700px' }}>
            <h4 className="section-title">{t('serviceDetail.cardsSection')}</h4>
            <h2 className="display-6 mb-4">{data.cardsTitle}</h2>
          </div>
          <div className="row g-4">
            {cards.map((c, i) => {
              const Icon = iconLookup(c.icon)
              return (
                <div key={i} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={delays[i % delays.length]}>
                  <div
                    className="h-100 p-4 p-lg-5 bg-white"
                    style={{ border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mb-4"
                      style={{ width: '70px', height: '70px', backgroundColor: '#25acbf', borderRadius: '6px' }}
                    >
                      {createElement(Icon, { size: 28, style: { color: '#0b2960' } })}
                    </div>
                    <h4 className="mb-3">{c.title}</h4>
                    <p className="mb-0 text-muted">{c.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. BÖLÜM: SÜREÇ ADIMLARI */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '700px' }}>
            <h4 className="section-title">{t('serviceDetail.processSection')}</h4>
            <h2 className="display-6 mb-4">{data.processTitle}</h2>
          </div>
          <div className="row g-4">
            {process.map((step, i) => (
              <div key={i} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={processDelays[i % processDelays.length]}>
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center py-5 px-4 h-100 position-relative"
                  style={{ backgroundColor: '#f8f8f8', borderTop: '4px solid #25acbf' }}
                >
                  <span
                    className="display-1 mb-3"
                    style={{
                      color: '#25acbf',
                      fontFamily: "'Teko', sans-serif",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  <h4 className="mb-3" style={{ color: '#0b2960' }}>{step.title}</h4>
                  <p className="mb-0 text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. BÖLÜM: HİZMET GALERİSİ */}
      <div className="container-xxl py-5 bg-light">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '750px' }}>
            <h4 className="section-title">{t('serviceDetail.gallerySection')}</h4>
            <h1 className="display-6 mb-3">
              {t('serviceDetail.galleryTitle')}: <span style={{ color: '#25acbf' }}>{data.pageHeaderTitle || pageTitle}</span>
            </h1>
            <p style={{ color: '#555', marginBottom: 0 }}>
              <FaMagnifyingGlassPlus style={{ color: '#25acbf', marginRight: '6px' }} />
              {t('gallery.clickToZoom') || 'Fotoğrafları büyütmek için tıklayın.'}
            </p>
          </div>
          <div className="row g-4 wow fadeInUp" data-wow-delay="0.2s" style={{ alignItems: 'stretch' }}>
            {galleryImages.map((img, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-6" style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div
                    className="w-100 h-100 position-relative"
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '10px 10px 26px 10px',
                      borderRadius: '14px',
                      boxShadow: '0 6px 18px rgba(11,41,96,0.12), 0 2px 4px rgba(11,41,96,0.06)',
                      cursor: 'zoom-in',
                      transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease',
                      transform: 'translateY(0) scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.035)'
                      e.currentTarget.style.boxShadow = '0 18px 40px rgba(11,41,96,0.26), 0 6px 14px rgba(11,41,96,0.14)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(11,41,96,0.12), 0 2px 4px rgba(11,41,96,0.06)'
                    }}
                    onClick={() => {
                      setLbIndex(i)
                      setLbOpen(true)
                    }}
                  >
                    <div
                      className="w-100 overflow-hidden"
                      style={{
                        borderRadius: '10px',
                        backgroundColor: '#f3f6fb',
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="img-fluid w-100"
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform .5s ease',
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="position-absolute"
                      style={{
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        bottom: '26px',
                        opacity: 0,
                        transition: 'opacity .35s ease',
                        backgroundColor: 'rgba(37,172,191,0.42)',
                        color: '#fff',
                        pointerEvents: 'none',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(1.5px)',
                      }}
                    >
                      <FaMagnifyingGlassPlus size={28} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CTA BÖLÜMÜ */}
      <div className="container-xxl py-5" style={{ backgroundColor: '#0b2960' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-8 text-white wow fadeInLeft" data-wow-delay="0.1s">
              <h4 className="mb-2" style={{ color: '#25acbf' }}>{t('serviceDetail.ctaTag')}</h4>
              <h1 className="display-5 mb-0 text-white">
                {data.pageHeaderTitle || pageTitle} {t('serviceDetail.ctaText')}
              </h1>
            </div>
            <div className="col-lg-4 text-lg-end wow fadeInRight" data-wow-delay="0.5s">
              <Link
                to="/appointment"
                className="btn py-4 px-5 d-inline-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#25acbf', color: '#fff', borderColor: '#25acbf', fontSize: '1.1rem', fontWeight: 600, whiteSpace: 'nowrap', width: 'auto' }}
              >
                <FaCalendarCheck style={{ color: '#fff', marginRight: '10px' }} />
                {t('buttons.createAppointment')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        startIndex={lbIndex}
        isOpen={lbOpen}
        onClose={handleLb}
      />
    </div>
  )
}
