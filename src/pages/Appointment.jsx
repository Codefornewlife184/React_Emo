import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import AppointmentSection from '../sections/AppointmentSection.jsx'

export default function Appointment() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="appointment" />
      <AppointmentSection />
    </div>
  )
}
