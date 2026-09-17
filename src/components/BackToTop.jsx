import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa6'

export default function BackToTop() {
  const [waHover, setWaHover] = useState(false)
  const [topHover, setTopHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Yukarı Çık Butonu */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        onMouseEnter={() => setTopHover(true)}
        onMouseLeave={() => setTopHover(false)}
        style={{
          position: 'fixed',
          bottom: '22px',
          left: '22px',
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: topHover ? '#0b2960' : '#25acbf',
          color: '#fff',
          boxShadow: topHover
            ? '0 10px 24px rgba(11,41,96,0.45)'
            : '0 6px 16px rgba(37,172,191,0.42)',
          zIndex: 9999999,
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color .25s ease, box-shadow .25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          margin: 0,
        }}
      >
        <FaArrowUp size={20} />
      </button>

      {/* WhatsApp Butonu */}
      <a
        href="https://wa.me/31687272979"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onMouseEnter={() => setWaHover(true)}
        onMouseLeave={() => setWaHover(false)}
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '22px',
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: waHover ? '#25D366' : '#25acbf',
          color: waHover ? '#fff' : '#0b2960',
          boxShadow: waHover
            ? '0 10px 24px rgba(37,211,102,0.5)'
            : '0 6px 16px rgba(37,172,191,0.42)',
          zIndex: 9999999,
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color .25s ease, box-shadow .25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        <FaWhatsapp size={24} />
      </a>
    </>,
    document.body
  )
}