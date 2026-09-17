import { FaUserTie, FaAward, FaShield } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function FactsSection() {
  const { t } = useLanguage()
  const delays = ['0.1s', '0.3s', '0.5s']
  const i18nItems = t('facts.items')
  const items = Array.isArray(i18nItems)
    ? i18nItems.map((it) => ({
        title: it.title,
        description: it.desc || it.description,
      }))
    : []
  const icons = [FaUserTie, FaAward, FaShield]
  return (
    <div className="container-xxl py-6" style={{ paddingTop: '1em', paddingBottom: '4rem' }}>
      <div className="container pt-5 pb-5">
        <div className="row g-4 justify-content-center">
          {items.map((f, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={i}
                className="col-lg-4 col-md-6 wow fadeInUp d-flex align-items-stretch"
                data-wow-delay={delays[i % delays.length]}
              >
                <div
                  className="fact-item text-center bg-light h-100 w-100"
                  style={{
                    position: 'relative',
                    marginTop: '4rem',
                    marginBottom: '1rem',
                    paddingTop: '4.5rem',
                    paddingBottom: '3rem',
                    paddingLeft: '1.75rem',
                    paddingRight: '1.75rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(11, 41, 96, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div
                    className="fact-icon d-flex align-items-center justify-content-center"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90px',
                      height: '90px',
                      minWidth: '90px',
                      minHeight: '90px',
                      backgroundColor: '#25acbf',
                      borderRadius: '14px',
                      boxShadow: '0 8px 20px rgba(37, 172, 191, 0.35)',
                      margin: '0',
                      padding: '0',
                    }}
                  >
                    {<Icon size={38} style={{ color: '#0b2960', display: 'block' }} />}
                  </div>
                  <h3 className="mb-3 mt-2" style={{ paddingTop: '1rem' }}>{f.title}</h3>
                  <p className="mb-0" style={{ lineHeight: 1.65 }}>{f.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
