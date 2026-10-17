import { useState } from "react";
import { IconClock, IconPlayerPlay, IconCircleCheck } from "@tabler/icons-react";

const STATUS_OPTIONS = [
  { value: "will-watch", label: "Will Watch", Icon: IconClock },
  { value: "in-progress", label: "In Progress", Icon: IconPlayerPlay },
  { value: "completed", label: "Completed", Icon: IconCircleCheck },
];

export default function AddEntryModal({ onAdd, onClose, editEntry = null }) {
  const [title, setTitle] = useState(editEntry?.title || "");
  const [status, setStatus] = useState(editEntry?.status || "will-watch");
  const [rating, setRating] = useState(editEntry?.rating || "");
  const [notes, setNotes] = useState(editEntry?.notes || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onAdd({
      title: title.trim(),
      status,
      rating: status === "completed" && rating ? Number(rating) : null,
      notes: notes.trim(),
    });
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
            <h5 className="modal-title">{editEntry ? "Edit Entry" : "Add Entry"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body py-0">
              <div className="mb-3">
                <label htmlFor="entry-title" className="form-label fw-semibold">
                  Title
                </label>
                <input
                  id="entry-title"
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder="e.g. Attack on Titan, Inception..."
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setError(""); }}
                  autoFocus
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <div className="d-flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      className={`btn d-flex align-items-center gap-1 ${status === value ? "btn-primary" : "btn-outline-secondary"}`}
                      onClick={() => setStatus(value)}
                    >
                      <Icon size={16} stroke={2} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {status === "completed" && (
                <div className="mb-3">
                  <label htmlFor="entry-rating" className="form-label fw-semibold">
                    Rating (1–5)
                  </label>
                  <input
                    id="entry-rating"
                    type="number"
                    min="1"
                    max="5"
                    className="form-control"
                    placeholder="Rate it out of 5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-2">
                <label htmlFor="entry-notes" className="form-label fw-semibold">
                  Notes <span className="text-muted fw-normal">(optional)</span>
                </label>
                <textarea
                  id="entry-notes"
                  className="form-control"
                  rows="2"
                  placeholder="Any thoughts, episode stopped at, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editEntry ? "Save Changes" : "Add Entry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
