import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export default function Lightbox({ images = [], startIndex = 0, isOpen, onClose }) {
  const getIndex = useCallback((idx) => {
    if (!images || images.length === 0) return 0
    const n = images.length
    return ((idx % n) + n) % n
  }, [images])

  const current = images[getIndex(startIndex)]

  const next = useCallback(() => {
    onClose({ action: 'navigate', index: getIndex(startIndex + 1) })
  }, [startIndex, getIndex, onClose])

  const prev = useCallback(() => {
    onClose({ action: 'navigate', index: getIndex(startIndex - 1) })
  }, [startIndex, getIndex, onClose])

  const close = useCallback(() => {
    onClose({ action: 'close' })
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, next, prev])

  if (!isOpen || !current) return null

  // createPortal ile doğrudan document.body altına aktarılıyor
  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: '0',
        zIndex: 999999,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <button
        aria-label="Kapat"
        onClick={close}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#25acbf',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
          transition: 'transform .2s ease',
          zIndex: 1000000,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <FaXmark size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            aria-label="Önceki"
            onClick={prev}
            style={{
              position: 'fixed',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(11,41,96,0.85)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
              transition: 'all .2s ease',
              zIndex: 1000000,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#25acbf'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11,41,96,0.85)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            aria-label="Sonraki"
            onClick={next}
            style={{
              position: 'fixed',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(11,41,96,0.85)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
              transition: 'all .2s ease',
              zIndex: 1000000,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#25acbf'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11,41,96,0.85)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      <div
        style={{
          position: 'relative',
          maxWidth: '92vw',
          maxHeight: '86vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <img
          src={current.src || current}
          alt={current.alt || ''}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 16px 60px rgba(0,0,0,0.65)',
            backgroundColor: '#fff',
          }}
          draggable={false}
        />
        {images.length > 1 && (
          <div
            style={{
              color: '#ffffff',
              fontWeight: 600,
              letterSpacing: '0.4px',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(11,41,96,0.65)',
              fontSize: '0.95rem',
            }}
          >
            {getIndex(startIndex) + 1} / {images.length}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}