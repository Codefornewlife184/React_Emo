import useWowReveal from '../hooks/useWowReveal.js'
import HeroCarousel from '../sections/HeroCarousel.jsx'
import FactsSection from '../sections/FactsSection.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import FeatureSection from '../sections/FeatureSection.jsx'
import ProjectSection from '../sections/ProjectSection.jsx'
import AppointmentSection from '../sections/AppointmentSection.jsx'
import TestimonialCarousel from '../sections/TestimonialCarousel.jsx'
import ContactSection from '../sections/ContactSection.jsx'

export default function Home() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <HeroCarousel />
      <FactsSection />
      <AboutSection />
      <FeatureSection />
      <ServicesSection />
      <AppointmentSection />
      <ProjectSection />
      <ContactSection />
      <TestimonialCarousel />
    </div>
  )
}
