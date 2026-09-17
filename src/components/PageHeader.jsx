import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function PageHeader({ title, activePage, pageKey }) {
  const { t } = useLanguage()
  const resolvedTitle = (pageKey && t(`pageHeader.${pageKey}`)) || title
  const resolvedActive = (pageKey && t(`pageHeader.${pageKey}`)) || activePage || title

  return (
    <div
      className="container-fluid page-header py-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container text-center py-5">
        <h1 className="display-1 text-white mb-4 animated slideInDown">{resolvedTitle}</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb justify-content-center mb-0" style={{ '--bs-breadcrumb-divider-color': 'rgba(255,255,255,0.6)' }}>
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{t('pageHeader.home')}</Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{
                color: '#fff',
                fontWeight: 600,
                display: 'inline-flex',
                borderBottom: '2px solid #25acbf',
                paddingBottom: '3px',
                lineHeight: 1.2,
              }}
            >
              {resolvedActive}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
