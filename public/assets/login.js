async function doLogin(username, password) {
  const msg = document.getElementById('message');
  try {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ username, password }) });
    if (res.ok) {
      window.location.href = '/';
      return true;
    }
    const json = await res.json().catch(() => null);
    msg.textContent = json?.message || 'Đăng nhập thất bại';
  } catch (err) {
    msg.textContent = 'Lỗi kết nối';
  }
  return false;
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  await doLogin(username, password);
});

// Auto-login when username & password are present in query string
(function autoLoginFromQuery() {
  try {
    const qp = new URLSearchParams(window.location.search);
    const u = qp.get('username');
    const p = qp.get('password');
    if (u && p) {
      document.getElementById('username').value = u;
      document.getElementById('password').value = p;
      // perform login without leaving credentials in history
      history.replaceState({}, '', '/login');
      doLogin(u, p);
    }
  } catch (err) {
    // ignore
  }
})();
