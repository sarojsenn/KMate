export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            SwapFinder
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-600 text-center">
          Made with{' '}
          <span className="text-rose-500 animate-pulse inline-block">❤️</span>
          {' '}for everyone finding a better swap.
        </p>
      </div>
    </footer>
  );
}
