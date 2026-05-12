import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_USER = 'guest';

function getUserKey(userEmail) {
  return (userEmail || DEFAULT_USER).trim().toLowerCase();
}

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify({ users: {} }, null, 2));
  }
}

export function createFavoritesStore(projectRoot) {
  const filePath = path.join(projectRoot, 'js', 'data', 'dynamic', 'favorites.json');

  async function readStore() {
    await ensureFile(filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw || '{ "users": {} }');
  }

  async function writeStore(store) {
    await fs.writeFile(filePath, JSON.stringify(store, null, 2));
  }

  function getUser(store, userEmail) {
    const userKey = getUserKey(userEmail);
    store.users[userKey] ||= { universities: [], scholarships: [] };
    return store.users[userKey];
  }

  async function getFavorites(userEmail) {
    const store = await readStore();
    return getUser(store, userEmail);
  }

  async function saveFavorite(userEmail, type, item) {
    const store = await readStore();
    const user = getUser(store, userEmail);
    const list = type === 'scholarship' ? user.scholarships : user.universities;
    const savedItem = { ...item, savedAt: item.savedAt || new Date().toISOString() };
    const existing = list.findIndex((entry) => entry.id === savedItem.id);

    if (existing >= 0) list[existing] = { ...list[existing], ...savedItem };
    else list.push(savedItem);

    await writeStore(store);
    return getUser(store, userEmail);
  }

  async function removeFavorite(userEmail, type, id) {
    const store = await readStore();
    const user = getUser(store, userEmail);
    const key = type === 'scholarship' ? 'scholarships' : 'universities';

    user[key] = user[key].filter((entry) => entry.id !== id);
    await writeStore(store);
    return user;
  }

  return {
    getFavorites,
    saveFavorite,
    removeFavorite
  };
}
