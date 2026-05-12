import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectMongo, closeMongo, getStaticDataDir, readJsonFile } from './dataStore.js';
import { ExamContent, Scholarship, University } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const staticDataDir = getStaticDataDir(projectRoot);

async function seed() {
  await connectMongo();

  const [universities, scholarships, exams] = await Promise.all([
    readJsonFile(path.join(staticDataDir, 'universities.json')),
    readJsonFile(path.join(staticDataDir, 'scholarships.json')),
    readJsonFile(path.join(staticDataDir, 'exams.json'))
  ]);

  await Promise.all([
    University.deleteMany({}),
    Scholarship.deleteMany({}),
    ExamContent.deleteMany({ key: 'default' })
  ]);

  await Promise.all([
    University.insertMany(universities),
    Scholarship.insertMany(scholarships),
    ExamContent.create({ key: 'default', data: exams })
  ]);

  console.log(`Seeded ${universities.length} universities`);
  console.log(`Seeded ${scholarships.length} scholarships`);
  console.log('Seeded exam content');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeMongo();
  });
