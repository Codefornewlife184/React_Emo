import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { heroSlides as baseSlides } from '../data/data.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function HeroCarousel() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const i18nSlides = t('hero.slides')
  const textSlides = Array.isArray(i18nSlides) ? i18nSlides : []
  const slides = baseSlides.map((s, i) => ({
    ...s,
    title: textSlides[i]?.title || s.title,
    description: textSlides[i]?.description || s.description,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const thumbActiveSize = 75
  const thumbPassiveSize = 58
  const totalThumbs = slides.length
  const thumbContainerHeight = totalThumbs * thumbActiveSize + (totalThumbs - 1) * 12

  return (
    <div className="container-fluid p-0 pb-0 mb-0 wow fadeIn" data-wow-delay="0.1s" style={{ overflowX: 'hidden' }}>
      <div className="header-carousel position-relative hero-carousel-root" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="owl-carousel-item position-relative"
            style={{ display: idx === active ? 'block' : 'none' }}
          >
            <img
              className="img-fluid w-100"
              src={slide.image}
              alt=""
              style={{
                maxHeight: '700px',
                height: '700px',
                objectFit: 'cover',
                width: '100%',
                display: 'block',
              }}
            />
            <div className="owl-carousel-inner">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-1 text-white animate__animated animate__slideInDown">
                      {slide.title}
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-3">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.linkTo || '/service'}
                      className="btn btn-primary py-3 px-5 animate__animated animate__slideInLeft d-inline-flex align-items-center justify-content-center"
                      style={{ whiteSpace: 'nowrap', width: 'auto' }}
                    >
                      <FaPlus style={{ marginRight: '10px' }} />
                      {t('buttons.readMore')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="header-carousel owl-dots"
          style={{
            position: 'absolute',
            top: '50%',
            right: '24px',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '12px',
            zIndex: 10,
            padding: '14px 10px',
            backgroundColor: 'rgba(11, 41, 96, 0)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            borderRadius: '12px',
            height: `${thumbContainerHeight + 28}px`,
            minHeight: `${thumbContainerHeight + 28}px`,
          }}
        >
          {slides.map((slide, idx) => {
            const isActive = active === idx
            const size = isActive ? thumbActiveSize : thumbPassiveSize
            return (
              <button
                key={slide.id}
                className={`owl-dot ${isActive ? 'active' : ''}`}
                onClick={() => setActive(idx)}
                style={{
                  position: 'relative',
                  width: `${size}px`,
                  height: `${size}px`,
                  minWidth: `${size}px`,
                  minHeight: `${size}px`,
                  background: '#0b2960',
                  border: isActive ? '3px solid #25acbf' : '2px solid rgba(255,255,255,0.55)',
                  boxShadow: isActive
                    ? '0 6px 18px rgba(37, 172, 191, 0.55), 0 0 0 1px rgba(255,255,255,0.3) inset'
                    : '0 3px 10px rgba(0,0,0,0.35)',
                  transition: 'all .45s cubic-bezier(.2,.7,.2,1)',
                  cursor: 'pointer',
                  padding: '0',
                  margin: '0',
                  display: 'block',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              >
                <img
                  src={slide.image}
                  alt=""
                  draggable={false}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'opacity .45s ease, transform .45s ease',
                    opacity: isActive ? 1 : 0.42,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Responsive duzeltmeler - Mobile/Tablet */}
      <style>{`
        .hero-carousel-root .owl-carousel-item img {
          transition: height .3s ease;
        }
        @media (max-width: 1199.98px) {
          .hero-carousel-root .owl-carousel-item img {
            height: 620px !important;
            max-height: 620px !important;
          }
        }
        @media (max-width: 991.98px) {
          .hero-carousel-root .owl-carousel-item img {
            height: 560px !important;
            max-height: 560px !important;
          }
          .hero-carousel-root .owl-carousel-inner h1.display-1 {
            font-size: clamp(2.4rem, 5.6vw, 3.8rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 0.6rem !important;
          }
          .hero-carousel-root .owl-carousel-inner p.fs-5 {
            font-size: 1.02rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.2rem !important;
            padding-bottom: 0 !important;
          }
          .hero-carousel-root .owl-carousel-inner .btn {
            padding: 0.75rem 1.3rem !important;
            font-size: 0.95rem !important;
          }
        }
        @media (max-width: 767.98px) {
          .hero-carousel-root .owl-carousel-item,
          .hero-carousel-root .owl-carousel-item img {
            margin: 0 !important;
            padding: 0 !important;
          }
          .hero-carousel-root .owl-carousel-item img {
            height: 600px !important;
            max-height: 600px !important;
            object-position: 65% center !important;
          }
          .hero-carousel-root,
          .hero-carousel-root.header-carousel {
            margin: 0 !important;
            padding: 0 !important;
          }
          .hero-carousel-root .owl-carousel-inner {
            background: rgba(0,0,0,0.32) !important;
          }
          .hero-carousel-root .owl-carousel-inner .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .hero-carousel-root .owl-carousel-inner .row > div {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            max-width: 86% !important;
          }
          .hero-carousel-root .owl-carousel-inner h1.display-1 {
            font-size: clamp(1.9rem, 7.2vw, 2.8rem) !important;
            line-height: 1.12 !important;
            word-break: break-word;
            margin-bottom: 0.75rem !important;
            text-shadow: 0 2px 10px rgba(0,0,0,0.45);
          }
          .hero-carousel-root .owl-carousel-inner p.fs-5 {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1.1rem !important;
            padding-bottom: 0 !important;
            text-shadow: 0 1px 6px rgba(0,0,0,0.45);
            max-width: 95%;
          }
          .hero-carousel-root .owl-carousel-inner .btn {
            padding: 0.7rem 1.1rem !important;
            font-size: 0.9rem !important;
          }
        }
        @media (max-width: 575.98px) {
          .hero-carousel-root .owl-carousel-item img {
            height: 600px !important;
            max-height: 600px !important;
          }
          .hero-carousel-root .owl-carousel-inner h1.display-1 {
            font-size: clamp(1.6rem, 8.4vw, 2.2rem) !important;
            line-height: 1.1 !important;
          }
          .hero-carousel-root .owl-carousel-inner p.fs-5 {
            font-size: 0.88rem !important;
            line-height: 1.5 !important;
          }
          .hero-carousel-root .owl-carousel-inner .btn {
            padding: 0.6rem 1rem !important;
            font-size: 0.86rem !important;
          }
          .hero-carousel-root > .header-carousel.owl-dots {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
