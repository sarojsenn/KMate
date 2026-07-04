import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useSwap } from '../context/SwapContext';
import { getInitials, getAvatarColor } from '../utils/helpers';

function StudentCard({ request }) {
  const avatarColor = getAvatarColor(request.name);
  const semBadge = request.semester === '3rd'
    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
    : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400';

  return (
    <div className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
          {getInitials(request.name)}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{request.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{request.rollNumber}</p>
          <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${semBadge}`}>
            {request.semester} Sem
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Has</p>
          <span className="px-2.5 py-1 rounded-md bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 text-xs font-bold">
            {request.currentSection}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Wants</p>
          <div className="flex flex-wrap gap-1">
            {request.wantedSections.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match, index }) {
  const isComplete = match.matchType === 'complete';

  return (
    <motion.div
      key={match.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`border rounded-xl p-5 ${isComplete ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-500/5' : 'border-amber-200 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{isComplete ? '🎉' : '💬'}</span>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">{isComplete ? 'Perfect Match' : 'Potential Match'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{isComplete ? 'These two can swap directly' : 'Talk it out and find a deal'}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${isComplete ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'}`}>
          {isComplete ? 'COMPLETE' : 'PARTIAL'}
        </span>
      </div>

      {/* Students */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <StudentCard request={match.a} />
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            ↔
          </div>
        </div>
        <StudentCard request={match.b} />
      </div>

      {/* Footer */}
      <div className={`mt-4 pt-3 border-t text-xs text-center ${isComplete ? 'border-emerald-100 dark:border-emerald-500/15 text-gray-500 dark:text-gray-400' : 'border-amber-100 dark:border-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
        {isComplete ? 'Contact each other to confirm the swap' : 'Partial match — discuss to make it work'}
      </div>
    </motion.div>
  );
}

export default function MatchesSection() {
  const { matches, requests, activeRequestId } = useSwap();
  const activeRequest = useMemo(() => requests.find(r => r.id === activeRequestId), [requests, activeRequestId]);

  return (
    <section id="matches" className="py-20 px-4 sm:px-6 bg-transparent">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Step 2
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Your Matches</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Automatically detected swap pairs based on your selected request.
          </p>
        </motion.div>

        {/* Active request card */}
        {activeRequest ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-[#1a1a1a]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-0.5">Selected Request</p>
                <p className="font-bold text-gray-900 dark:text-white">{activeRequest.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Section {activeRequest.currentSection} → Wants {activeRequest.wantedSections.join(', ')}</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20 whitespace-nowrap">
                {matches.length} match{matches.length !== 1 ? 'es' : ''}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">Select a request from the board to see matches here.</p>
          </motion.div>
        )}

        {/* Matches */}
        <AnimatePresence mode="wait">
          {matches.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16 px-8 rounded-xl border border-dashed border-gray-200 dark:border-white/10"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-1">No matches yet</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-5">Post a request and we'll scan for compatible swaps.</p>
              <button onClick={() => document.querySelector('#post-request')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors duration-150"
              >
                Post a Request <FiArrowRight size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {matches.map((match, i) => <MatchCard key={match.key} match={match} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
