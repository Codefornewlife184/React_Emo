import { useState, useEffect } from 'react'
import { testimonials as baseTestimonials } from '../data/data.js'
import { FaQuoteLeft } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function TestimonialCarousel() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)

  const rawItems = t('testimonial.items')
  const translatedItems = Array.isArray(rawItems) && rawItems.length ? rawItems : baseTestimonials

  const items = translatedItems.map((item, idx) => ({
    ...item,
    id: item.id ?? idx + 1,
    avatar: baseTestimonials[idx]?.avatar || '/1.png',
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h4 className="section-title">{t('testimonial.sectionTitle')}</h4>
          <h1 className="display-5 mb-4">{t('testimonial.heading')}</h1>
        </div>
        <div
          className="testimonial-carousel wow fadeInUp"
          data-wow-delay="0.1s"
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <div style={{
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}>
            {items.map((item, idx) => (
              <button
                key={item.id}
                className={`owl-dot ${active === idx ? 'active' : ''}`}
                onClick={() => setActive(idx)}
                style={{
                  position: 'relative',
                  width: active === idx ? '100px' : '60px',
                  height: active === idx ? '100px' : '60px',
                  margin: '0 5px',
                  transition: '.5s',
                  border: 'none',
                  borderRadius: '50%',
                  padding: 0,
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              >
                <img
                  className="img-fluid rounded-circle"
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: active === idx ? 1 : 0.4,
                    transition: '.5s',
                    borderRadius: '50%',
                  }}
                />
                {active === idx && (
                  <span style={{
                    position: 'absolute',
                    width: '40px', height: '40px',
                    bottom: '-20px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#25acbf',
                    borderRadius: '40px',
                    transition: '.5s',
                    opacity: 1,
                  }}>
                    <FaQuoteLeft size={16} style={{ color: '#0b2960' }} />
                  </span>
                )}
              </button>
            ))}
          </div>

          {items.map((item, idx) => (
            <div
              key={item.id}
              className="testimonial-item text-center"
              style={{ display: active === idx ? 'block' : 'none' }}
            >
              <p className="fs-5">{item.text}</p>
              <h3>{item.name}</h3>
              <span style={{ color: '#25acbf' }}>{item.profession}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
