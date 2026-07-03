import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart, FiStar, FiCopy, FiTrash2, FiCheck, FiClock, FiBook, FiMessageSquare
} from 'react-icons/fi';
import { useSwap } from '../context/SwapContext';
import { formatTimeAgo, getInitials, getAvatarColor } from '../utils/helpers';

function SwapCard({ request }) {
  const { deleteRequest, toggleLike, toggleSave, setReaction } = useSwap();
  const [copied, setCopied] = useState(false);

  const semBadge = request.semester === '3rd'
    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30'
    : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';

  const avatarColor = getAvatarColor(request.name);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(request.contact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [request.contact]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white dark:bg-[#161620] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-md shadow-gray-100/50 dark:shadow-black/20 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/40 hover:border-indigo-200/50 dark:hover:border-indigo-500/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
            {getInitials(request.name)}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{request.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-500 font-medium flex items-center gap-1">
                <FiBook size={10} /> {request.rollNumber}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${semBadge}`}>
                {request.semester} Sem
              </span>
            </div>
          </div>
        </div>
        {/* Time */}
        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600 flex-shrink-0">
          <FiClock size={11} />
          <LiveTime timestamp={request.createdAt} />
        </div>
      </div>

      {/* Section Info */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-1.5">Current Section</p>
          <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-bold border border-blue-200 dark:border-blue-500/20">
            {request.currentSection}
          </span>
        </div>
        <div className="text-gray-300 dark:text-gray-700 text-lg font-light self-end mb-1">→</div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-1.5">Looking For</p>
          <div className="flex flex-wrap gap-1.5">
            {request.wantedSections.map(s => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {request.verified && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-200 text-xs font-semibold border border-indigo-100 dark:border-indigo-500/20">
            <FiCheck size={12} /> Verified by admin
          </span>
        )}
        {request.recentlyActive && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 text-xs font-semibold border border-emerald-100 dark:border-emerald-500/20">
            Active now
          </span>
        )}
        {request.highlyRated && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-200 text-xs font-semibold border border-amber-100 dark:border-amber-500/20">
            <FiStar size={12} /> Highly rated swap partner
          </span>
        )}
      </div>

      {/* Contact */}
      <div className="mb-3 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/5">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 mb-0.5">📩 Contact</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{request.contact}</p>
      </div>

      {/* Note */}
      {request.note && (
        <div className="mb-4 px-3 py-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
          <p className="text-xs text-gray-500 dark:text-gray-500 italic leading-relaxed">&quot;{request.note}&quot;</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 border-t border-gray-50 dark:border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleLike(request.id)}
            id={`like-btn-${request.id}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              request.liked
                ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                : 'text-gray-500 dark:text-gray-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20'
            }`}
          >
            <FiHeart size={13} className={request.liked ? 'fill-current' : ''} />
            <span>Interested</span>
            {request.likes > 0 && <span className="text-xs opacity-70">({request.likes})</span>}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleSave(request.id)}
            id={`save-btn-${request.id}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              request.saved
                ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30'
                : 'text-gray-500 dark:text-gray-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-200 dark:hover:border-amber-500/20'
            }`}
          >
            <FiStar size={13} className={request.saved ? 'fill-current' : ''} />
            <span>Save</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleCopy}
            id={`copy-btn-${request.id}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 dark:text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1 text-emerald-500"
                >
                  <FiCheck size={13} /> Copied!
                </motion.span>
              ) : (
                <motion.span key="copy" className="flex items-center gap-1">
                  <FiCopy size={13} /> Copy Contact
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => deleteRequest(request.id)}
            id={`delete-btn-${request.id}`}
            className="ml-auto flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-400 dark:text-gray-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 transition-all duration-200"
            title="Delete request"
          >
            <FiTrash2 size={13} />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Interested', 'Maybe', 'Need more info'].map(option => {
            const active = request.reaction === option;
            const icon = option === 'Interested'
              ? <FiHeart size={13} />
              : option === 'Maybe'
                ? <FiClock size={13} />
                : <FiMessageSquare size={13} />;
            return (
              <motion.button
                key={option}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReaction(request.id, option)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 dark:text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/20'
                }`}
              >
                {icon}
                <span>{option}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Live time component that updates every minute
function LiveTime({ timestamp }) {
  const [, setTick] = useState(0);
  // We re-render every 30s to update relative time
  // Using a simple approach without useEffect memory leak
  return <span>{formatTimeAgo(timestamp)}</span>;
}

export default SwapCard;
