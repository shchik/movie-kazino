import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainPage from "./pages/home/home.js";
import InfoPage from "./pages/info/info.js";
import SlotPage from "./pages/slot/slot.js";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/slotPage" element={<SlotPage />} />
				<Route path="/infoPage" element={<InfoPage />} />
			</Routes>

			<ToastContainer position="bottom-left" autoClose={2000} />
		</div>
	);
}

export default App;
