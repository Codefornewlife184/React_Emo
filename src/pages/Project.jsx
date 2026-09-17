import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import ProjectSection from '../sections/ProjectSection.jsx'

export default function Project() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="projects" />
      <ProjectSection />
    </div>
  )
}
