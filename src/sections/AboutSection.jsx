import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import useCounterUp from '../hooks/useCounterUp.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { FaUserTie, FaShieldHalved, FaCalendarCheck, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const iconMap = [FaUserTie, FaShieldHalved, FaCalendarCheck]

// Büyütülecek resimlerin listesi
const galleryImages = [
  '/about-2.webp',
  '/about-22.webp'
]

export default function AboutSection() {
  const { t } = useLanguage()
  const [count, ref] = useCounterUp(25, 2000, 10)
  
  // Tıklanan resmin indeksini tutan state (null ise kapalı)
  const [activeImgIndex, setActiveImgIndex] = useState(null)

  // Klavye ok tuşları ve ESC ile gezinme/kapatma
  useEffect(() => {
    if (activeImgIndex === null) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImgIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImgIndex])

  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
  }

  const i18nItems = t('about.items')
  const aboutItems = Array.isArray(i18nItems) ? i18nItems : []
  const corporateTitle = t('about.corporateTitle')
  const corporateBody = t('about.corporateBody')
  const subtitle = t('about.subtitle')
  const counterLabels = t('about.counter')

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img d-flex gap-3">
                <img 
                  className="img-fluid rounded" 
                  src="/about-2.webp" 
                  alt="About 1" 
                  onClick={() => setActiveImgIndex(0)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <img 
                  className="img-fluid rounded" 
                  src="/about-22.webp" 
                  alt="About 2" 
                  onClick={() => setActiveImgIndex(1)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>

            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h4 className="section-title">{t('about.sectionTitle')}</h4>
              <h1 className="display-5 mb-4" style={{ lineHeight: 1.2 }}>
                {t('about.heading')}
              </h1>
              <p style={{ lineHeight: 1.8, fontWeight: 500, color: '#333' }}>
                {subtitle}
              </p>
              
              <div className="d-flex align-items-center">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5"
                  style={{ width: '120px', height: '120px', borderColor: '#25acbf', borderRadius: '16px', backgroundColor: '#fff' }}
                >
                  <h1 className="display-1 mb-n2" ref={ref} style={{ color: '#0b2960', marginTop:'1rem', fontSize:'4rem'}}>
                    {count}+
                  </h1>
                </div>
                <div className="ps-4">
                  <h3 style={{ color: '#0b2960' }}>{counterLabels?.labelYears || 'Yıllık'}</h3>
                  <h3 className="mb-0" style={{ color: '#555', fontWeight: 700 }}>
                    {counterLabels?.labelTrust || 'Sektör Tecrübesi ve Güven'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container-xxl py-5" style={{ backgroundColor: 'rgba(11,41,96,0.03)'}}>
        <div className="container">
          <div className="row g-4">
            {aboutItems.map((it, i) => {
              const Icon = iconMap[i % iconMap.length]
              return (
                <div key={i} className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay={`${0.1 + i * 0.1}s`}>
                  <div
                    style={{
                      height: '100%',
                      padding: '2rem 1.5rem',
                      borderRadius: '14px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(37,172,191,0.15)',
                      boxShadow: '0 6px 18px rgba(11,41,96,0.06)',
                      transition: 'all .25s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.transform = 'translateY(-4px)'
                      el.style.boxShadow = '0 14px 30px rgba(11,41,96,0.14)'
                      el.style.borderColor = '#25acbf'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = '0 6px 18px rgba(11,41,96,0.06)'
                      el.style.borderColor = 'rgba(37,172,191,0.15)'
                    }}
                  >
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '12px',
                        backgroundColor: '#25acbf',
                        color: '#0b2960',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h5 style={{ color: '#0b2960', fontSize:'1.9rem', marginBottom: '0.5rem' }}>{it.title}</h5>
                    <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 0 }}>{it.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Kurumsal Metin */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 justify-content-center mt-1">
            <div className="col-lg-10 text-center wow fadeIn" data-wow-delay="0.1s">
              <h2
                className="mb-4"
                style={{
                  color: '#0b2960',
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                {corporateTitle}
              </h2>
            </div>
            <div className="col-lg-10 wow fadeIn" data-wow-delay="0.2s">
              <div
                style={{
                  padding: '2rem 2.25rem',
                  borderRadius: '18px',
                  backgroundColor: '#fff',
                  border: '1px solid rgba(11,41,96,0.08)',
                  boxShadow: '0 8px 24px rgba(11,41,96,0.06)',
                }}
              >
                {(Array.isArray(corporateBody) ? corporateBody : [corporateBody]).map((para, i) => (
                  <p
                    key={i}
                    style={{
                      lineHeight: 1.9,
                      color: '#3a3a3a',
                      fontSize: '1.02rem',
                      marginBottom: i < (Array.isArray(corporateBody) ? corporateBody.length : 1) - 1 ? '1.1rem' : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-lg-10 text-center mt-4 wow fadeIn" data-wow-delay="0.3s">
              <Link className="btn btn-primary py-3 px-5 me-2 mb-2" to="/service">
                {t('common.allServices')}
              </Link>
              <Link className="btn py-3 px-5 mb-2" to="/contact"
                style={{
                  backgroundColor: '#0b2960',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {t('buttons.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL İLE OKLU TAM EKRAN LIGHTBOX */}
      {activeImgIndex !== null && createPortal(
        <div 
          onClick={() => setActiveImgIndex(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(5px)'
          }}
        >
          {/* Kapat Butonu */}
          <button
            onClick={() => setActiveImgIndex(null)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '25px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#fff',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1000000
            }}
          >
            <FaXmark />
          </button>

          {/* Sol Ok */}
          <button
            onClick={handlePrev}
            style={{
              position: 'fixed',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1000000,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <FaChevronLeft />
          </button>

          {/* Aktif Görsel */}
          <img 
            src={galleryImages[activeImgIndex]} 
            alt="Büyütülmüş Görsel" 
            style={{
              maxWidth: '85vw',
              maxHeight: '85vh',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              objectFit: 'contain'
            }} 
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Sağ Ok */}
          <button
            onClick={handleNext}
            style={{
              position: 'fixed',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1000000,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <FaChevronRight />
          </button>
        </div>,
        document.body
      )}
    </>
  )
}