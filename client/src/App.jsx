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
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "./context.js";

function App() {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = React.useState(false);

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          setIsAuth(true);
          dispatch(login(data));
        } else {
          setIsAuth(false);
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
      <context.Provider value={{ isAuth, setIsAuth }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/slotPage" element={<SlotPage />} />
          <Route path="/infoPage" element={<InfoPage />} />
        </Routes>
      </context.Provider>

      <ToastContainer position="bottom-left" autoClose={2000} />
    </div>
  );
}

export default App;
