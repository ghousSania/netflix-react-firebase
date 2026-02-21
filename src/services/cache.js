const memoryCache = new Map();

const DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

const normalizeKey = (key) => key.trim().toLowerCase();

export const getCache = (key) => {
  const normalizedKey = normalizeKey(key);

  // Check memory cache first
  if (memoryCache.has(normalizedKey)) {
    const entry = memoryCache.get(normalizedKey);
    if (Date.now() < entry.expiry) {
      return entry.value;
    }
    memoryCache.delete(normalizedKey);
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem(normalizedKey);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (Date.now() < parsed.expiry) {
      memoryCache.set(normalizedKey, parsed);
      return parsed.value;
    }

    localStorage.removeItem(normalizedKey);
  } catch (err) {
    console.warn("Cache parse error:", err);
    localStorage.removeItem(normalizedKey);
  }

  return null;
};

export const setCache = (key, value, ttl = DEFAULT_TTL) => {
  const normalizedKey = normalizeKey(key);

  const entry = {
    value,
    expiry: Date.now() + ttl,
  };

  memoryCache.set(normalizedKey, entry);
  localStorage.setItem(normalizedKey, JSON.stringify(entry));
};
