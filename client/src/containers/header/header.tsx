import { toast } from "react-toastify";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppDispatch } from "../../store/hooks.js";
import "./header.css";
import kazLogo from "./images/kazino-logo.jpg";
import { logout } from "../../store/user/userSlice.js";
import { context } from "../../context.js";
import React from "react";

type THeader = {
  onLoginClick: () => void;
  isLogin: () => void;
};

const Header: React.FC<THeader> = ({ onLoginClick, isLogin }) => {
  const contextValue = React.useContext(context);

  const isAuth: boolean = useAuth();
  const dispatch = useAppDispatch();

  const logoutHandler = (): void => {
    contextValue.setIsAuth(false);
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
};

export default Header;
