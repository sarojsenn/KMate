import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const SwapContext = createContext(null);

const STORAGE_KEY = 'swapfinder_swap_requests';
const ACTIVE_REQUEST_KEY = 'swapfinder_active_request';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function SwapProvider({ children }) {
  const [requests, setRequests] = useState(loadFromStorage);
  const [activeRequestId, setActiveRequestId] = useState(() => {
    try {
      return localStorage.getItem(ACTIVE_REQUEST_KEY);
    } catch {
      return null;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('swapfinder_dark_mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    if (activeRequestId) {
      localStorage.setItem(ACTIVE_REQUEST_KEY, activeRequestId);
    } else {
      localStorage.removeItem(ACTIVE_REQUEST_KEY);
    }
  }, [activeRequestId]);

  useEffect(() => {
    localStorage.setItem('swapfinder_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addRequest = useCallback((data) => {
    const newRequest = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      likes: 0,
      saved: false,
      liked: false,
      reaction: null,
      verified: Math.random() < 0.35,
      recentlyActive: true,
      highlyRated: Math.random() < 0.25,
    };
    setRequests(prev => [newRequest, ...prev]);
    setActiveRequestId(newRequest.id);
    return newRequest.id;
  }, []);

  const deleteRequest = useCallback((id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  }, []);

  const toggleLike = useCallback((id) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
        : r
    ));
  }, []);

  const toggleSave = useCallback((id) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, saved: !r.saved } : r
    ));
  }, []);

  const setReaction = useCallback((id, reaction) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, reaction: r.reaction === reaction ? null : reaction } : r
    ));
  }, []);

  const matches = useMemo(() => {
    if (!activeRequestId) return [];

    const result = [];
    for (let i = 0; i < requests.length; i++) {
      for (let j = i + 1; j < requests.length; j++) {
        const a = requests[i];
        const b = requests[j];
        const aWantsB = a.wantedSections.includes(b.currentSection);
        const bWantsA = b.wantedSections.includes(a.currentSection);
        if (aWantsB && bWantsA && (a.id === activeRequestId || b.id === activeRequestId)) {
          result.push({ a, b, key: `${a.id}-${b.id}` });
        }
      }
    }
    return result;
  }, [requests, activeRequestId]);

  return (
    <SwapContext.Provider value={{
      requests, addRequest, deleteRequest, toggleLike, toggleSave, setReaction,
      matches, activeRequestId, setActiveRequestId, darkMode, setDarkMode
    }}>
      {children}
    </SwapContext.Provider>
  );
}

export function useSwap() {
  const ctx = useContext(SwapContext);
  if (!ctx) throw new Error('useSwap must be used within SwapProvider');
  return ctx;
}
