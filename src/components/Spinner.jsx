import { useState, useEffect } from 'react'

export default function Spinner() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      id="spinner"
      className={`${show ? 'show' : ''} bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center`}
    >
      <div
        className="spinner-border position-relative"
        style={{ width: '6rem', height: '6rem', color: '#25acbf' }}
        role="status"
      ></div>
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src="/icons/icon-1.png"
        alt="Icon"
      />
    </div>
  )
}
