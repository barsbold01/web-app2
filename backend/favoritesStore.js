import fs from 'node:fs/promises';
import path from 'node:path';
import { Favorite } from './models.js';

const DEFAULT_USER = 'guest';
const DATA_SOURCE = process.env.DATA_SOURCE || 'json';

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
  const useMongo = DATA_SOURCE === 'mongo';

  function formatMongoFavorites(rows) {
    return {
      universities: rows
        .filter((row) => row.type === 'university')
        .map((row) => ({ ...row.item, savedAt: row.savedAt })),
      scholarships: rows
        .filter((row) => row.type === 'scholarship')
        .map((row) => ({ ...row.item, savedAt: row.savedAt }))
    };
  }

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
    if (useMongo) {
      const rows = await Favorite.find({ userEmail: getUserKey(userEmail) }).sort({ savedAt: -1 }).lean();
      return formatMongoFavorites(rows);
    }

    const store = await readStore();
    return getUser(store, userEmail);
  }

  async function saveFavorite(userEmail, type, item) {
    if (useMongo) {
      const savedAt = item.savedAt ? new Date(item.savedAt) : new Date();
      await Favorite.findOneAndUpdate(
        { userEmail: getUserKey(userEmail), type, itemId: item.id },
        { userEmail: getUserKey(userEmail), type, itemId: item.id, item, savedAt },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return getFavorites(userEmail);
    }

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
    if (useMongo) {
      await Favorite.deleteOne({ userEmail: getUserKey(userEmail), type, itemId: id });
      return getFavorites(userEmail);
    }

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
