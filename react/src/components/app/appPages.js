export const pages = [
  { id: 'dashboard', label: 'Хянах самбар', mobile: 'Самбар', icon: 'dashboard' },
  { id: 'universities', label: 'Их Сургуулиуд', mobile: 'Сургууль', icon: 'search' },
  { id: 'scholarships', label: 'Тэтгэлэгүүд', mobile: 'Тэтгэлэг', icon: 'scholar' },
  { id: 'exams', label: 'Шалгалтууд', mobile: 'Шалгалт', icon: 'exam' },
  { id: 'application', label: 'Өргөдөл', mobile: 'Заавар', icon: 'application' },
];

export const pageTitles = {
  dashboard: null,
  universities: ['Их Сургуулийн Хайлт', 'Дэлхий даяар 500 гаруй их сургуулиас хайх'],
  scholarships: ['Тэтгэлэг Хайгч', '200 гаруй тэтгэлгийг нээгээрэй'],
  exams: null,
  application: ['Өргөдлийн Замын Зураглал', 'Их сургуулийн өргөдлийн үйл явцыг амжилттай давахад алхам алхмаар гарын авлага.'],
};

export function isAppPage(pageId) {
  return pages.some((page) => page.id === pageId);
}
