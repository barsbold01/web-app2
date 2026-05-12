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
    getUniversityById,
    getScholarships,
    getScholarshipById,
    getExamContent,
    getExamByKey
  };
}
