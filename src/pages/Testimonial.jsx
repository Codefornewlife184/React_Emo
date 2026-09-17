import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import TestimonialCarousel from '../sections/TestimonialCarousel.jsx'

export default function Testimonial() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="testimonials" />
      <TestimonialCarousel />
    </div>
  )
}
