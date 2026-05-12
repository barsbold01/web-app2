// Loads backend API data and exposes it as globals via window.appData promise.
// When the app is opened without the backend, it falls back to the old static JSON files.
const API_BASE_URL = window.API_BASE_URL || (window.location.port === '3000' ? '' : 'http://localhost:3000');

async function loadJson(apiPath, fallbackPath) {
  try {
    const response = await fetch(`${API_BASE_URL}${apiPath}`);
    if (!response.ok) throw new Error(`API error ${response.status}`);
    return response.json();
  } catch (error) {
    console.warn(`API unavailable for ${apiPath}; loading static JSON instead.`, error);
    const fallbackResponse = await fetch(fallbackPath);
    return fallbackResponse.json();
  }
}

window.appData = Promise.all([
  loadJson('/api/universities', '../js/data/static/universities.json'),
  loadJson('/api/scholarships', '../js/data/static/scholarships.json'),
  loadJson('/api/exams', '../js/data/static/exams.json')
]).then(([universities, scholarships, examData]) => {
  window.UNIVERSITIES      = universities;
  window.SCHOLARSHIPS      = scholarships;
  window.EXAMS             = examData.exams;
  window.EXAM_ICONS        = examData.icons;
  window.EXAM_DESCRIPTIONS = examData.descriptions;
  window.EXAM_LIST_KEYS    = examData.listKeys;
});
