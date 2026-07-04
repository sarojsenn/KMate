import { SwapProvider } from './context/SwapContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PostRequestForm from './components/PostRequestForm';
import MatchesSection from './components/MatchesSection';
import CommunityBoard from './components/CommunityBoard';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <SwapProvider>
      <div className="relative min-h-screen bg-white dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-300">
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gray-100 dark:bg-white/5" />
            </div>

            <PostRequestForm />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gray-100 dark:bg-white/5" />
            </div>

            <MatchesSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gray-100 dark:bg-white/5" />
            </div>

            <CommunityBoard />
          </main>
          <Footer />
        </div>
      </div>
    </SwapProvider>
  );
}
