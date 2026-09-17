import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Privacy() {
  const ref = useWowReveal()
  const { t } = useLanguage()
  const head = t('privacy') || {}
  const sections = (head.sections && Array.isArray(head.sections)) ? head.sections : []

  return (
    <div ref={ref}>
      <PageHeader pageKey="privacy" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-10 wow fadeInUp" data-wow-delay="0.1s">
              <h2
                className="mb-4"
                style={{ color: '#0b2960', fontWeight: 700, borderBottom: '3px solid #25acbf', paddingBottom: '0.6rem', display: 'inline-block' }}
              >
                {head.title || 'Gizlilik Politikası - Emo Schildersbedrijf'}
              </h2>

              {head.intro && (
                <div
                  className="mb-5 p-4"
                  style={{
                    borderLeft: '4px solid #25acbf',
                    backgroundColor: 'rgba(37,172,191,0.05)',
                    borderRadius: '8px',
                    color: '#0b2960',
                    lineHeight: 1.75,
                  }}
                >
                  {head.intro.map((line, i) => (
                    <p key={i} className="mb-2" style={{ fontSize: '1rem', color: '#0b2960', margin: 0, paddingTop: i === 0 ? 0 : '0.35rem' }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {sections.map((s, idx) => (
                <div key={idx} className="mb-5">
                  <h3
                    className="mb-3"
                    style={{
                      color: '#0b2960',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      paddingLeft: '0.8rem',
                      borderLeft: '4px solid #25acbf',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#25acbf',
                        color: '#fff',
                        marginRight: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      {idx + 1}
                    </span>
                    {s.title}
                  </h3>
                  <div
                    className="ps-2"
                    style={{ lineHeight: 1.8, color: '#334155', fontSize: '0.98rem' }}
                  >
                    {Array.isArray(s.body) && s.body.map((p, pi) => (
                      <p
                        key={pi}
                        className="mb-2"
                        style={{ margin: '0 0 0.5rem 0' }}
                      >
                        {p}
                      </p>
                    ))}
                    {!Array.isArray(s.body) && typeof s.body === 'string' && (
                      <p className="mb-2" style={{ margin: 0 }}>{s.body}</p>
                    )}
                    {s.list && Array.isArray(s.list) && (
                      <ul style={{ paddingLeft: '1.2rem', margin: '0.75rem 0 0 0' }}>
                        {s.list.map((li, li2) => (
                          <li
                            key={li2}
                            style={{
                              paddingLeft: '0.3rem',
                              marginBottom: '0.35rem',
                              listStyleType: 'disc',
                              color: '#334155',
                            }}
                          >
                            <span style={{ color: '#0b2960' }}>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
