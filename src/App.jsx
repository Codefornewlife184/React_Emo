import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Service from './pages/Service.jsx'
import Feature from './pages/Feature.jsx'
import Project from './pages/Project.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import Team from './pages/Team.jsx'
import Appointment from './pages/Appointment.jsx'
import Testimonial from './pages/Testimonial.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Privacy from './pages/Privacy.jsx'
import IcMekanBoyama from './pages/IcMekanBoyama.jsx'
import DisCepheBoyama from './pages/DisCepheBoyama.jsx'
import BakimBoyama from './pages/BakimBoyama.jsx'
import AhsapTamiri from './pages/AhsapTamiri.jsx'
import LateksBoyama from './pages/LateksBoyama.jsx'
import DuvarKagidi from './pages/DuvarKagidi.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="service/ic-mekan-boyama" element={<IcMekanBoyama />} />
          <Route path="service/dis-cephe-boyama" element={<DisCepheBoyama />} />
          <Route path="service/bakim-boyama" element={<BakimBoyama />} />
          <Route path="service/ahsap-tamiri-ve-boyama" element={<AhsapTamiri />} />
          <Route path="service/lateks-boyama" element={<LateksBoyama />} />
          <Route path="service/duvar-kagidi" element={<DuvarKagidi />} />
          <Route path="gallery/:slug" element={<GalleryPage />} />
          <Route path="feature" element={<Feature />} />
          <Route path="project" element={<Project />} />
          <Route path="team" element={<Team />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}

export default App
