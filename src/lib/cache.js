export const CACHE_DURATION = 120 * 60 * 1000; // 2 hours

const STORAGE_KEY = 'bet-checker-cache';

function loadCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage full, ignore
  }
}

const cache = loadCache();

export function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    delete cache[key];
    return null;
  }
  return entry.data;
}

export function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
  persistCache(cache);
}

export function invalidateCache(key) {
  delete cache[key];
  persistCache(cache);
}

export function clearCache() {
  Object.keys(cache).forEach(k => delete cache[k]);
  persistCache(cache);
}

export function clearExpired() {
  const now = Date.now();
  Object.keys(cache).forEach(key => {
    if (now - cache[key].timestamp > CACHE_DURATION) {
      delete cache[key];
    }
  });
  persistCache(cache);
}
