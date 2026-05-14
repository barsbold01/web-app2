import fs from 'node:fs/promises';
import path from 'node:path';
import { Application } from './models.js';

const DEFAULT_USER = 'guest';
const VALID_STATUSES = ['planning', 'preparing', 'submitted', 'accepted', 'rejected'];
const DATA_SOURCE = process.env.DATA_SOURCE || 'json';

function getUserKey(userEmail) {
  return (userEmail || DEFAULT_USER).trim().toLowerCase();
}

function normalizeApplication(payload) {
  return {
    userEmail: getUserKey(payload.userEmail),
    targetType: payload.targetType,
    targetId: payload.targetId,
    title: payload.title,
    deadline: payload.deadline || '',
    status: payload.status || 'planning',
    notes: payload.notes || '',
    updatedAt: new Date()
  };
}

export function createApplicationsStore(projectRoot) {
  const useMongo = DATA_SOURCE === 'mongo';
  const filePath = path.join(projectRoot, 'js', 'data', 'dynamic', 'applications.json');

  async function readFileStore() {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw || '{ "users": {} }');
    } catch {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      const initial = { users: {} };
      await fs.writeFile(filePath, JSON.stringify(initial, null, 2));
      return initial;
    }
  }

  async function writeFileStore(store) {
    await fs.writeFile(filePath, JSON.stringify(store, null, 2));
  }

  async function getApplications(userEmail) {
    if (!useMongo) {
      const store = await readFileStore();
      return store.users[getUserKey(userEmail)] || [];
    }

    return Application.find({ userEmail: getUserKey(userEmail) }).sort({ updatedAt: -1 }).lean();
  }

  async function createApplication(payload) {
    const app = normalizeApplication(payload);

    if (!['university', 'scholarship'].includes(app.targetType)) {
      const error = new Error('targetType must be university or scholarship');
      error.status = 400;
      throw error;
    }

    if (!app.targetId || !app.title) {
      const error = new Error('targetId and title are required');
      error.status = 400;
      throw error;
    }

    if (!VALID_STATUSES.includes(app.status)) {
      const error = new Error('Invalid application status');
      error.status = 400;
      throw error;
    }

    if (!useMongo) {
      const store = await readFileStore();
      store.users[app.userEmail] ||= [];
      const saved = { ...app, _id: `${Date.now()}`, createdAt: new Date(), updatedAt: new Date() };
      store.users[app.userEmail].unshift(saved);
      await writeFileStore(store);
      return saved;
    }

    return Application.create(app);
  }

  async function updateApplication(id, payload) {
    const update = { ...payload, updatedAt: new Date() };
    delete update._id;
    delete update.userEmail;

    if (update.status && !VALID_STATUSES.includes(update.status)) {
      const error = new Error('Invalid application status');
      error.status = 400;
      throw error;
    }

    if (!useMongo) {
      const store = await readFileStore();
      for (const apps of Object.values(store.users)) {
        const index = apps.findIndex((item) => item._id === id);
        if (index >= 0) {
          apps[index] = { ...apps[index], ...update };
          await writeFileStore(store);
          return apps[index];
        }
      }
      return null;
    }

    return Application.findByIdAndUpdate(id, update, { new: true, lean: true });
  }

  async function deleteApplication(id) {
    if (!useMongo) {
      const store = await readFileStore();
      for (const apps of Object.values(store.users)) {
        const index = apps.findIndex((item) => item._id === id);
        if (index >= 0) {
          const [deleted] = apps.splice(index, 1);
          await writeFileStore(store);
          return deleted;
        }
      }
      return null;
    }

    return Application.findByIdAndDelete(id).lean();
  }

  return {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication
  };
}
