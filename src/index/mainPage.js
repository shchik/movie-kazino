import "./mainPage.css";
import React from "react";
import Header from "./header/header.js";
import Main from "./main/main.js";
import Footer from "./footer/footer.js";
import Login from "./login/login.js";

function MainPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoginVisible, setIsLoginVisible] = React.useState(false);
  const handleLoginToggle = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsLogin(true);
  };
  const handleIsLogin = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsLogin(false);
  };

  return (
    <div className="main-page">
      <Header onLoginClick={handleLoginToggle} isLogin={handleIsLogin} />
      <Main />
      <Footer />
      {isLoginVisible && (
        <Login onLoginClick={handleLoginToggle} isLoginned={isLogin} />
      )}
      {isLoginVisible && <div className="overlay"></div>}
    </div>
  );
}

export default MainPage;
