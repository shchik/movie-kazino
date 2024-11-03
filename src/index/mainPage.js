import "./mainPage.css";
import Header from "./header/header.js";
import Main from "./main/main.js";
import Footer from "./footer/footer.js";
import Login from "./login/login.js";

function MainPage() {
  return (
    <div className="main-page">
      <Header />
      <Main />
      <Footer />
      <Login />
    </div>
  );
}

export default MainPage;
