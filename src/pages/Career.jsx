import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import CareerSection from '../sections/CareerSection.jsx'

export default function Career() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="career" />
      <CareerSection />
    </div>
  )
}
