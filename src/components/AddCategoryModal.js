import { useState } from "react";
import {
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

const CATEGORY_OPTIONS = [
  { icon: "tv", label: "TV", Component: IconDeviceTv },
  { icon: "movie", label: "Movie", Component: IconMovie },
  { icon: "game", label: "Game", Component: IconDeviceGamepad2 },
  { icon: "book", label: "Book", Component: IconBook },
  { icon: "music", label: "Music", Component: IconMusic },
  { icon: "theater", label: "Theater", Component: IconMasksTheater },
  { icon: "trophy", label: "Trophy", Component: IconTrophy },
  { icon: "star", label: "Star", Component: IconStar },
  { icon: "target", label: "Target", Component: IconTarget },
];

export default function AddCategoryModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("tv");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    onAdd(name.trim(), iconKey);
    onClose();
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Category</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label htmlFor="cat-name" className="form-label fw-semibold">
                  Category Name
                </label>
                <input
                  id="cat-name"
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder="e.g. Anime, Movies, Books..."
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  autoFocus
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="mb-2">
                <label className="form-label fw-semibold">Choose an icon</label>
                <div className="d-flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map(({ icon, label, Component }) => (
                    <button
                      key={icon}
                      type="button"
                      title={label}
                      className={`btn btn-outline-secondary p-2 ${iconKey === icon ? "active" : ""}`}
                      onClick={() => setIconKey(icon)}
                      style={{ lineHeight: 0 }}
                    >
                      <Component size={22} stroke={1.5} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer pt-0">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
