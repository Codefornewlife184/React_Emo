import { useEffect, useState, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const PAINT_MS = 450
const HOLD_MS  = 80
const OUT_MS   = 380
const TOTAL_MS = PAINT_MS + HOLD_MS + OUT_MS

export default function PageTransition() {
  const location = useLocation()
  const [phase, setPhase] = useState('idle')
  const [p, setP] = useState(0)
  const prevKeyRef = useRef(location.pathname + location.search)
  const timersRef = useRef([])
  const rafRef = useRef(null)
  const startRef = useRef(0)
  const cancelRef = useRef(false)

  useEffect(() => {
    const nextKey = location.pathname + location.search
    if (prevKeyRef.current === nextKey) return
    prevKeyRef.current = nextKey

    cancelRef.current = true
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    cancelRef.current = false
    startRef.current = 0

    setPhase('in')
    setP(0)

    const animIn = (ts) => {
      if (cancelRef.current) return
      if (!startRef.current) startRef.current = ts
      const e = ts - startRef.current
      const t = Math.min(1, e / PAINT_MS)
      const ease = 1 - Math.pow(1 - t, 3)
      setP(ease)
      if (t < 1) rafRef.current = requestAnimationFrame(animIn)
    }
    rafRef.current = requestAnimationFrame(animIn)

    const h1 = setTimeout(() => setPhase('hold'), PAINT_MS)
    timersRef.current.push(h1)

    const h2 = setTimeout(() => {
      startRef.current = 0
      setPhase('out')
      const animOut = (ts) => {
        if (cancelRef.current) return
        if (!startRef.current) startRef.current = ts
        const e = ts - startRef.current
        const t = Math.min(1, e / OUT_MS)
        const ease = t * t * (3 - 2 * t)
        setP(1 - ease)
        if (t < 1) rafRef.current = requestAnimationFrame(animOut)
      }
      rafRef.current = requestAnimationFrame(animOut)
    }, PAINT_MS + HOLD_MS)
    timersRef.current.push(h2)

    const h3 = setTimeout(() => {
      setPhase('idle')
      setP(0)
    }, TOTAL_MS + 20)
    timersRef.current.push(h3)

    return () => {
      cancelRef.current = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      timersRef.current.forEach((t) => clearTimeout(t))
      timersRef.current = []
    }
  }, [location])

  const show = phase !== 'idle'
  const zBase = show ? 1073741820 : -1
  const zBrush = show ? 1073741822 : -1
  const zLogo = show ? 1073741823 : -1

  const brushPoly = (offsetY, phaseP) => {
    const in1 = -22 + 146 * phaseP
    const in2 = -40 + 164 * phaseP
    const w1 = in1, w2 = in2 - 14

    if (phase === 'in') {
      return `polygon(0 ${0 + offsetY}%, ${w1}% ${-3 + offsetY}%, ${w2}% ${103 + offsetY}%, 0 ${100 + offsetY}%)`
    }
    if (phase === 'hold') {
      return `polygon(-12% ${0 + offsetY}%, 124% ${-4 + offsetY}%, 112% ${104 + offsetY}%, -26% ${100 + offsetY}%)`
    }
    if (phase === 'out') {
      const pp = 1 - phaseP
      const left = 124 - 156 * pp
      const left2 = 112 - 148 * pp
      return `polygon(${left - 24}% ${0 + offsetY}%, 132% ${-4 + offsetY}%, 122% ${104 + offsetY}%, ${left2 - 32}% ${100 + offsetY}%)`
    }
    return 'polygon(0 0, 0 0, 0 100%, 0 100%)'
  }

  // Rulo Pozisyonu ve Opaklık Düzenlemesi
  const brushPos = (() => {
    const fromX = -16, toX = 116
    const fromY = -18, toY = 120

    if (phase === 'in') {
      return {
        x: fromX + (toX - fromX) * p,
        y: fromY + (toY - fromY) * p,
        op: 1,
      }
    }
    if (phase === 'hold') {
      return { x: toX, y: toY, op: 1 }
    }
    if (phase === 'out') {
      // p değeri 1'den 0'a düştüğü için progress'i (1 - p) ile ileriye sürüyoruz
      const outProgress = 1 - p 
      return {
        x: 116 + (140 - 116) * outProgress,
        y: 120 + (140 - 120) * outProgress,
        op: p > 0.05 ? 1 : 0, // En son ana kadar tamamen görünür tut
      }
    }
    return { x: fromX, y: fromY, op: 0 }
  })()

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="pt-brush1" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="12" />
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
          <filter id="pt-brush2" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="turbulence" baseFrequency="0.52 0.90" numOctaves="2" seed="9" />
            <feDisplacementMap in="SourceGraphic" scale="16" />
          </filter>
          <filter id="pt-brush3" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.36" numOctaves="2" seed="17" />
            <feDisplacementMap in="SourceGraphic" scale="18" />
            <feGaussianBlur stdDeviation="0.70" />
          </filter>
        </defs>
      </svg>

      {/* BOYA DARBESİ 3 KATMAN */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: '0 0 0 0',
          pointerEvents: show ? 'auto' : 'none',
          zIndex: zBase,
          opacity: show ? 0.98 : 0,
          transition: 'opacity 120ms ease',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: '0 0 0 0',
            transform: 'skewX(-18deg)',
            WebkitTransform: 'skewX(-18deg)',
            transformOrigin: '0% 50%',
            background: 'linear-gradient(108deg, #25acbf 0%, #25acbf 100%)',
            clipPath: brushPoly(0, p),
            WebkitClipPath: brushPoly(0, p),
            filter: 'url(#pt-brush1)',
            WebkitFilter: 'url(#pt-brush1)',
            willChange: 'clip-path',
            opacity: 1,
          }}
        />
        <div
          style={{
            position: 'absolute', inset: '0 0 0 0',
            transform: 'skewX(-15deg)',
            WebkitTransform: 'skewX(-15deg)',
            transformOrigin: '0% 52%',
            background: 'linear-gradient(114deg, #25acbf 0%, #0b2960 100%)',
            clipPath: brushPoly(-3.2, p),
            WebkitClipPath: brushPoly(-3.2, p),
            filter: 'url(#pt-brush2)',
            WebkitFilter: 'url(#pt-brush2)',
            willChange: 'clip-path',
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: 'absolute', inset: '0 0 0 0',
            transform: 'skewX(-21deg)',
            WebkitTransform: 'skewX(-21deg)',
            transformOrigin: '0% 48%',
            background: 'linear-gradient(102deg, rgba(11,41,96,0.95) 0%, rgba(37,172,191,0.95) 100%)',
            clipPath: brushPoly(+3.6, p),
            WebkitClipPath: brushPoly(+3.6, p),
            filter: 'url(#pt-brush3)',
            WebkitFilter: 'url(#pt-brush3)',
            willChange: 'clip-path',
            opacity: 0.36,
          }}
        />
      </div>

      {/* BOYA RULOSU (PAINT ROLLER) SVG */}
      {show && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', inset: '0 0 0 0',
            pointerEvents: 'none', overflow: 'hidden',
            zIndex: zBrush,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: `${brushPos.y}vh`,
              left: `${brushPos.x}vw`,
              width: '380px',
              height: '420px',
              transform: 'translate(-50%, -50%) rotate(-20deg)',
              WebkitTransform: 'translate(-50%, -50%) rotate(-20deg)',
              opacity: brushPos.op,
              filter: 'drop-shadow(0 22px 38px rgba(11,41,96,0.42))',
              WebkitFilter: 'drop-shadow(0 22px 38px rgba(11,41,96,0.42))',
            }}
          >
            <svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                 style={{ display: 'block', width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="r-foam" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#25acbf" />
                  <stop offset="35%" stopColor="#1a8494" />
                  <stop offset="70%" stopColor="#0b2960" />
                  <stop offset="100%" stopColor="#25acbf" />
                </linearGradient>

                <linearGradient id="r-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#d1d5db" />
                  <stop offset="70%" stopColor="#6b7280" />
                  <stop offset="100%" stopColor="#374151" />
                </linearGradient>

                <linearGradient id="r-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f7d7a7" />
                  <stop offset="50%" stopColor="#d6a76d" />
                  <stop offset="100%" stopColor="#8c5a2b" />
                </linearGradient>

                <linearGradient id="r-cap" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4b5563" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>

              <g>
                <rect x="108" y="170" width="24" height="80" rx="12" fill="url(#r-wood)" stroke="#5a3913" strokeWidth="1.2" />
                <line x1="108" y1="190" x2="132" y2="190" stroke="rgba(90,57,19,0.3)" strokeWidth="1.5" />
                <line x1="108" y1="205" x2="132" y2="205" stroke="rgba(90,57,19,0.3)" strokeWidth="1.5" />
                <line x1="108" y1="220" x2="132" y2="220" stroke="rgba(90,57,19,0.3)" strokeWidth="1.5" />
                <circle cx="120" cy="238" r="3.5" fill="#5a3913" />
              </g>

              <g fill="none" stroke="url(#r-metal)" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 120 170 L 120 120 L 195 120 L 195 50 L 180 50" strokeWidth="9" />
              </g>
              <path d="M 120 170 L 120 120 L 195 120 L 195 50 L 180 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              <g>
                <rect x="35" y="20" width="145" height="60" rx="10" fill="url(#r-foam)" stroke="#0b2960" strokeWidth="1.2" />
                <ellipse cx="35" cy="50" rx="5" ry="30" fill="url(#r-cap)" stroke="#111827" strokeWidth="1" />
                <ellipse cx="180" cy="50" rx="5" ry="30" fill="url(#r-cap)" stroke="#111827" strokeWidth="1" />

                <g opacity="0.35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
                  <line x1="50" y1="30" x2="165" y2="30" />
                  <line x1="45" y1="42" x2="170" y2="42" strokeWidth="3" />
                  <line x1="55" y1="56" x2="160" y2="56" />
                  <line x1="60" y1="68" x2="150" y2="68" strokeWidth="1.5" />
                </g>

                <g fill="rgba(11,41,96,0.3)">
                  <circle cx="65" cy="35" r="2" />
                  <circle cx="95" cy="48" r="2.5" />
                  <circle cx="135" cy="38" r="2" />
                  <circle cx="155" cy="62" r="1.8" />
                  <circle cx="80" cy="60" r="2.2" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* LOGO */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${phase === 'hold' ? 1 : 0.95})`,
          WebkitTransform: `translate(-50%, -50%) scale(${phase === 'hold' ? 1 : 0.95})`,
          pointerEvents: 'none', zIndex: zLogo,
          color: '#ffffff',
          fontFamily: "'Oswald', 'Inter', sans-serif",
          fontWeight: 700, letterSpacing: '0.08em',
          fontSize: 'clamp(1rem, 2.4vw, 1.8rem)',
          textAlign: 'center',
          opacity: phase === 'hold' ? 1 : 0,
          transition: 'opacity 120ms ease, transform 200ms cubic-bezier(0.22,1,0.36,1)',
          textShadow: '0 3px 16px rgba(0,0,0,0.35)',
          padding: '0.6rem 1.4rem', borderRadius: '6px',
          background: 'linear-gradient(92deg, rgba(11,41,96,0.42), rgba(37,172,191,0.26))',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)',
        }}
      >
        EMO SCHILDERSBEDRIJF
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <Outlet />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          div[aria-hidden="true"][style*="linear-gradient"],
          div[aria-hidden="true"] > div[style*="width: 380px"] { display: none !important; }
        }
        @media (max-width: 767.98px) {
          div[aria-hidden="true"][style*="skewX"] {
            transform: skewX(-10deg) !important;
            -webkit-transform: skewX(-10deg) !important;
          }
          div[aria-hidden="true"] > div[style*="width: 380px"] {
            width: 250px !important;
            height: 280px !important;
          }
        }
      `}</style>
      <script type="application/json" data-pt-total-ms={String(TOTAL_MS + 20)}
              dangerouslySetInnerHTML={{ __html: '' }} />
    </>
  )
}