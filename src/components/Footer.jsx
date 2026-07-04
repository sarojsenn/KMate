export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-white/8 bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/kswapfinder-logo.png" alt="KSwapFinder Logo" className="w-6 h-6 rounded object-cover" />
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            KSwapFinder
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-600 text-center font-medium">
          Made with{' '}
          <span className="text-emerald-500 inline-block animate-pulse">❤️</span>
          {' '}for everyone finding a better swap at KIIT.
        </p>
      </div>
    </footer>
  );
}
