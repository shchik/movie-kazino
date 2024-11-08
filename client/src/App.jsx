import "./App.css";
import MainPage from "./index/mainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/hooks.ts";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper.ts";
import { AuthService } from "./services/auth.service.ts";
import { login, logout } from "./store/user/userSlice.ts";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
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
      <MainPage />
      <ToastContainer position="bottom-left" autoClose={2000} />
    </div>
  );
}

export default App;
