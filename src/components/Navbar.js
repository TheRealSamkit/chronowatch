import ThemeToggle from "./ThemeToggle";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div>
			<div className="navbar">
				<div className="container-fluid">
					<NavLink to="/">
						<span className="navbar-brand text-decoration-none">
							ChronoWatch
						</span>
					</NavLink>

					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
