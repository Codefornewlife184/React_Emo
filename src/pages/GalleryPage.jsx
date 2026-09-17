import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendarCheck, FaMagnifyingGlassPlus } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'
import useWowReveal from '../hooks/useWowReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const SLUG_TO_FOLDER = {
  'ic-mekan-boyama': 'ic-cephe',
  'dis-cephe-boyama': 'dis-cephe',
  'ahsap-tamiri-ve-boyama': 'ahsap',
  'lateks-boyama': 'lateks',
  'duvar-kagidi': 'duvar-kagidi',
}

const GALLERY_FILES = {
  'ic-cephe': [
    '1-min.webp', '2-min.webp', '3-min.webp', '4-min.webp',
    '5-min.webp', '6-min.webp', '7-min.webp', '8-min.webp',
  ],
  'dis-cephe': [
    '9-min.webp', '10-min.webp', '11-min.webp', '12-min.webp',
    '13-min.webp', '14-min.webp', '15-min.webp', '16-min.webp',
  ],
  'ahsap': [
    '15-min.webp', '16-min.webp', '17-min.webp', '18-min.webp',
    '19-min.webp', '20-min.webp', '21-min.webp', '22-min.webp',
  ],
  'lateks': [
    '23.png', '24.png', '25.png', '26.png',
  ],
  'duvar-kagidi': [
    '27-min.webp', '28-min.webp', '29-min.webp', '30-min.webp',
  ],
}

export default function GalleryPage() {
  const { slug } = useParams()
  const { t, getSlugTitle, serviceSlugs } = useLanguage()
  const ref = useWowReveal()
  const title = getSlugTitle(slug) || slug
  const isValid = serviceSlugs.includes(slug)
  const folder = SLUG_TO_FOLDER[slug] || 'ic-cephe'
  const files = GALLERY_FILES[folder] || GALLERY_FILES['ic-cephe']

  const images = useMemo(() => files.map((f) => ({
    src: `/${folder}/${f}`,
    alt: `${title} - ${f}`,
  })), [folder, files, title])

  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  const handleLb = (payload) => {
    if (payload?.action === 'close') setLbOpen(false)
    else if (payload?.action === 'navigate') setLbIndex(payload.index)
  }

  return (
    <div ref={ref}>
      <PageHeader title={title} activePage={title} />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '750px' }}>
            <h4 className="section-title">{t('gallery.sectionTitle')}</h4>
            <h1 className="display-5 mb-3">
              {t('gallery.headingPrefix')} <span style={{ color: '#25acbf' }}>{title}</span>
            </h1>
            <p style={{ color: '#555', marginBottom: 0 }}>
              <FaMagnifyingGlassPlus style={{ color: '#25acbf', marginRight: '6px' }} />
              {t('gallery.clickToZoom') || 'Fotoğrafları büyütmek için tıklayın.'}
            </p>
            {!isValid && (
              <p className="text-danger mt-3 mb-0">
                {t('gallery.invalidSlug')}
              </p>
            )}
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="0.2s" style={{ alignItems: 'stretch' }}>
            {images.map((img, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-6" style={{ display: 'flex', alignItems: 'stretch' }}>
                <div
                  className="w-100 h-100 position-relative"
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '10px 10px 26px 10px',
                    borderRadius: '14px',
                    boxShadow: '0 6px 18px rgba(11,41,96,0.14), 0 2px 4px rgba(11,41,96,0.06)',
                    cursor: 'zoom-in',
                    transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease',
                    transform: 'translateY(0) scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.035)'
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(11,41,96,0.28), 0 6px 14px rgba(11,41,96,0.14)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(11,41,96,0.14), 0 2px 4px rgba(11,41,96,0.06)'
                  }}
                  onClick={() => {
                    setLbIndex(i)
                    setLbOpen(true)
                  }}
                >
                    <div
                      className="w-100 overflow-hidden"
                      style={{
                        borderRadius: '10px',
                        backgroundColor: '#f3f6fb',
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="img-fluid w-100"
                        style={{
                          width: '100%',
                          height: '210px',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform .5s ease',
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="position-absolute top-0 start-0 end-0 d-flex align-items-center justify-content-center"
                      style={{
                        height: 'calc(100% - 26px + 10px)',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        bottom: '26px',
                        opacity: 0,
                        transition: 'opacity .35s ease',
                        backgroundColor: 'rgba(37,172,191,0.42)',
                        color: '#fff',
                        pointerEvents: 'none',
                        borderRadius: '10px',
                        backdropFilter: 'blur(1.5px)',
                      }}
                    >
                      <FaMagnifyingGlassPlus size={30} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }} />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-5 text-center wow fadeInUp" data-wow-delay="0.3s">
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <Link
                to="/project"
                className="btn d-inline-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#fff',
                  color: '#0b2960',
                  border: '2px solid #0b2960',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                <FaArrowLeft style={{ marginRight: '8px' }} />
                {t('gallery.backToProjects')}
              </Link>
              <Link
                to="/appointment"
                className="btn d-inline-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#25acbf',
                  color: '#fff',
                  border: '2px solid #25acbf',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  boxShadow: '0 8px 18px rgba(37, 172, 191, 0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                <FaCalendarCheck style={{ marginRight: '8px' }} />
                {t('gallery.cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={images}
        startIndex={lbIndex}
        isOpen={lbOpen}
        onClose={handleLb}
      />
    </div>
  )
}
