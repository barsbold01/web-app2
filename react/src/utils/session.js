export function getSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('ns_session'));
  } catch {
    return null;
  }
}

export function createSession(user) {
  localStorage.setItem(
    'ns_session',
    JSON.stringify({ email: user.email, name: user.firstname, grade: user.grade }),
  );
}
