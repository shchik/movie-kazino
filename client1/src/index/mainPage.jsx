import "./mainPage.css";
import React from "react";
import Header from "./header/header.jsx";
import Main from "./main/main.jsx";
import Footer from "./footer/footer.jsx";
import Login from "./login/login.jsx";

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
