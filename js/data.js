// Loads static JSON data files and exposes them as globals via window.appData promise.
// HTML pages are in html/, so paths below resolve relative to each page's URL.
window.appData = Promise.all([
  fetch('../js/data/static/universities.json').then(r => r.json()),
  fetch('../js/data/static/scholarships.json').then(r => r.json()),
  fetch('../js/data/static/exams.json').then(r => r.json())
]).then(([universities, scholarships, examData]) => {
  window.UNIVERSITIES      = universities;
  window.SCHOLARSHIPS      = scholarships;
  window.EXAMS             = examData.exams;
  window.EXAM_ICONS        = examData.icons;
  window.EXAM_DESCRIPTIONS = examData.descriptions;
  window.EXAM_LIST_KEYS    = examData.listKeys;
});
