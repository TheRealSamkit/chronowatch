import "fastbootstrap/dist/css/fastbootstrap.min.css";
import "./assets/custom.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Watchlist" element={<Watchlist />} />
			</Routes>
		</>
	);
}

export default App;
