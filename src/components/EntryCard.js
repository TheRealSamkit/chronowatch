import { useState } from "react";
import {
  IconClock,
  IconPlayerPlay,
  IconCircleCheck,
  IconPencil,
  IconTrash,
  IconStarFilled,
  IconStar,
} from "@tabler/icons-react";
import AddEntryModal from "./AddEntryModal";

const STATUS_META = {
  "will-watch": { label: "Will Watch", badge: "secondary", Icon: IconClock },
  "in-progress": { label: "In Progress", badge: "warning", Icon: IconPlayerPlay },
  completed: { label: "Completed", badge: "success", Icon: IconCircleCheck },
};

function StarRating({ rating }) {
  return (
    <span className="d-inline-flex align-items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        i < rating
          ? <IconStarFilled key={i} size={14} style={{ color: "#f5a623" }} />
          : <IconStar key={i} size={14} style={{ color: "var(--bs-secondary-color)" }} />
      ))}
      <small className="text-muted ms-1">{rating}/5</small>
    </span>
  );
}

export default function EntryCard({ entry, categoryId, onUpdate, onDelete }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const meta = STATUS_META[entry.status] || STATUS_META["will-watch"];
  const { Icon: StatusIcon } = meta;

  const handleStatusCycle = () => {
    const order = ["will-watch", "in-progress", "completed"];
    const nextIdx = (order.indexOf(entry.status) + 1) % order.length;
    onUpdate(categoryId, entry.id, { status: order[nextIdx], rating: null });
  };

  return (
    <>
      <li className="list-group-item list-group-item-action d-flex align-items-start gap-3 py-3">
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
            <span className="fw-semibold text-truncate" style={{ maxWidth: "60vw" }}>
              {entry.title}
            </span>
            <span
              className={`badge rounded-pill bg-${meta.badge} text-${meta.badge === "warning" ? "dark" : "white"} d-inline-flex align-items-center gap-1 px-2 py-1`}
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={handleStatusCycle}
              title="Click to cycle status"
            >
              <StatusIcon size={12} stroke={2.5} />
              {meta.label}
            </span>
          </div>

          {entry.status === "completed" && entry.rating && (
            <div className="mb-1">
              <StarRating rating={entry.rating} />
            </div>
          )}

          {entry.notes && (
            <p className="text-muted small mb-0" style={{ whiteSpace: "pre-wrap" }}>
              {entry.notes}
            </p>
          )}
        </div>

        <div className="d-flex gap-1 flex-shrink-0">
          <button
            className="btn btn-sm btn-outline-secondary"
            title="Edit"
            onClick={() => setShowEdit(true)}
          >
            <IconPencil size={15} stroke={1.75} />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            onClick={() => setShowConfirm(true)}
          >
            <IconTrash size={15} stroke={1.75} />
          </button>
        </div>
      </li>

      {showEdit && (
        <AddEntryModal
          editEntry={entry}
          onAdd={(changes) => onUpdate(categoryId, entry.id, changes)}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showConfirm && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                <p className="mb-1 fw-semibold">Delete this entry?</p>
                <small className="text-muted">&ldquo;{entry.title}&rdquo;</small>
              </div>
              <div className="modal-footer justify-content-center gap-2">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => { onDelete(categoryId, entry.id); setShowConfirm(false); }}
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
