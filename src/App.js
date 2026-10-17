import "fastbootstrap/dist/css/fastbootstrap.min.css";
import "./assets/custom.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
	return (
		<WatchlistProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:id" element={<CategoryPage />} />
			</Routes>
		</WatchlistProvider>
	);
}

export default App;
