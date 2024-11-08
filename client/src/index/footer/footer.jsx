import "./footer.css";
import telegramImage from "./images/icons/telegram-icon.png";
import instagramImage from "./images/icons/instagram-icon.png";
import youtubeImage from "./images/icons/youtube-icon.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="about-us">
          <h1>Подробнее о нас</h1>
          <a>О компании</a>
          <a>Реквизиты</a>
          <a>Сотрудничества</a>
          <a>Партнёрская программа</a>
          <a>Лицензии</a>
          <a>Спонсорство</a>
        </div>
        <div className="help">
          <h1>Помощь</h1>
          <a>Пополнить счёт</a>
          <a>Вывод средств</a>
          <a>Защита аккаунта</a>
          <a>FAQ</a>
        </div>
        <div className="social-media">
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
}

export default Footer;
