import { Link } from 'react-router-dom'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <FaTriangleExclamation className="display-1 mb-4" style={{ color: '#25acbf' }} />
            <h1 className="display-1">{t('notFound.heading')}</h1>
            <h1 className="mb-4">{t('notFound.title')}</h1>
            <p className="mb-4">{t('notFound.description')}</p>
            <Link
              className="btn py-3 px-5 d-inline-flex align-items-center justify-content-center"
              to="/"
              style={{ backgroundColor: '#25acbf', color: '#fff', borderColor: '#25acbf', whiteSpace: 'nowrap', width: 'auto' }}
            >
              {t('notFound.backHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
