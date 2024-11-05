import "./header.css";
import kazLogo from "./images/kazino-logo.jpg";

function Header({ onLoginClick, isLogin }) {
  return (
    <header>
      <div className="header-class">
        <div className="header-left-section">
          <img className="kazino-logo" src={kazLogo} alt="hello"></img>
          <span className="kazino-name">Kin-Kaz</span>
        </div>
        <div className="header-right-section">
          <button onClick={onLoginClick}>Войти</button>
          <button onClick={isLogin}>Регистрация</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
