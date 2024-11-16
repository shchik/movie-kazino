import "./App.css";
import MainPage from "./pages/mainPage/mainPage.jsx";
import SlotPage from "./pages/slotPage/slotPage.jsx";
import InfoPage from "./pages/infoPage/infoPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/hooks.ts";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper.ts";
import { AuthService } from "./services/auth.service.ts";
import { login, logout } from "./store/user/userSlice.ts";
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = React.useState(false);

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
          setIsAuth(true);
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage isAuth={isAuth} />} />
        <Route path="/slotPage" element={<SlotPage />} />
        <Route path="/infoPage" element={<InfoPage />} />
      </Routes>
      <ToastContainer position="bottom-left" autoClose={2000} />
    </div>
  );
}

export default App;
