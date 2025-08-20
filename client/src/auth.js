export function saveAuth({ access, refresh }) {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
}
export function getToken() {
  return localStorage.getItem('access');
}
export function clearAuth() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}
