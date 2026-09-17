import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa6'
import { team } from '../data/data.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function TeamSection() {
  const { t } = useLanguage()
  const delays = ['0.1s', '0.3s', '0.5s', '0.7s']

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h4 className="section-title">{t('team.sectionTitle')}</h4>
          <h1 className="display-5 mb-4">{t('team.heading')}</h1>
        </div>
        <div className="row g-0 team-items">
          {team.map((m, i) => (
            <div key={m.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={delays[i % delays.length]}>
              <div className="team-item position-relative">
                <div className="position-relative">
                  <img className="img-fluid" src={m.image} alt={m.name} />
                  <div className="team-social text-center">
                    <a className="btn btn-square me-1" href="#" style={{ backgroundColor: '#25acbf', color: '#0b2960', border: 'none' }}>
                      <FaFacebookF size={14} />
                    </a>
                    <a className="btn btn-square me-1" href="#" style={{ backgroundColor: '#25acbf', color: '#0b2960', border: 'none' }}>
                      <FaTwitter size={14} />
                    </a>
                    <a className="btn btn-square me-0" href="#" style={{ backgroundColor: '#25acbf', color: '#0b2960', border: 'none' }}>
                      <FaInstagram size={14} />
                    </a>
                  </div>
                </div>
                <div className="bg-light text-center p-4">
                  <h3 className="mt-2">{m.name}</h3>
                  <span style={{ color: '#25acbf' }}>{m.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
