import React, { SetStateAction } from "react";
import { useLogout } from "../../hooks/auth/useLogout.js";
import Button from "../../UI/Button.js";
import s from "./header.module.scss";
import kazLogo from "./images/kazino-logo.jpg";

type HeaderProps = {
	setIsAuthFormVisible: React.Dispatch<SetStateAction<boolean>>;
	setIsAuth: React.Dispatch<SetStateAction<boolean>>;
	isAuth: boolean;
};

const Header: React.FC<HeaderProps> = ({
	setIsAuthFormVisible,
	isAuth,
	setIsAuth,
}) => {
	const logout = useLogout();

	const handleLogoutToggle = () => {
		logout();
		setIsAuth(false);
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
						onClick={handleLogoutToggle}
					>
						logout
					</button>
				) : (
					<div>
						<Button
							className={s["header__login-button"]}
							onClick={() =>
								setIsAuthFormVisible(prev => (prev = true))
							}
						>
							Войти
						</Button>
						<Button
							className={s["header__login-button"]}
							onClick={() =>
								setIsAuthFormVisible(prev => (prev = true))
							}
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
