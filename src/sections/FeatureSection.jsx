import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaChartLine, FaPalette, FaBroom, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

// Büyütülecek resimlerin listesi
const featureImages = [
  '/about-11.webp',
  '/about-1.webp'
]

export default function FeatureSection() {
  const { t } = useLanguage()
  const icons = [FaChartLine, FaPalette, FaBroom]
  
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
        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : featureImages.length - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev < featureImages.length - 1 ? prev + 1 : 0))
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
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : featureImages.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev < featureImages.length - 1 ? prev + 1 : 0))
  }

  const i18nItems = t('feature.items')
  const items = Array.isArray(i18nItems)
    ? i18nItems.map((it) => ({
        title: it.title,
        description: it.desc || it.description,
      }))
    : []

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container mt-5">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h4 className="section-title">{t('feature.sectionTitle')}</h4>
              <h1 className="display-5 mb-4">{t('feature.heading')}</h1>
              <p className="mb-4">{t('feature.description')}</p>
              <div className="row g-4">
                {items.map((f, i) => {
                  const Icon = icons[i % icons.length]
                  return (
                    <div key={i} className="col-12">
                      <div className="d-flex align-items-start">
                        <div
                          className="d-flex flex-shrink-0 align-items-center justify-content-center"
                          style={{ width: '60px', height: '60px', backgroundColor: '#25acbf', borderRadius: '6px' }}
                        >
                          <Icon size={26} style={{ color: '#0b2960' }} />
                        </div>
                        <div className="ms-4">
                          <h3>{f.title}</h3>
                          <p className="mb-0">{f.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="feature-img d-flex gap-3">
                <img 
                  className="img-fluid rounded" 
                  src="/about-11.webp" 
                  alt="Feature 1" 
                  onClick={() => setActiveImgIndex(0)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <img 
                  className="img-fluid rounded" 
                  src="/about-1.webp" 
                  alt="Feature 2" 
                  onClick={() => setActiveImgIndex(1)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL İLE BODY'YE TAŞINAN OKLU TAM EKRAN LIGHTBOX */}
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
            src={featureImages[activeImgIndex]} 
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