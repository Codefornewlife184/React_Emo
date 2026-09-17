import { FaChartLine, FaPalette, FaBroom } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function FeatureSection() {
  const { t } = useLanguage()
  const icons = [FaChartLine, FaPalette, FaBroom]
  const i18nItems = t('feature.items')
  const items = Array.isArray(i18nItems)
    ? i18nItems.map((it) => ({
        title: it.title,
        description: it.desc || it.description,
      }))
    : []

  return (
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
            <div className="feature-img">
              <img className="img-fluid" src="/about-11.webp" alt="" />
              <img className="img-fluid" src="/about-1.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
