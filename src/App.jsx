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
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0f0f13] text-gray-900 dark:text-white transition-colors duration-300">
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 dark:via-indigo-500/20 to-transparent" />
            </div>

            <PostRequestForm />

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-500/20 to-transparent" />
            </div>

            <MatchesSection />

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-rose-200 dark:via-rose-500/20 to-transparent" />
            </div>

            <CommunityBoard />
          </main>
          <Footer />
        </div>
      </div>
    </SwapProvider>
  );
}
