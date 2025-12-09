import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";

function CategoryList({ categories }) {
	return (
		<>
			{/* Manage empty State */}
			{0 === 0 ? (
				<ul className="list-group list-group-flush rounded-2 border">
					<li className="list-group-item">
						<h2>
							Anime
							<button className="btn btn-default rounded-pill float-end py-1 px-2">
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</button>
						</h2>
						<h6>4 Entries Found</h6>
					</li>
					<li className="list-group-item">
						<h2>
							Movies
							<button className="btn btn-default rounded-pill float-end py-1 px-2">
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</button>
						</h2>
						<h6>5 Entries Found</h6>
					</li>
					<li className="list-group-item">
						<h2>
							Web Series
							<button className="btn btn-default rounded-pill float-end py-1 px-2">
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</button>
						</h2>
						<h6>6 Entries Found</h6>
					</li>
					<li className="list-group-item">
						<h2>
							TV Shows
							<button className="btn btn-default rounded-pill float-end py-1 px-2">
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</button>
						</h2>
						<h6>1 Entries Found</h6>
					</li>
				</ul>
			) : (
				<div className="blankslate">
					<i className="fa-regular fa-folder-open fa-3x mb-3 blankslate-top-img"></i>
					<div className="blankslate-body">
						<h4 className="mb-2">No Categories Found</h4>
						<p className="text-center text-muted">
							You haven't added any categories yet. Click the "+"
							button to create your first category and start
							organizing your watchlist!
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default CategoryList;
