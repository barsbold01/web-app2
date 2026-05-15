import { useState } from 'react';
import AuthNavbar from './components/auth/AuthNavbar';
import AuthTabs from './components/auth/AuthTabs';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { findUser, getUsers, saveUsers } from './utils/authStore';
import { createSession } from './utils/session';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function goToDashboard() {
  window.location.href = '/app';
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
    <>
      <AuthNavbar />
      <section className="auth-section">
        <div className="auth-wrapper">
          <div className="auth-card">
            <AuthTabs activeTab={tab} onChange={setTab} />

            {tab === 'login' ? (
              <LoginForm
                form={login}
                errors={loginErrors}
                loading={loading === 'login'}
                onChange={updateLogin}
                onSubmit={handleLogin}
                onSocialLogin={handleSocialLogin}
              />
            ) : (
              <RegisterForm
                form={register}
                error={registerError}
                loading={loading === 'register'}
                onChange={updateRegister}
                onSubmit={handleRegister}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
