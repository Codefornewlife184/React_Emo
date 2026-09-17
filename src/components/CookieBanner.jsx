import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCookieBite, FaChevronUp, FaChevronDown, FaCheck, FaXmark } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const LS_KEY = 'emo_cookie_consent_v1'

function loadConsent() {
  try {
    const s = localStorage.getItem(LS_KEY)
    if (!s) return null
    const j = JSON.parse(s)
    if (!j || typeof j !== 'object' || !j.version) return null
    return j
  } catch (_) { return null }
}

function saveConsent(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...data, version: 1, at: Date.now() }))
  } catch (_) {}
}

export default function CookieBanner() {
  const { t, language } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [checks, setChecks] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  // İlk yüklemede: localStorage yoksa göster
  useEffect(() => {
    try {
      const c = loadConsent()
      if (!c) {
        const t1 = setTimeout(() => setVisible(true), 350)
        return () => clearTimeout(t1)
      } else {
        setChecks({
          necessary: true,
          analytics: !!c.analytics,
          marketing: !!c.marketing,
        })
      }
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => setVisible(false)

  const applyAndSave = (payload) => {
    const final = { necessary: true, analytics: false, marketing: false, ...payload }
    saveConsent(final)
    setChecks({ necessary: final.necessary, analytics: final.analytics, marketing: final.marketing })
    // Prior consent: Burada analitik/pazarlama scriptleri DİNAMİK olarak yüklenebilir
    // Şu an projede GA/FB Pixel yok; sadece state saklanır
    close()
    setExpanded(false)
  }

  const acceptAll = () => applyAndSave({ analytics: true, marketing: true })
  const rejectAll = () => applyAndSave({ analytics: false, marketing: false })
  const savePrefs = () => applyAndSave({ analytics: checks.analytics, marketing: checks.marketing })

  const txt = (t && t('cookieBanner')) || {}
  if (!txt || !txt.title) return null

  const btnBase = (color, bg, hoverBg) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
    minWidth: 0,
    padding: '0.65rem 0.8rem',
    fontSize: '0.85rem',
    fontWeight: 700,
    borderRadius: '9px',
    border: `2px solid ${color}`,
    color: color,
    backgroundColor: bg || 'transparent',
    transition: 'all .22s ease',
    cursor: 'pointer',
    whiteSpace: 'normal',
    letterSpacing: '0.2px',
    lineHeight: 1.25,
    minHeight: '44px',
    boxShadow: bg ? '0 3px 8px rgba(0,0,0,0.1)' : 'none',
    _hoverColor: hoverBg,
  })

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={txt.title}
          style={{
            position: 'fixed',
            bottom: '18px',
            left: '18px',
            right: '18px',
            zIndex: 9999,
            width: 'auto',
            maxWidth: '560px',
            maxHeight: '92vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 16px 36px rgba(11, 41, 96, 0.26), 0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid rgba(37, 172, 191, 0.22)',
            color: '#0b2960',
            fontFamily: 'inherit',
            animation: 'fadeUpCookie .35s ease both',
          }}
        >
          {/* Kafa */}
          <div
            className="d-flex align-items-center justify-content-between"
            style={{
              padding: '1rem 1.1rem 0.8rem 1.1rem',
              borderBottom: '1px solid rgba(11,41,96,0.08)',
              background: 'linear-gradient(90deg, rgba(37,172,191,0.08) 0%, #ffffff 100%)',
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#25acbf',
                  color: '#fff',
                  boxShadow: '0 3px 8px rgba(37,172,191,0.3)',
                }}
              >
                <FaCookieBite size={18} />
              </span>
              <h6 style={{ margin: 0, color: '#0b2960', fontWeight: 700, fontSize: '1.02rem' }}>{txt.title}</h6>
            </div>
            <button
              type="button"
              onClick={() => { savePrefs() }}
              title={txt.btnClose || 'Kapat'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'rgba(11,41,96,0.08)',
                color: '#0b2960',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0b2960'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(11,41,96,0.08)'; e.currentTarget.style.color = '#0b2960' }}
            >
              <FaXmark size={16} />
            </button>
          </div>

          {/* Govde */}
          <div style={{ padding: '1rem 1.1rem 1rem 1.1rem' }}>
            <p
              style={{
                margin: 0,
                color: '#334155',
                fontSize: '0.9rem',
                lineHeight: 1.65,
              }}
            >
              {txt.text}{' '}
              <Link
                to="/privacy"
                onClick={() => savePrefs()}
                style={{ color: '#25acbf', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                {t('footer.privacy')}
              </Link>
              .
            </p>

            {/* Genisletilebilir ayarlar */}
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="mt-3"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.55rem 0.85rem',
                borderRadius: '9px',
                backgroundColor: 'rgba(11,41,96,0.05)',
                color: '#0b2960',
                border: '1px solid rgba(11,41,96,0.1)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(37,172,191,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,172,191,0.35)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(11,41,96,0.05)'; e.currentTarget.style.borderColor = 'rgba(11,41,96,0.1)' }}
            >
              <span>{txt.btnManage}</span>
              <span>{expanded ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}</span>
            </button>

            {expanded && (
              <div
                style={{
                  marginTop: '0.7rem',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(11,41,96,0.03)',
                  border: '1px solid rgba(11,41,96,0.08)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                {[
                  { k: 'necessary', data: txt.necessary },
                  { k: 'analytics', data: txt.analytics },
                  { k: 'marketing', data: txt.marketing },
                ].map(({ k, data }) => {
                  const disabled = data && data.required
                  const checked = checks[k]
                  return (
                    <label
                      key={k}
                      className="d-inline-flex align-items-start gap-2"
                      style={{
                        cursor: disabled ? 'default' : 'pointer',
                        width: '100%',
                        padding: '0.5rem 0.55rem',
                        borderRadius: '8px',
                        backgroundColor: checked ? 'rgba(37,172,191,0.09)' : 'transparent',
                        transition: 'all .18s ease',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          marginTop: '1px',
                          borderRadius: '6px',
                          border: `2px solid ${checked ? '#25acbf' : '#0b2960'}`,
                          backgroundColor: checked ? '#25acbf' : '#fff',
                          color: '#fff',
                          transition: 'all .18s ease',
                          opacity: disabled ? 0.95 : 1,
                          flexShrink: 0,
                        }}
                      >
                        {checked && <FaCheck size={11} />}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={(e) => { if (!disabled) setChecks((c) => ({ ...c, [k]: e.target.checked })) }}
                        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: '#0b2960', fontSize: '0.88rem', lineHeight: 1.4 }}>
                          {data?.label || k}
                          {disabled && (
                            <span
                              style={{
                                marginLeft: '8px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#fff',
                                backgroundColor: '#0b2960',
                                padding: '1px 7px',
                                borderRadius: '999px',
                                verticalAlign: 'middle',
                              }}
                            >
                              {language === 'tr' ? 'Zorunlu' : language === 'nl' ? 'Verplicht' : 'Required'}
                            </span>
                          )}
                        </div>
                        <div style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '2px' }}>
                          {data?.desc}
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            )}

            {/* 3 Buton esit boyut - Eşit kolaylık ilkesi */}
            <div
              className="mt-3 cookie-btn-grid"
            >
              {/* 1) Tercihleri Ayarla (Manage) */}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                onMouseEnter={(e) => { if (e.currentTarget._hoverColor) { e.currentTarget.style.backgroundColor = 'rgba(11,41,96,0.09)'; e.currentTarget.style.transform = 'translateY(-1px)' }}}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                style={btnBase('#0b2960', 'transparent')}
              >
                {txt.btnManage}
              </button>

              {/* 2) Tumunu Reddet */}
              <button
                type="button"
                onClick={rejectAll}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0b2960'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(11,41,96,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0b2960'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                style={btnBase('#0b2960', 'transparent')}
              >
                {txt.btnRejectAll}
              </button>

              {/* 3) Tumunu Kabul Et */}
              <button
                type="button"
                onClick={acceptAll}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0b2960'; e.currentTarget.style.borderColor = '#0b2960'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 14px rgba(11,41,96,0.28)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25acbf'; e.currentTarget.style.borderColor = '#25acbf'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)' }}
                style={btnBase('#fff', '#25acbf')}
              >
                {txt.btnAcceptAll}
              </button>
            </div>

            {expanded && (
              <button
                type="button"
                onClick={savePrefs}
                className="mt-3 w-100"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0b2960'; e.currentTarget.style.borderColor = '#0b2960'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25acbf'; e.currentTarget.style.borderColor = '#25acbf'; e.currentTarget.style.transform = 'translateY(0)' }}
                style={{
                  marginTop: '0.9rem',
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '10px',
                  border: '2px solid #25acbf',
                  backgroundColor: '#25acbf',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all .22s ease',
                }}
              >
                {txt.btnSave}
              </button>
            )}
          </div>
        </div>
      )}

      {/* CSS keyframes inline (ilk kez yukleme animasyonu) */}
      {visible && (
        <style>{`
          @keyframes fadeUpCookie {
            from { opacity: 0; transform: translateY(14px) scale(0.985); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .cookie-btn-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.55rem;
          }
          @media (max-width: 520px) {
            .cookie-btn-grid {
              grid-template-columns: 1fr 1fr;
            }
            .cookie-btn-grid > button:last-child {
              grid-column: span 2;
            }
          }
          @media (max-width: 380px) {
            .cookie-btn-grid {
              grid-template-columns: 1fr;
            }
            .cookie-btn-grid > button:last-child {
              grid-column: auto;
            }
          }
        `}</style>
      )}
    </>
  )
}
