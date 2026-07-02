import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureSections from './components/FeatureSections'
import FinancingSection from './components/FinancingSection'
import GalleryGrid from './components/GalleryGrid'
import VideoSection from './components/VideoSection'
import YouTubeShortsCarousel from './components/YouTubeShortsCarousel'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-charcoal text-white antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSections />
        <FinancingSection />
        <YouTubeShortsCarousel />
        <VideoSection />
        <GalleryGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
