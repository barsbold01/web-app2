import PasswordInput from './PasswordInput';
import SocialButtons from './SocialButtons';

export default function LoginForm({
  form,
  errors,
  loading,
  onChange,
  onSubmit,
  onSocialLogin,
}) {
  return (
    <div className="auth-panel active" role="tabpanel">
      <h1 className="auth-heading">Тавтай морил!</h1>
      <p className="auth-subheading">Үргэлжлүүлэхийн тулд бүртгэлдээ нэвтэрнэ үү.</p>

      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">И-мэйл хаяг</label>
          <input
            className={`form-input${errors.email ? ' invalid' : ''}`}
            id="login-email"
            type="email"
            placeholder="ta@example.com"
            autoComplete="email"
            value={form.email}
            onChange={onChange('email')}
          />
          <span className="form-error">{errors.email || ''}</span>
        </div>

        <div className="form-group">
          <div className="form-meta">
            <button className="forgot-link" type="button">Нууц үгээ мартсан уу?</button>
          </div>
          <label className="form-label" htmlFor="login-password">Нууц үг</label>
          <PasswordInput
            id="login-password"
            value={form.password}
            onChange={onChange('password')}
            placeholder="••••••••"
            autoComplete="current-password"
            invalid={Boolean(errors.password)}
          />
          <span className="form-error">{errors.password || ''}</span>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'УНШИЖ БАЙНА...' : 'НЭВТРЭХ'}
        </button>
      </form>

      <SocialButtons onLogin={onSocialLogin} />
    </div>
  );
}
