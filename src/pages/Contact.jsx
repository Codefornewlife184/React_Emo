import useWowReveal from '../hooks/useWowReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import ContactSection from '../sections/ContactSection.jsx'

export default function Contact() {
  const ref = useWowReveal()
  return (
    <div ref={ref}>
      <PageHeader pageKey="contact" />
      <ContactSection />
      <div className="container-fluid px-0 wow fadeIn" data-wow-delay="0.1s" style={{ width: '100%', margin: 0, padding: 0 }}>
        <iframe
          className="w-100 mb-n2"
          style={{ height: '450px', border: 0, display: 'block', width: '100%', maxWidth: '100%' }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.0885129740313!2d4.273827123829854!3d52.05991194884858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b13b4715080f%3A0x78a2da48fa35360f!2sDriebergenstraat%20103%2C%202546%20BC%20Den%20Haag%2C%20Hollanda!5e0!3m2!1str!2str!4v1789592612419!5m2!1str!2str"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  )
}
