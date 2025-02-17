import React from "react";
import { toast } from "react-toastify";
import { context } from "../../context.js";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppDispatch } from "../../store/hooks.js";
import { logout } from "../../store/user/userSlice.js";
import Button from "../../UI/Button.js";
import s from "./header.module.scss";
import kazLogo from "./images/kazino-logo.jpg";

type HeaderProps = {
	onLoginClick: () => void;
	isLogin: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginClick, isLogin }) => {
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
		<header className={s.header}>
			<div className={s["header__left-section"]}>
				<img className={s.header__logo} src={kazLogo} alt="hello"></img>
				<span className={s.header__name}>Kin-Kaz</span>
			</div>
			<div className={s["header__right-section"]}>
				{isAuth ? (
					<button
						className={s["header__logout-button"]}
						onClick={logoutHandler}
					>
						logout
					</button>
				) : (
					<div>
						<Button
							className={s["header__login-button"]}
							onClick={onLoginClick}
						>
							Войти
						</Button>
						<Button
							className={s["header__login-button"]}
							onClick={isLogin}
						>
							Регистрация
						</Button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
