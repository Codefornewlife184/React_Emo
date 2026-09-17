import Spinner from './Spinner.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import CookieBanner from './CookieBanner.jsx'
import SeoHead from './SeoHead.jsx'
import PageTransition from './PageTransition.jsx'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <SeoHead />
      <Spinner />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
      <CookieBanner />
    </>
  )
}