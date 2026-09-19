import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLocationDot, FaPhone, FaEnvelope, FaChevronRight, FaInstagram } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t, getSlugTitle, serviceSlugs } = useLanguage()
  const currentYear = new Date().getFullYear()
  const contactInfo = t('contact.info')
  const addr = contactInfo?.addressValue || '123 Street, New York, USA'
  const ph = contactInfo?.phoneValue || '+31 6 8727 2979'
  const em = contactInfo?.emailValue || 'info@emoschildersbedrijf.nl'

  // Sayfanın en üstüne kaydırma fonksiyonu
  const scrollTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' in window ? 'instant' : 'auto',
      })
    } catch (_) {
      window.scrollTo(0, 0)
    }
  }

  const baseLinkStyle = {
    textDecoration: 'none',
    borderBottom: 'none',
    color: '#ffffff',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    padding: '0.35rem 0',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    letterSpacing: '0.1px',
    transition: 'letter-spacing .2s ease, color .2s ease, transform .2s ease',
  }

  const [hovered, setHovered] = useState({})
  const onHover = (k, v) => setHovered((p) => ({ ...p, [k]: v }))
  const getLinkStyle = (k) => ({
    ...baseLinkStyle,
    letterSpacing: hovered[k] ? '0.8px' : '0.1px',
    color: hovered[k] ? '#0b2960' : '#ffffff',
    transform: hovered[k] ? 'translateX(3px)' : 'translateX(0)',
  })

  const arrowStyle = {
    color: '#0b2960',
    flexShrink: 0,
    marginRight: '8px',
    minWidth: '16px',
    filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.7))',
  }

  const titleStyle = {
    color: '#0b2960',
    fontWeight: 800,
    paddingBottom: '0.6rem',
    marginBottom: '1.2rem',
    borderBottom: '2px solid rgba(255,255,255,0.7)',
    display: 'inline-block',
  }

  const footerAppImages = [
    { url: '/carousel/carousel-ic-cephe-min.webp', slug: 'ic-mekan-boyama', altKey: 'ic-mekan-boyama' },
    { url: '/carousel/carousel-dis-cephe-min.webp', slug: 'dis-cephe-boyama', altKey: 'dis-cephe-boyama' },
    { url: '/carousel/carousel-ahsap-min.webp', slug: 'ahsap-tamiri-ve-boyama', altKey: 'ahsap-tamiri-ve-boyama' },
    { url: '/carousel/carousel-lateks-min.webp', slug: 'lateks-boyama', altKey: 'lateks-boyama' },
    { url: '/carousel/carousel-duvar-kagidi-min.webp', slug: 'duvar-kagidi', altKey: 'duvar-kagidi' },
  ]

  return (
    <>
      <div className="container-fluid text-white footer mt-5 pt-5 px-0 wow fadeIn" style={{ backgroundColor: '#25acbf' }} data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            {/* 1 - İletişim */}
            <div className="col-lg-3 col-md-6">
              <h3 style={titleStyle}>{t('footer.address')}</h3>
              <p className="mb-2 d-flex align-items-center" style={{ color: '#fff', fontWeight: 500 }}>
                <FaLocationDot style={{ color: '#fff', marginRight: '12px', flexShrink: 0 }} />
                {addr}
              </p>
              <p className="mb-2 d-flex align-items-center" style={{ color: '#fff', fontWeight: 500 }}>
                <FaPhone style={{ color: '#fff', marginRight: '12px', flexShrink: 0 }} />
                {ph}
              </p>
              <p className="mb-2 d-flex align-items-center" style={{ color: '#fff', fontWeight: 500 }}>
                <FaEnvelope style={{ color: '#fff', marginRight: '12px', flexShrink: 0 }} />
                {em}
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-square me-0 d-inline-flex align-items-center justify-content-center" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/emoschildersbedrijf/" style={{ backgroundColor: '#fff', color: '#0b2960', border: 'none', width: '40px', height: '40px', padding: 0, borderRadius: '10px' }}>
                  <FaInstagram size={14} />
                </a>
              </div>
            </div>

            {/* 2 - Hızlı Linkler */}
            <div className="col-lg-3 col-md-6">
              <h3 style={titleStyle}>{t('footer.quickLinks')}</h3>
              {[
                { to: '/', label: t('common.home'), key: 'ql-home' },
                { to: '/about', label: t('common.about'), key: 'ql-about' },
                { to: '/service', label: t('common.services'), key: 'ql-services' },
                { to: '/contact', label: t('common.contact'), key: 'ql-contact' },
                { to: '/appointment', label: t('common.appointment'), key: 'ql-appointment' },
              ].map((l) => (
                <Link
                  key={l.key}
                  to={l.to}
                  onClick={scrollTop}
                  onMouseEnter={() => onHover(l.key, true)}
                  onMouseLeave={() => onHover(l.key, false)}
                  style={getLinkStyle(l.key)}
                >
                  <FaChevronRight size={16} style={arrowStyle} />
                  <span style={{ flex: 1, minWidth: 0 }}>{l.label}</span>
                </Link>
              ))}
              <Link
                to="/privacy"
                onClick={scrollTop}
                onMouseEnter={() => onHover('ql-privacy', true)}
                onMouseLeave={() => onHover('ql-privacy', false)}
                style={getLinkStyle('ql-privacy')}
              >
                <FaChevronRight size={16} style={arrowStyle} />
                <span style={{ flex: 1, minWidth: 0 }}>{t('footer.privacy')}</span>
              </Link>
            </div>

            {/* 3 - Hizmetler */}
            <div className="col-lg-3 col-md-6">
              <h3 style={titleStyle}>{t('footer.services')}</h3>
              {serviceSlugs.map((slug) => (
                <Link
                  key={slug}
                  to={`/service/${slug}`}
                  onClick={scrollTop}
                  onMouseEnter={() => onHover(`srv-${slug}`, true)}
                  onMouseLeave={() => onHover(`srv-${slug}`, false)}
                  style={getLinkStyle(`srv-${slug}`)}
                >
                  <FaChevronRight size={16} style={arrowStyle} />
                  <span style={{ flex: 1, minWidth: 0 }}>{getSlugTitle(slug)}</span>
                </Link>
              ))}
            </div>

            {/* 4 - Uygulamalarımız (Görseller) */}
            <div className="col-lg-3 col-md-6">
              <h3 style={titleStyle}>{t('footer.ourApps')}</h3>
              <div className="row g-2" style={{ width: '100%', margin: 0 }}>
                {footerAppImages.map((it, i) => {
                  const title = getSlugTitle(it.altKey) || it.altKey
                  return (
                    <div key={i} className="col-4 p-1" style={{ padding: '0.25rem' }}>
                      <Link
                        to="/project"
                        onClick={scrollTop}
                        title={`${title} - ${t('common.projects')}`}
                        style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            backgroundColor: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.9)',
                            padding: '5px',
                            transition: 'all .3s cubic-bezier(.2,.7,.2,1)',
                            cursor: 'pointer',
                            transform: 'translateY(0) scale(1)',
                            boxShadow: '0 4px 10px rgba(11,41,96,0.18)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.06)'
                            e.currentTarget.style.boxShadow = '0 12px 26px rgba(11,41,96,0.38)'
                            e.currentTarget.style.borderColor = '#0b2960'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)'
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(11,41,96,0.18)'
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
                          }}
                        >
                          <img
                            src={it.url}
                            alt={title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              borderRadius: '7px',
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Telif Hakları & Tasarımcı Bilgisi */}
        <div className="container-fluid copyright" style={{ backgroundColor: '#0b2960', color: '#fff' }}>
          <div className="container">
            <div className="row py-3">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy; <span style={{ color: '#25acbf', fontWeight: 700 }}>Emo Schildersbedrijf</span> | {t('footer.copyright')} {currentYear}.
              </div>
              <div className="col-md-6 text-center text-md-end">
                Web Dizayn : <a href="https://webcenter.com.tr" target="_blank" rel="noreferrer" style={{ color: '#25acbf', textDecoration: 'none', borderBottom: 'none', fontWeight: 600 }}>Web Center</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}