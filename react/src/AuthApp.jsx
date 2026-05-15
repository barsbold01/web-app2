import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('ns_users') || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('ns_users', JSON.stringify(users));
}

function findUser(email) {
  return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function createSession(user) {
  localStorage.setItem(
    'ns_session',
    JSON.stringify({ email: user.email, name: user.firstname, grade: user.grade }),
  );
}

function goToDashboard() {
  window.location.href = 'dashboard.html';
}

function EyeIcon({ hidden }) {
  if (hidden) {
    return (
      <svg className="eye-icon" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg className="eye-off-icon" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <path strokeLinecap="square" strokeLinejoin="miter" d="M2 7l10 7 10-7" />
    </svg>
  );
}

export default function AuthApp() {
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [register, setRegister] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    grade: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(null);

  const updateLogin = (field) => (event) => {
    setLogin((current) => ({ ...current, [field]: event.target.value }));
  };

  const updateRegister = (field) => (event) => {
    setRegister((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const errors = {};
    const email = login.email.trim();

    if (!email) errors.email = 'И-мэйл хаягаа оруулна уу.';
    else if (!emailPattern.test(email)) errors.email = 'Зөв и-мэйл хаяг оруулна уу.';

    if (!login.password) errors.password = 'Нууц үгээ оруулна уу.';
    else if (login.password.length < 6) errors.password = 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.';

    const user = email ? findUser(email) : null;
    if (!errors.password && user && user.password !== login.password) {
      errors.password = 'Нууц үг буруу байна.';
    }

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading('login');
    const sessionUser = user || { email, firstname: email.split('@')[0], grade: '' };
    setTimeout(() => {
      createSession(sessionUser);
      goToDashboard();
    }, 700);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setRegisterError('');

    const next = {
      ...register,
      firstname: register.firstname.trim(),
      lastname: register.lastname.trim(),
      email: register.email.trim(),
    };

    if (!next.firstname || !next.lastname || !next.email || !next.password || !next.grade) {
      setRegisterError('Бүх талбарыг бөглөнө үү.');
      return;
    }
    if (!emailPattern.test(next.email)) {
      setRegisterError('Зөв и-мэйл хаяг оруулна уу.');
      return;
    }
    if (next.password.length < 8) {
      setRegisterError('Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.');
      return;
    }
    if (findUser(next.email)) {
      setRegisterError('Энэ и-мэйл хаягаар бүртгэл аль хэдийн байна.');
      return;
    }

    saveUsers([...getUsers(), next]);
    setLoading('register');
    setTimeout(() => {
      createSession(next);
      goToDashboard();
    }, 700);
  };

  const handleSocialLogin = () => {
    createSession({ email: 'social@nextsteps.mn', firstname: 'Хэрэглэгч', grade: '' });
    goToDashboard();
  };

  return (
    <section className="auth-section">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-tabs" role="tablist">
            <button
              className={`tab-btn${tab === 'login' ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === 'login'}
              onClick={() => setTab('login')}
              type="button"
            >
              Нэвтрэх
            </button>
            <button
              className={`tab-btn${tab === 'register' ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === 'register'}
              onClick={() => setTab('register')}
              type="button"
            >
              Бүртгүүлэх
            </button>
          </div>

          <div className={`auth-panel${tab === 'login' ? ' active' : ''}`} role="tabpanel">
            <h1 className="auth-heading">Тавтай морил!</h1>
            <p className="auth-subheading">Үргэлжлүүлэхийн тулд бүртгэлдээ нэвтэрнэ үү.</p>

            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">И-мэйл хаяг</label>
                <input
                  className={`form-input${loginErrors.email ? ' invalid' : ''}`}
                  id="login-email"
                  type="email"
                  placeholder="ta@example.com"
                  autoComplete="email"
                  value={login.email}
                  onChange={updateLogin('email')}
                />
                <span className="form-error">{loginErrors.email || ''}</span>
              </div>

              <div className="form-group">
                <div className="form-meta">
                  <button className="forgot-link" type="button">Нууц үгээ мартсан уу?</button>
                </div>
                <label className="form-label" htmlFor="login-password">Нууц үг</label>
                <div className="input-wrap">
                  <input
                    className={`form-input${loginErrors.password ? ' invalid' : ''}`}
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={login.password}
                    onChange={updateLogin('password')}
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    aria-label="Нууц үг харуулах"
                    onClick={() => setShowLoginPassword((current) => !current)}
                  >
                    <EyeIcon hidden={!showLoginPassword} />
                  </button>
                </div>
                <span className="form-error">{loginErrors.password || ''}</span>
              </div>

              <button type="submit" className="btn-submit" disabled={loading === 'login'}>
                {loading === 'login' ? 'УНШИЖ БАЙНА...' : 'НЭВТРЭХ'}
              </button>
            </form>

            <div className="divider">эсвэл</div>

            <div className="social-btns">
              <button className="btn-social" type="button" onClick={handleSocialLogin}>
                <GoogleIcon />
                Google
              </button>
              <button className="btn-social" type="button" onClick={handleSocialLogin}>
                <MailIcon />
                И-мэйл SSO
              </button>
            </div>
          </div>

          <div className={`auth-panel${tab === 'register' ? ' active' : ''}`} role="tabpanel">
            <h1 className="auth-heading">Бүртгэл үүсгэх</h1>
            <p className="auth-subheading">Мөрөөдлийн их сургуулиа олоход туслах дансаа нээгээрэй.</p>

            <form onSubmit={handleRegister} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-firstname">Нэр</label>
                  <input className="form-input" id="reg-firstname" type="text" placeholder="Болд" autoComplete="given-name" value={register.firstname} onChange={updateRegister('firstname')} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-lastname">Овог</label>
                  <input className="form-input" id="reg-lastname" type="text" placeholder="Баяр" autoComplete="family-name" value={register.lastname} onChange={updateRegister('lastname')} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">И-мэйл хаяг</label>
                <input className="form-input" id="reg-email" type="email" placeholder="ta@example.com" autoComplete="email" value={register.email} onChange={updateRegister('email')} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Нууц үг</label>
                <div className="input-wrap">
                  <input
                    className="form-input"
                    id="reg-password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="8+ тэмдэгт"
                    autoComplete="new-password"
                    value={register.password}
                    onChange={updateRegister('password')}
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    aria-label="Нууц үг харуулах"
                    onClick={() => setShowRegisterPassword((current) => !current)}
                  >
                    <EyeIcon hidden={!showRegisterPassword} />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-grade">Анги</label>
                <select className="form-input" id="reg-grade" value={register.grade} onChange={updateRegister('grade')}>
                  <option value="" disabled>Ангиа сонгоно уу</option>
                  <option>10-р анги</option>
                  <option>11-р анги</option>
                  <option>12-р анги</option>
                  <option>Төгссөн</option>
                </select>
              </div>

              <span className="form-error">{registerError}</span>

              <button type="submit" className="btn-submit" disabled={loading === 'register'}>
                {loading === 'register' ? 'УНШИЖ БАЙНА...' : 'БҮРТГЭЛ ҮҮСГЭХ'}
              </button>
            </form>

            <p className="terms-note">
              Бүртгүүлснээр та манай <button type="button">Үйлчилгээний нөхцөл</button> болон <button type="button">Нууцлалын бодлого</button>-г зөвшөөрч байна.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
