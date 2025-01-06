import "./App.css";
import MainPage from "./pages/mainPage/mainPage.js";
import SlotPage from "./pages/slotPage/slotPage.js";
import InfoPage from "./pages/infoPage/infoPage.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "./context";
import { IUser } from "./types/types";

function App() {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = React.useState(false);

  const checkAuth = async () => {
    const token: string = getTokenFromLocalStorage();
    try {
      if (token) {
        const data: IUser | undefined = await AuthService.getProfile();
        if (data) {
          setIsAuth(true);
          dispatch(login(data));
        } else {
          setIsAuth(false);
          dispatch(logout());
        }
      }
    } catch (error: unknown) {
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
