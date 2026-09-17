import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import FactsSection from '../sections/FactsSection.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import TestimonialCarousel from '../sections/TestimonialCarousel.jsx'

export default function Service() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="services" />
      <ServicesSection />
      <FactsSection />
    </div>
  )
}
