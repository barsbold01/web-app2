import { useState } from 'react';
import { EyeIcon } from './AuthIcons';

export default function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  invalid = false,
}) {
  const [shown, setShown] = useState(false);

  return (
    <div className="input-wrap">
      <input
        className={`form-input${invalid ? ' invalid' : ''}`}
        id={id}
        type={shown ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="pwd-toggle"
        aria-label="Нууц үг харуулах"
        onClick={() => setShown((current) => !current)}
      >
        <EyeIcon hidden={!shown} />
      </button>
    </div>
  );
}
