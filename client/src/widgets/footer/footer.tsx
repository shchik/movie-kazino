import { Link } from "react-router-dom";
import s from "./footer.module.scss";
import instagramImage from "./images/icons/instagram-icon.png";
import telegramImage from "./images/icons/telegram-icon.png";
import youtubeImage from "./images/icons/youtube-icon.png";

const Footer: React.FC = () => {
	return (
		<footer className={s.footer}>
			<div className={s.footer__container}>
				<div className={s.footer__about}>
					<h1>Подробнее о нас</h1>
					<Link to="/infoPage">О компании</Link>
					<Link to="/infoPage">Реквизиты</Link>
					<Link to="/infoPage">Сотрудничества</Link>
					<Link to="/infoPage">Партнёрская программа</Link>
					<Link to="/infoPage">Лицензии</Link>
					<Link to="/infoPage">Спонсорство</Link>
				</div>
				<div className={s.footer__support}>
					<h1>Помощь</h1>
					<a>Пополнить счёт</a>
					<a>Вывод средств</a>
					<a>Защита аккаунта</a>
					<a>FAQ</a>
				</div>
				<div className={s["footer__social-media"]}>
					<button className="telegram-button">
						<img src={telegramImage}></img>
					</button>
					<button className="instagram-button">
						<img src={instagramImage}></img>
					</button>
					<button className="youtube-button">
						<img src={youtubeImage}></img>
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
