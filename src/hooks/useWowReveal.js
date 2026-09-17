import { useEffect, useRef } from 'react'

export default function useWowReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const elements = node.querySelectorAll('[data-wow-delay]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delayStr = el.getAttribute('data-wow-delay') || '0s'
            const delay = parseFloat(delayStr) * 1000 || 100
            setTimeout(() => {
              let anim = 'fadeInUp'
              if (el.classList.contains('wow')) {
                if (el.classList.contains('fadeIn')) anim = 'fadeIn'
                else if (el.classList.contains('fadeInUp')) anim = 'fadeInUp'
                else if (el.classList.contains('slideInDown')) anim = 'slideInDown'
                else if (el.classList.contains('slideInLeft')) anim = 'slideInLeft'
              }
              el.style.visibility = 'visible'
              el.classList.add('animate__animated', `animate__${anim}`)
            }, delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => {
      el.style.visibility = 'hidden'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
