export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('ns_users') || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('ns_users', JSON.stringify(users));
}

export function findUser(email) {
  return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}
