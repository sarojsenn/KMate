import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { useSwap } from '../context/SwapContext';

const NAV_LINKS = [
  { label: 'Home',         href: '#hero' },
  { label: 'Post Request', href: '#post-request' },
  { label: 'Matches',      href: '#matches' },
  { label: 'Community',    href: '#community-board' },
];

export default function Navbar() {
  const { darkMode, setDarkMode } = useSwap();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-2">
            <img src="/kswapfinder-logo.png" alt="KSwapFinder Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-bold text-gray-900 dark:text-white text-[16px] tracking-tight">KSwapFinder</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-colors duration-150"
              aria-label="Toggle dark mode"
              id="dark-mode-toggle"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={darkMode ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-colors duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 dark:border-white/8 bg-white dark:bg-[#111111]"
          >
            <div className="px-4 py-2 space-y-0.5">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
