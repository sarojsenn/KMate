import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart, FiStar, FiCopy, FiTrash2, FiCheck, FiClock, FiBook, FiMessageSquare, FiTarget
} from 'react-icons/fi';
import { useSwap } from '../context/SwapContext';
import { formatTimeAgo, getInitials, getAvatarColor } from '../utils/helpers';

function SwapCard({ request }) {
  const { deleteRequest, toggleLike, toggleSave, setReaction, activeRequestId, setActiveRequestId } = useSwap();
  const [copied, setCopied] = useState(false);

  const avatarColor = getAvatarColor(request.name);
  const semBadge = request.semester === '3rd'
    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20'
    : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(request.contact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [request.contact]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/8 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
            {getInitials(request.name)}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">{request.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <FiBook size={9} /> {request.rollNumber}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold border ${semBadge}`}>
                {request.semester} Sem
              </span>
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-600">
          <FiClock size={10} />
          <LiveTime timestamp={request.createdAt} />
        </span>
      </div>

      {/* Sections */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Has</p>
          <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/8 text-gray-800 dark:text-gray-200 text-xs font-bold">
            {request.currentSection}
          </span>
        </div>
        <span className="text-gray-300 dark:text-gray-600 text-base font-light self-end mb-0.5">→</span>
        <div>
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Wants</p>
          <div className="flex flex-wrap gap-1">
            {request.wantedSections.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-100 dark:border-emerald-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      {(request.verified || request.recentlyActive || request.highlyRated) && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {request.verified && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
              <FiCheck size={10} /> Verified
            </span>
          )}
          {request.recentlyActive && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
            </span>
          )}
          {request.highlyRated && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
              <FiStar size={10} /> Top Swapper
            </span>
          )}
        </div>
      )}

      {/* Contact */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/4 border border-gray-100 dark:border-white/6">
        <p className="text-[10px] font-semibold text-gray-400 mb-0.5 uppercase tracking-wider">Contact</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{request.contact}</p>
      </div>

      {/* Note */}
      {request.note && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">"{request.note}"</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-100 dark:border-white/5">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Like */}
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => toggleLike(request.id)} id={`like-btn-${request.id}`}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 ${request.liked ? 'bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20' : 'text-gray-500 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 border border-transparent'}`}
          >
            <FiHeart size={12} className={request.liked ? 'fill-current' : ''} />
            Interested
            {request.likes > 0 && <span className="opacity-60">({request.likes})</span>}
          </motion.button>

          {/* Save */}
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => toggleSave(request.id)} id={`save-btn-${request.id}`}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 ${request.saved ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border border-amber-100 dark:border-amber-500/20' : 'text-gray-500 dark:text-gray-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/8 border border-transparent'}`}
          >
            <FiStar size={12} className={request.saved ? 'fill-current' : ''} /> Save
          </motion.button>

          {/* Copy */}
          <motion.button whileTap={{ scale: 0.88 }} onClick={handleCopy} id={`copy-btn-${request.id}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-gray-500 dark:text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/8 border border-transparent transition-colors duration-150"
          >
            <AnimatePresence mode="wait">
              {copied
                ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1 text-green-500"><FiCheck size={12} /> Copied</motion.span>
                : <motion.span key="copy" className="flex items-center gap-1"><FiCopy size={12} /> Copy</motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Select */}
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => setActiveRequestId(request.id)} id={`select-btn-${request.id}`}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 ${request.id === activeRequestId ? 'bg-emerald-600 text-white font-bold' : 'text-gray-500 dark:text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/8 border border-transparent'}`}
          >
            <FiTarget size={12} /> {request.id === activeRequestId ? 'Selected' : 'Select'}
          </motion.button>

          {/* Delete */}
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => deleteRequest(request.id)} id={`delete-btn-${request.id}`}
            className="ml-auto flex items-center px-2 py-1.5 rounded-md text-xs text-gray-400 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 border border-transparent transition-colors duration-150"
          >
            <FiTrash2 size={12} />
          </motion.button>
        </div>

        {/* Reactions */}
        <div className="flex flex-wrap gap-1.5">
          {['Interested', 'Maybe', 'Need more info'].map(option => {
            const active = request.reaction === option;
            const icon = option === 'Interested' ? <FiHeart size={12} />
              : option === 'Maybe' ? <FiClock size={12} />
                : <FiMessageSquare size={12} />;
            return (
              <motion.button key={option} whileTap={{ scale: 0.95 }} onClick={() => setReaction(request.id, option)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 ${active ? 'bg-emerald-600 text-white font-bold' : 'text-gray-500 dark:text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/8 border border-transparent'}`}
              >
                {icon} {option}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function LiveTime({ timestamp }) {
  const [, setTick] = useState(0);
  return <span>{formatTimeAgo(timestamp)}</span>;
}

export default SwapCard;
