import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import TeamSection from '../sections/TeamSection.jsx'

export default function Team() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="team" />
      <TeamSection />
    </div>
  )
}
