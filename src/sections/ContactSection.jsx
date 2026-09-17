import { useState } from 'react'
import { FaMapPin, FaPhone, FaEnvelope } from 'react-icons/fa6'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const API_ENDPOINT =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || '/api/send-mail.php'

export default function ContactSection() {
  const { language, t } = useLanguage()
  const labels = t('contact.labels')
  const infoLabels = t('contact.info')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: 'idle', msg: '', hints: [] })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', msg: t('common.loading') })
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact', lang: language }),
      })
      const rawText = await res.text()
      let data = {}
      try { data = JSON.parse(rawText) } catch { data = {} }
      if (res.ok && data.success) {
        setStatus({ type: 'success', msg: data.message || t('contact.success'), hints: [] })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const extraHints = []
        if (!data || Object.keys(data).length === 0) {
          const clean = rawText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
          if (clean.length > 0) {
            extraHints.push('Sunucu yanıtı: ' + clean.slice(0, 300))
          }
          if (!res.ok) extraHints.push('HTTP Durum Kodu: ' + res.status + ' ' + (res.statusText || ''))
        }
        setStatus({
          type: 'error',
          msg: data.message || t('common.error'),
          hints: [
            ...(Array.isArray(data.hints) && data.hints.length ? data.hints : []),
            ...extraHints,
          ],
        })
      }
    } catch (err) {
      setStatus({
        type: 'error',
        msg: t('common.error'),
        hints: [
          'Ağ hatası: Sunucuya ulaşılamadı. İnternet bağlantınızı veya API yolunu (/api/send-mail.php) kontrol edin.',
          err && err.message ? ('Detay: ' + err.message) : '',
        ].filter(Boolean),
      })
    }
  }

  const infoCards = [
    {
      icon: FaMapPin,
      label: infoLabels.address,
      value: infoLabels.addressValue,
      delay: '0.1s',
    },
    {
      icon: FaPhone,
      label: infoLabels.phone,
      value: infoLabels.phoneValue,
      delay: '0.3s',
    },
    {
      icon: FaEnvelope,
      label: infoLabels.email,
      value: infoLabels.emailValue,
      delay: '0.5s',
    },
  ]

  const inputStyle = (focused) => ({
    width: '100%',
    padding: '0.95rem 1.25rem',
    borderRadius: '16px',
    border: '2px solid transparent',
    backgroundColor: focused ? '#ffffff' : '#f6f8fc',
    color: '#0b2960',
    fontSize: '1rem',
    fontWeight: 500,
    outline: 'none',
    transition: 'all .25s ease',
    boxShadow: focused ? '0 6px 18px rgba(37,172,191,0.15)' : 'none',
    borderColor: focused ? '#25acbf' : 'transparent',
    boxSizing: 'border-box',
    lineHeight: 1.4,
  })

  const labelStyle = {
    display: 'block',
    fontWeight: 600,
    color: '#0b2960',
    marginBottom: '0.55rem',
    fontSize: '0.95rem',
    letterSpacing: '0.1px',
  }

  const cardHoverStyle = (hover) => ({
    backgroundColor: hover ? '#ffffff' : '#f6f8fc',
    borderRadius: '18px',
    border: 'none',
    padding: '1.25rem',
    width: '100%',
    height: '100%',
    boxShadow: hover ? '0 12px 28px rgba(11,41,96,0.10)' : '0 4px 12px rgba(11,41,96,0.04)',
    transition: 'all .3s ease',
    transform: hover ? 'translateY(-3px)' : 'translateY(0)',
    boxSizing: 'border-box',
  })

  const [focused, setFocused] = useState({})
  const [cardHover, setCardHover] = useState({})
  const toggleFocus = (k, v) => setFocused((p) => ({ ...p, [k]: v }))
  const toggleCardHover = (k, v) => setCardHover((p) => ({ ...p, [k]: v }))

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h4 className="section-title">{t('contact.sectionTitle')}</h4>
          <h1 className="display-5 mb-4">{t('contact.heading')}</h1>
        </div>

        {/* 3'lü Bilgi Kartları - Modern */}
        <div className="row g-4 mb-5">
          {infoCards.map((card) => {
            const Icon = card.icon
            const key = card.label
            return (
              <div key={key} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={card.delay}>
                <div
                  onMouseEnter={() => toggleCardHover(key, true)}
                  onMouseLeave={() => toggleCardHover(key, false)}
                  style={cardHoverStyle(cardHover[key])}
                >
                  <div className="d-flex align-items-center w-100 h-100">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#25acbf',
                        borderRadius: '16px',
                        boxShadow: '0 6px 14px rgba(37,172,191,0.30)',
                      }}
                    >
                      <Icon size={24} style={{ color: '#ffffff' }} />
                    </div>
                    <div className="ms-4">
                      <p className="mb-2" style={{ color: '#6b7a92', fontWeight: 500 }}>{card.label}</p>
                      <h3 className="mb-0" style={{ color: '#0b2960', fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 700 }}>{card.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* İletişim Formu - Modern Tasarım */}
        <div className="row justify-content-center">
          <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
            <p className="mb-5 text-center" style={{ color: '#5a6a84', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>{t('contact.description')}</p>
            <form onSubmit={onSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label htmlFor="name" style={labelStyle}>{labels.name}</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={labels.name}
                    value={form.name}
                    onChange={onChange}
                    onFocus={() => toggleFocus('name', true)}
                    onBlur={() => toggleFocus('name', false)}
                    style={inputStyle(focused.name)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" style={labelStyle}>{labels.email}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={labels.email}
                    value={form.email}
                    onChange={onChange}
                    onFocus={() => toggleFocus('email', true)}
                    onBlur={() => toggleFocus('email', false)}
                    style={inputStyle(focused.email)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="subject" style={labelStyle}>{labels.subject}</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder={labels.subject}
                    value={form.subject}
                    onChange={onChange}
                    onFocus={() => toggleFocus('subject', true)}
                    onBlur={() => toggleFocus('subject', false)}
                    style={inputStyle(focused.subject)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" style={labelStyle}>{labels.message}</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder={labels.message}
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    onFocus={() => toggleFocus('message', true)}
                    onBlur={() => toggleFocus('message', false)}
                    style={{
                      ...inputStyle(focused.message),
                      minHeight: '140px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                    required
                  ></textarea>
                </div>
                {status.type === 'success' && (
                  <div className="col-12">
                    <div
                      role="alert"
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '16px',
                        backgroundColor: '#e8f8f0',
                        border: '2px solid #25acbf',
                        color: '#084a3b',
                        fontWeight: 600,
                        boxShadow: '0 6px 16px rgba(37,211,102,0.15)',
                      }}
                    >{status.msg}</div>
                  </div>
                )}
                {status.type === 'error' && (
                  <div className="col-12">
                    <div
                      role="alert"
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '16px',
                        backgroundColor: '#fdecec',
                        border: '2px solid #e35d5d',
                        color: '#842029',
                        boxShadow: '0 6px 16px rgba(227,93,93,0.15)',
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: status.hints?.length ? '10px' : 0 }}>{status.msg}</div>
                      {Array.isArray(status.hints) && status.hints.length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.6, fontSize: '0.92rem' }}>
                          {status.hints.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                <div className="col-12">
                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.5rem',
                      borderRadius: '18px',
                      border: 'none',
                      backgroundColor: '#25acbf',
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: status.type === 'loading' ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 24px rgba(37,172,191,0.32)',
                      transition: 'all .28s ease',
                      transform: status.type === 'loading' ? 'scale(1)' : 'scale(1)',
                      opacity: status.type === 'loading' ? 0.8 : 1,
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.2px',
                    }}
                    onMouseEnter={(e) => {
                      if (status.type !== 'loading') {
                        e.currentTarget.style.backgroundColor = '#0b2960'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 14px 30px rgba(11,41,96,0.28)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#25acbf'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(37,172,191,0.32)'
                    }}
                  >
                    {status.type === 'loading' ? t('common.loading') : labels.submit}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
