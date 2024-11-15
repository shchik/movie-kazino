import { toast } from "react-toastify";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import "./header.css";
import kazLogo from "./images/kazino-logo.jpg";
import { logout } from "../../store/user/userSlice.ts";

function Header({ onLoginClick, isLogin }) {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("You logged out!");
  };

  return (
    <header>
      <div className="header-class">
        <div className="header-left-section">
          <img className="kazino-logo" src={kazLogo} alt="hello"></img>
          <span className="kazino-name">Kin-Kaz</span>
        </div>
        <div className="header-right-section">
          {isAuth ? (
            <button className="logout-button" onClick={logoutHandler}>
              logout
            </button>
          ) : (
            <div>
              <button className="enter-button" onClick={onLoginClick}>
                Войти
              </button>
              <button className="enter-button" onClick={isLogin}>
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
