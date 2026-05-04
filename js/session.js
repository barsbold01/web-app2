// session.js – shared session utilities used by every protected page.
// Loaded at the bottom of <body> so the DOM is ready when it runs.

function session_getUser() {
  try { return JSON.parse(localStorage.getItem('ns_session')); }
  catch { return null; }
}

function session_updateSidebar() {
  const u       = session_getUser();
  const name    = u?.name  || 'Хэрэглэгч';
  const grade   = u?.grade || '';
  const initial = name.charAt(0).toUpperCase();

  const avatarEl = document.querySelector('.user-avatar');
  const nameEl   = document.querySelector('.user-name');
  const roleEl   = document.querySelector('.user-role');

  if (avatarEl) avatarEl.textContent = initial;
  if (nameEl)   nameEl.textContent   = name;
  if (roleEl)   roleEl.textContent   = grade;

  const titleEl = document.querySelector('.page-title');
  if (titleEl)  titleEl.textContent  = `Тавтай морил, ${name}! 👋`;
}

// Run immediately — script is placed at the bottom of <body>.
session_updateSidebar();
