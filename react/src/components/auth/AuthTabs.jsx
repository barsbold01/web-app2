export default function AuthTabs({ activeTab, onChange }) {
  return (
    <div className="auth-tabs" role="tablist">
      <button
        className={`tab-btn${activeTab === 'login' ? ' active' : ''}`}
        role="tab"
        aria-selected={activeTab === 'login'}
        onClick={() => onChange('login')}
        type="button"
      >
        Нэвтрэх
      </button>
      <button
        className={`tab-btn${activeTab === 'register' ? ' active' : ''}`}
        role="tab"
        aria-selected={activeTab === 'register'}
        onClick={() => onChange('register')}
        type="button"
      >
        Бүртгүүлэх
      </button>
    </div>
  );
}
