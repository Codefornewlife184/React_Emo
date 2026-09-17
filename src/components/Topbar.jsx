import { FaEnvelopeOpenText, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGlobe, FaEnvelope, FaEnvelopeOpen, FaEnvelopesBulk, FaEnvelopeCircleCheck, FaSquareEnvelope } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Topbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const desktopPad = 'clamp(0.6rem, 5vw, 8rem)'

  return (
    <div
      className="container-fluid bg-primary p-0 wow fadeIn"
      data-wow-delay="0.1s"
      style={{
        borderBottom: '1px solid rgba(11,41,96,0.12)',
      }}
    >
      <div
        className="row gx-0 align-items-center w-100 mx-0"
        style={{
          paddingLeft: desktopPad,
          paddingRight: desktopPad,
          paddingTop: '0.45rem',
          paddingBottom: '0.45rem',
          minHeight: '48px',
        }}
      >
        {/* Sol Taraf: SADECE E-POSTA (Tel + WhatsApp Navbar'a tasindi) */}
        <div
          className="col-6 col-lg-7 text-start d-flex align-items-center"
          style={{ minHeight: '38px' }}
        >
          {/* E-posta - Ikon + Metin */}
          <a
            href="mailto:info@emoschildersbedrijf.nl"
            aria-label="E-posta"
            className="d-inline-flex align-items-center gap-2"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '0.88rem',
            }}
          >
            <FaEnvelopeOpen style={{ color: '#0b2960', fontSize: '1rem', flexShrink: 0 }} />
            <span className="d-none d-sm-inline">info@emoschildersbedrijf.nl</span>
            <span className="d-sm-none d-inline" style={{ color: '#fff' }}>info@emoschildersbedrijf.nl</span>
          </a>
        </div>

        {/* Sag Taraf: Dil + Ayirici + Sosyal */}
        <div
          className="col-6 col-lg-5 d-flex align-items-center justify-content-end"
          style={{ minHeight: '38px' }}
        >
          {/* DIL BUTONU */}
          <button
            onClick={toggleLanguage}
            className="btn d-inline-flex align-items-center justify-content-center"
            title={language === 'tr' ? 'Nederlands' : language === 'nl' ? 'English' : 'Türkçe'}
            style={{
              backgroundColor: '#0b2960',
              color: '#fff',
              border: 'none',
              whiteSpace: 'nowrap',
              width: 'auto',
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              letterSpacing: '0.3px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              transition: 'transform .2s ease, box-shadow .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.22)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)' }}
          >
            <FaGlobe style={{ marginRight: '6px', fontSize: '0.9rem' }} />
            {language === 'tr' ? 'NL' : language === 'nl' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </div>
  )
}
