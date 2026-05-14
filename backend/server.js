import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDataStore } from './dataStore.js';
import { createFavoritesStore } from './favoritesStore.js';
import { createApplicationsStore } from './applicationsStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const app = express();
const port = Number(process.env.PORT || 3000);
const dataStore = await createDataStore(projectRoot);
const favoritesStore = createFavoritesStore(projectRoot);
const applicationsStore = createApplicationsStore(projectRoot);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    source: dataStore.source,
    app: 'havar2026-web-backend'
  });
});

app.get('/api/universities', async (req, res, next) => {
  try {
    res.json(await dataStore.searchUniversities(req.query));
  } catch (error) {
    next(error);
  }
});

app.get('/api/universities/:id', async (req, res, next) => {
  try {
    const university = await dataStore.getUniversityById(req.params.id);
    if (!university) return res.status(404).json({ message: 'University not found' });
    return res.json(university);
  } catch (error) {
    return next(error);
  }
});

app.post('/api/universities', async (req, res, next) => {
  try {
    if (!req.body?.id || !req.body?.name) {
      return res.status(400).json({ message: 'University id and name are required' });
    }

    const university = await dataStore.createUniversity(req.body);
    return res.status(201).json(university);
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/universities/:id', async (req, res, next) => {
  try {
    const university = await dataStore.updateUniversity(req.params.id, req.body);
    if (!university) return res.status(404).json({ message: 'University not found' });
    return res.json(university);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/universities/:id', async (req, res, next) => {
  try {
    const university = await dataStore.deleteUniversity(req.params.id);
    if (!university) return res.status(404).json({ message: 'University not found' });
    return res.json({ deleted: true, id: req.params.id });
  } catch (error) {
    return next(error);
  }
});

app.get('/api/scholarships', async (req, res, next) => {
  try {
    res.json(await dataStore.searchScholarships(req.query));
  } catch (error) {
    next(error);
  }
});

app.get('/api/favorites', async (req, res, next) => {
  try {
    res.json(await favoritesStore.getFavorites(req.query.userEmail));
  } catch (error) {
    next(error);
  }
});

app.get('/api/applications', async (req, res, next) => {
  try {
    res.json(await applicationsStore.getApplications(req.query.userEmail));
  } catch (error) {
    next(error);
  }
});

app.post('/api/applications', async (req, res, next) => {
  try {
    const application = await applicationsStore.createApplication(req.body);
    return res.status(201).json(application);
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/applications/:id', async (req, res, next) => {
  try {
    const application = await applicationsStore.updateApplication(req.params.id, req.body);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    return res.json(application);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/applications/:id', async (req, res, next) => {
  try {
    const application = await applicationsStore.deleteApplication(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    return res.json({ deleted: true, id: req.params.id });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/favorites', async (req, res, next) => {
  try {
    const { userEmail, type, item } = req.body;

    if (!['university', 'scholarship'].includes(type)) {
      return res.status(400).json({ message: 'Favorite type must be university or scholarship' });
    }

    if (!item?.id) {
      return res.status(400).json({ message: 'Favorite item id is required' });
    }

    const favorites = await favoritesStore.saveFavorite(userEmail, type, item);
    return res.status(201).json(favorites);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/favorites/:type/:id', async (req, res, next) => {
  try {
    const { type, id } = req.params;

    if (!['university', 'scholarship'].includes(type)) {
      return res.status(400).json({ message: 'Favorite type must be university or scholarship' });
    }

    const favorites = await favoritesStore.removeFavorite(req.query.userEmail, type, id);
    return res.json(favorites);
  } catch (error) {
    return next(error);
  }
});

app.get('/api/scholarships/:id', async (req, res, next) => {
  try {
    const scholarship = await dataStore.getScholarshipById(req.params.id);
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
    return res.json(scholarship);
  } catch (error) {
    return next(error);
  }
});

app.post('/api/scholarships', async (req, res, next) => {
  try {
    if (!req.body?.id || !req.body?.name) {
      return res.status(400).json({ message: 'Scholarship id and name are required' });
    }

    const scholarship = await dataStore.createScholarship(req.body);
    return res.status(201).json(scholarship);
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/scholarships/:id', async (req, res, next) => {
  try {
    const scholarship = await dataStore.updateScholarship(req.params.id, req.body);
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
    return res.json(scholarship);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/scholarships/:id', async (req, res, next) => {
  try {
    const scholarship = await dataStore.deleteScholarship(req.params.id);
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
    return res.json({ deleted: true, id: req.params.id });
  } catch (error) {
    return next(error);
  }
});

app.get('/api/exams', async (req, res, next) => {
  try {
    res.json(await dataStore.getExamContent());
  } catch (error) {
    next(error);
  }
});

app.get('/api/exams/:key', async (req, res, next) => {
  try {
    const exam = await dataStore.getExamByKey(req.params.key);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    return res.json(exam);
  } catch (error) {
    return next(error);
  }
});

app.use(express.static(projectRoot));

app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.status ? error.message : 'Server error' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  console.log(`API data source: ${dataStore.source}`);
});
