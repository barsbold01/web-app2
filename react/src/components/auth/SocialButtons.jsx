import { GoogleIcon, MailIcon } from './AuthIcons';

export default function SocialButtons({ onLogin }) {
  return (
    <>
      <div className="divider">эсвэл</div>
      <div className="social-btns">
        <button className="btn-social" type="button" onClick={onLogin}>
          <GoogleIcon />
          Google
        </button>
        <button className="btn-social" type="button" onClick={onLogin}>
          <MailIcon />
          И-мэйл SSO
        </button>
      </div>
    </>
  );
}
