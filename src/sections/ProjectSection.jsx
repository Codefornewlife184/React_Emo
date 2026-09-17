import { Link } from 'react-router-dom'
import { FaPaintRoller, FaImages, FaBuilding, FaTree, FaBucket, FaScroll } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const iconBySlug = {
  'ic-mekan-boyama': FaPaintRoller,
  'dis-cephe-boyama': FaBuilding,
  'ahsap-tamiri-ve-boyama': FaTree,
  'lateks-boyama': FaBucket,
  'duvar-kagidi': FaScroll,
}

export default function ProjectSection() {
  const { t, getServices } = useLanguage()
  const delays = ['0.1s', '0.3s', '0.5s', '0.1s', '0.3s', '0.5s']
  const services = getServices()

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '700px' }}>
          <h4 className="section-title">{t('project.sectionTitle')}</h4>
          <h1 className="display-5 mb-4">{t('project.heading')}</h1>
        </div>
        <div className="row g-4">
          {services.map((s, i) => {
            const Icon = iconBySlug[s.slug] || FaPaintRoller
            return (
              <div key={s.slug || s.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={delays[i % delays.length]}>
                <Link
                  to={`/gallery/${s.slug}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
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
                        {<Icon size={34} style={{ color: '#0b2960' }} />}
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
                        <FaImages style={{ color: '#0b2960', marginRight: '10px', width: '18px', height: '18px' }} />
                        <span style={{ color: '#0b2960', fontWeight: 600, fontSize: '0.98rem' }}>{t('buttons.viewGallery')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
