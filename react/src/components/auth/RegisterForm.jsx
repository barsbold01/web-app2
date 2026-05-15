import PasswordInput from './PasswordInput';

export default function RegisterForm({
  form,
  error,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <div className="auth-panel active" role="tabpanel">
      <h1 className="auth-heading">Бүртгэл үүсгэх</h1>
      <p className="auth-subheading">Мөрөөдлийн их сургуулиа олоход туслах дансаа нээгээрэй.</p>

      <form onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-firstname">Нэр</label>
            <input className="form-input" id="reg-firstname" type="text" placeholder="Болд" autoComplete="given-name" value={form.firstname} onChange={onChange('firstname')} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-lastname">Овог</label>
            <input className="form-input" id="reg-lastname" type="text" placeholder="Баяр" autoComplete="family-name" value={form.lastname} onChange={onChange('lastname')} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">И-мэйл хаяг</label>
          <input className="form-input" id="reg-email" type="email" placeholder="ta@example.com" autoComplete="email" value={form.email} onChange={onChange('email')} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-password">Нууц үг</label>
          <PasswordInput
            id="reg-password"
            value={form.password}
            onChange={onChange('password')}
            placeholder="8+ тэмдэгт"
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-grade">Анги</label>
          <select className="form-input" id="reg-grade" value={form.grade} onChange={onChange('grade')}>
            <option value="" disabled>Ангиа сонгоно уу</option>
            <option>10-р анги</option>
            <option>11-р анги</option>
            <option>12-р анги</option>
            <option>Төгссөн</option>
          </select>
        </div>

        <span className="form-error">{error}</span>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'УНШИЖ БАЙНА...' : 'БҮРТГЭЛ ҮҮСГЭХ'}
        </button>
      </form>

      <p className="terms-note">
        Бүртгүүлснээр та манай <button type="button">Үйлчилгээний нөхцөл</button> болон <button type="button">Нууцлалын бодлого</button>-г зөвшөөрч байна.
      </p>
    </div>
  );
}
