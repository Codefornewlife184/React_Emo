import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import FeatureSection from '../sections/FeatureSection.jsx'
import TeamSection from '../sections/TeamSection.jsx'

export default function About() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="about" />
      <AboutSection />
      <FeatureSection />
    </div>
  )
}
