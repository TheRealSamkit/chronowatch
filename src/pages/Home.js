import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import AddCategoryModal from "../components/AddCategoryModal";
import { useWatchlistContext } from "../context/WatchlistContext";

export default function Home() {
	const { addCategory } = useWatchlistContext();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Navbar />
			<div className="px-3 py-3" style={{ paddingBottom: "100px" }}>
				<CategoryList />
			</div>

			{/* Floating add button */}
			<div
				className="position-fixed start-50 translate-middle-x"
				style={{ bottom: "28px", zIndex: 1050 }}
			>
				<button
					id="add-category-btn"
					className="btn btn-primary rounded-circle btn-lg p-0 d-flex align-items-center justify-content-center shadow-lg"
					style={{ width: "60px", height: "60px" }}
					onClick={() => setShowModal(true)}
					title="Add Category"
				>
					<i className="fa-solid fa-plus fs-4"></i>
				</button>
			</div>

			{showModal && (
				<AddCategoryModal
					onAdd={addCategory}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
}
