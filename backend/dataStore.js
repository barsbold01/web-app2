import fs from 'node:fs/promises';
import path from 'node:path';
import mongoose from 'mongoose';
import { ExamContent, Scholarship, University } from './models.js';

const DATA_SOURCE = process.env.DATA_SOURCE || 'json';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/havar2026_web';

let mongoConnectionPromise;

export function getStaticDataDir(projectRoot) {
  return path.join(projectRoot, 'js', 'data', 'static');
}

export async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export async function connectMongo() {
  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose.connect(MONGODB_URI);
  }

  return mongoConnectionPromise;
}

export async function closeMongo() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  mongoConnectionPromise = undefined;
}

export async function createDataStore(projectRoot) {
  const staticDataDir = getStaticDataDir(projectRoot);
  const useMongo = DATA_SOURCE === 'mongo';

  if (useMongo) {
    await connectMongo();
  }

  async function getUniversities() {
    if (useMongo) {
      return University.find().lean();
    }

    return readJsonFile(path.join(staticDataDir, 'universities.json'));
  }

  async function searchUniversities(filters = {}) {
    const query = (filters.search || '').trim().toLowerCase();
    const region = filters.region || 'all';
    const program = filters.program || 'all';
    const tuition = filters.tuition || 'all';
    const scholarOnly = filters.scholarOnly === 'true' || filters.scholarOnly === true;
    const sort = filters.sort || 'ranking';

    let universities = await getUniversities();

    if (query) {
      universities = universities.filter((university) => [
        university.id,
        university.logo,
        university.name,
        university.nameEn,
        university.location,
        ...(university.tags || []),
        ...(university.programLabels || [])
      ].some((value) => String(value || '').toLowerCase().includes(query)));
    }

    if (region !== 'all') {
      universities = universities.filter((university) => university.region === region);
    }

    if (program !== 'all') {
      universities = universities.filter((university) => (university.programs || []).includes(program));
    }

    if (tuition !== 'all') {
      universities = universities.filter((university) => university.tuitionCategory === tuition);
    }

    if (scholarOnly) {
      universities = universities.filter((university) => university.hasScholarship);
    }

    return [...universities].sort((a, b) => {
      if (sort === 'tuition-low') return (a.tuitionUSD || 0) - (b.tuitionUSD || 0);
      if (sort === 'tuition-high') return (b.tuitionUSD || 0) - (a.tuitionUSD || 0);
      if (sort === 'name') return String(a.name || '').localeCompare(String(b.name || ''));
      return (a.rank || 9999) - (b.rank || 9999);
    });
  }

  async function getUniversityById(id) {
    const universities = await getUniversities();
    return universities.find((university) => university.id === id);
  }

  async function getScholarships() {
    if (useMongo) {
      return Scholarship.find().lean();
    }

    return readJsonFile(path.join(staticDataDir, 'scholarships.json'));
  }

  async function searchScholarships(filters = {}) {
    const query = (filters.search || '').trim().toLowerCase();
    const region = filters.region || 'all';
    const funding = filters.funding || filters.activeTab || 'all';

    let scholarships = await getScholarships();

    if (funding !== 'all') {
      scholarships = scholarships.filter((scholarship) => scholarship.funding === funding);
    }

    if (region !== 'all') {
      scholarships = scholarships.filter((scholarship) => scholarship.country === region);
    }

    if (query) {
      scholarships = scholarships.filter((scholarship) => [
        scholarship.name,
        scholarship.provider,
        scholarship.country,
        scholarship.level,
        scholarship.description,
        ...(scholarship.tags || [])
      ].some((value) => String(value || '').toLowerCase().includes(query)));
    }

    return scholarships;
  }

  async function getScholarshipById(id) {
    const scholarships = await getScholarships();
    return scholarships.find((scholarship) => scholarship.id === id);
  }

  async function getExamContent() {
    if (useMongo) {
      const content = await ExamContent.findOne({ key: 'default' }).lean();
      return content?.data || { exams: {}, icons: {}, descriptions: {}, listKeys: [] };
    }

    return readJsonFile(path.join(staticDataDir, 'exams.json'));
  }

  async function getExamByKey(key) {
    const examContent = await getExamContent();
    const exam = examContent.exams?.[key];

    if (!exam) return undefined;

    return {
      key,
      icon: examContent.icons?.[key],
      description: examContent.descriptions?.[key],
      ...exam
    };
  }

  return {
    source: DATA_SOURCE,
    getUniversities,
    searchUniversities,
    getUniversityById,
    getScholarships,
    searchScholarships,
    getScholarshipById,
    getExamContent,
    getExamByKey
  };
}
