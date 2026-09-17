import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import FeatureSection from '../sections/FeatureSection.jsx'

export default function Feature() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="whyUs" />
      <FeatureSection />
    </div>
  )
}
