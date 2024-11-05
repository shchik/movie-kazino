import "./mainPage.css";
import React from "react";
import Header from "./header/header.js";
import Main from "./main/main.js";
import Footer from "./footer/footer.js";
import Login from "./login/login.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer position="bottom-left" autoClose={2000} />
    </div>
  );
}

export default MainPage;
