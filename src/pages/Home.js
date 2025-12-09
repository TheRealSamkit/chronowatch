import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
function Home() {
	return (
		<>
			<Navbar></Navbar>
			<div className="h-50 px-4 py-2">
				<CategoryList></CategoryList>
				<div
					className="position-absolute start-50 translate-middle-x"
					style={{ bottom: "50px" }}
				>
					<button className="btn btn-primary rounded-circle btn-lg p-3">
						<i className="fa-solid fa-plus fs-3"></i>
					</button>
				</div>
			</div>
		</>
	);
}

export default Home;
