import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlistContext } from "../context/WatchlistContext";
import {
	IconFolderOpen,
	IconTrash,
	IconCircleCheck,
	IconPlayerPlay,
	IconDeviceTv,
	IconMovie,
	IconDeviceGamepad2,
	IconBook,
	IconMusic,
	IconMasksTheater,
	IconTrophy,
	IconStar,
	IconTarget,
} from "@tabler/icons-react";

const ICON_MAP = {
	tv: IconDeviceTv,
	movie: IconMovie,
	game: IconDeviceGamepad2,
	book: IconBook,
	music: IconMusic,
	theater: IconMasksTheater,
	trophy: IconTrophy,
	star: IconStar,
	target: IconTarget,

};

function CategoryIcon({ iconKey, size = 28 }) {
	const Icon = ICON_MAP[iconKey] || IconDeviceTv;
	return <Icon size={size} stroke={1.5} />;
}

export default function CategoryList() {
	const { categories, getEntries, deleteCategory } = useWatchlistContext();
	const navigate = useNavigate();
	const [confirmDelete, setConfirmDelete] = useState(null);

	if (categories.length === 0) {
		return (
			<div className="blankslate mt-4">
				<IconFolderOpen size={56} stroke={1.2} className="mb-3 text-muted" />
				<div className="blankslate-body">
					<h4 className="mb-2">No Categories Yet</h4>
					<p className="text-center text-muted">
						Tap the <strong>+</strong> button below to create your first category and start
						organizing your watchlist!
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<ul className="list-group list-group-flush rounded-2 border">
				{categories.map((cat) => {
					const entries = getEntries(cat.id);
					const completed = entries.filter((e) => e.status === "completed").length;
					const inProgress = entries.filter((e) => e.status === "in-progress").length;

					return (
						<li
							key={cat.id}
							className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
							style={{ cursor: "pointer" }}
							onClick={() => navigate(`/category/${cat.id}`)}
						>
							<span className="text-primary flex-shrink-0">
								<CategoryIcon iconKey={cat.icon} size={28} />
							</span>

							<div className="flex-grow-1 min-w-0">
								<div className="fw-semibold">{cat.name}</div>
								<div className="d-flex align-items-center gap-2 flex-wrap mt-1">
									<small className="text-muted">
										{entries.length === 0
											? "No entries yet"
											: `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`}
									</small>
									{completed > 0 && (
										<small className="d-inline-flex align-items-center gap-1 text-success">
											<IconCircleCheck size={13} stroke={2.5} />
											{completed}
										</small>
									)}
									{inProgress > 0 && (
										<small className="d-inline-flex align-items-center gap-1 text-warning">
											<IconPlayerPlay size={13} stroke={2.5} />
											{inProgress}
										</small>
									)}
								</div>
							</div>

							<button
								className="btn btn-sm btn-outline-danger flex-shrink-0"
								title="Delete category"
								onClick={(e) => {
									e.stopPropagation();
									setConfirmDelete(cat);
								}}
							>
								<IconTrash size={15} stroke={1.75} />
							</button>
						</li>
					);
				})}
			</ul>

			{confirmDelete && (
				<div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
					<div className="modal-dialog modal-dialog-centered modal-sm">
						<div className="modal-content">
							<div className="modal-body text-center py-4">
								<p className="mb-1 fw-semibold">Delete category?</p>
								<div className="d-flex align-items-center justify-content-center gap-2 text-muted">
									<CategoryIcon iconKey={confirmDelete.icon} size={18} />
									<small><strong>{confirmDelete.name}</strong> and all its entries will be removed.</small>
								</div>
							</div>
							<div className="modal-footer justify-content-center gap-2">
								<button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>
									Cancel
								</button>
								<button
									className="btn btn-danger"
									onClick={() => {
										deleteCategory(confirmDelete.id);
										setConfirmDelete(null);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
