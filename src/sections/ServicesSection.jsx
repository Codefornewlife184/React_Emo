import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { 
  FaPaintRoller, 
  FaPlus, 
  FaBuilding, 
  FaTree, 
  FaBucket, 
  FaScroll, 
  FaXmark, 
  FaChevronLeft, 
  FaChevronRight, 
  FaMagnifyingGlass 
} from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const iconBySlug = {
  'ic-mekan-boyama': FaPaintRoller,
  'dis-cephe-boyama': FaBuilding,
  'ahsap-tamiri-ve-boyama': FaTree,
  'lateks-boyama': FaBucket,
  'duvar-kagidi': FaScroll,
}

export default function ServicesSection() {
  const { t, getServices } = useLanguage()
  const delays = ['0.1s', '0.3s', '0.5s', '0.1s', '0.3s', '0.5s']
  const services = getServices()

  // Lightbox modalı için aktif resim indeksi
  const [activeImgIndex, setActiveImgIndex] = useState(null)

  // Sadece geçerli görsellerin listesi
  const serviceImages = services.map((s) => s.image).filter(Boolean)

  // Klavye desteği (ArrowLeft, ArrowRight, ESC) ve body scroll engelleme
  useEffect(() => {
    if (activeImgIndex === null) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImgIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : serviceImages.length - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev < serviceImages.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImgIndex, serviceImages.length])

  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : serviceImages.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev < serviceImages.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container mt-5">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '700px' }}>
            <h4 className="section-title">{t('services.sectionTitle')}</h4>
            <h1 className="display-5 mb-4">{t('services.heading')}</h1>
          </div>
          <div className="row g-4">
            {services.map((s, i) => {
              const Icon = iconBySlug[s.slug] || FaPaintRoller
              return (
                <div key={s.slug || s.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={delays[i % delays.length]}>
                  <div
                    className="service-card-wrapper position-relative h-100"
                    onMouseEnter={(e) => {
                      const card = e.currentTarget.querySelector('.service-item')
                      if (card) {
                        card.style.transform = 'translateY(-5px)'
                        card.style.boxShadow = '0 18px 40px rgba(11,41,96,0.18)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget.querySelector('.service-item')
                      if (card) {
                        card.style.transform = 'translateY(0)'
                        card.style.boxShadow = 'none'
                      }
                    }}
                  >
                    {/* Büyüteç Butonu: Kart yönlendirmesini engeller ve resmi büyütür */}
                    {s.image && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveImgIndex(i)
                        }}
                        title="Resmi Büyüt"
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          zIndex: 10,
                          backgroundColor: 'rgba(11, 41, 96, 0.85)',
                          color: '#fff',
                          border: 'none',
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#25acbf'
                          e.currentTarget.style.transform = 'scale(1.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 41, 96, 0.85)'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        <FaMagnifyingGlass size={16} />
                      </button>
                    )}

                    {/* Detay Sayfasına Giden Link */}
                    <Link
                      to={`/service/${s.slug}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <div
                        className="service-item d-flex position-relative text-center h-100"
                        style={{ transition: 'all .3s ease' }}
                      >
                        <img className="bg-img" src={s.image} alt={s.title} />
                        <div className="service-text p-5">
                          <div
                            className="mb-4 mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: '80px',
                              height: '80px',
                              backgroundColor: '#25acbf',
                              borderRadius: '6px',
                            }}
                          >
                            <Icon size={34} style={{ color: '#0b2960' }} />
                          </div>
                          <h3 className="mb-3">{s.title}</h3>
                          <p className="mb-4">{s.description}</p>
                          <div
                            className="d-inline-flex align-items-center justify-content-center btn"
                            style={{
                              backgroundColor: '#fff',
                              padding: '12px 22px',
                              minWidth: 'auto',
                              width: 'auto',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <FaPlus style={{ color: '#0b2960', marginRight: '10px', width: '16px', height: '16px', strokeWidth: 3 }} />
                            <span style={{ color: '#0b2960', fontWeight: 600, fontSize: '0.98rem' }}>{t('buttons.readMore')}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* PORTAL İLE OKLU TAM EKRAN LIGHTBOX MODAL */}
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
            src={serviceImages[activeImgIndex]} 
            alt="Büyütülmüş Hizmet Görseli" 
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