import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconBookmark,
  IconCircleCheck,
  IconPlayerPlay,
  IconClock,
  IconStarFilled,
} from "@tabler/icons-react";
import Navbar from "../components/Navbar";
import EntryCard from "../components/EntryCard";
import AddEntryModal from "../components/AddEntryModal";
import { useWatchlistContext } from "../context/WatchlistContext";
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

function CategoryIcon({ iconKey, size = 24 }) {
  const Icon = ICON_MAP[iconKey] || IconDeviceTv;
  return <Icon size={size} stroke={1.5} />;
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "will-watch", label: "Will Watch", Icon: IconClock },
  { value: "in-progress", label: "In Progress", Icon: IconPlayerPlay },
  { value: "completed", label: "Completed", Icon: IconCircleCheck },
];

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategoryById, getEntries, addEntry, updateEntry, deleteEntry } =
    useWatchlistContext();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const category = getCategoryById(id);
  const entries = getEntries(id);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">
          <p className="text-muted">Category not found.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </>
    );
  }

  const filtered = entries.filter((e) => {
    const matchesFilter = filter === "all" || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: entries.length,
    completed: entries.filter((e) => e.status === "completed").length,
    inProgress: entries.filter((e) => e.status === "in-progress").length,
    willWatch: entries.filter((e) => e.status === "will-watch").length,
  };

  const ratedEntries = entries.filter((e) => e.status === "completed" && e.rating);
  const avgRating = ratedEntries.length
    ? (ratedEntries.reduce((s, e) => s + e.rating, 0) / ratedEntries.length).toFixed(1)
    : null;

  return (
    <>
      <Navbar />
      <div className="px-3 py-3" style={{ paddingBottom: "100px" }}>
        {/* Back + Title */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/")}>
            <IconArrowLeft size={16} stroke={2} />
          </button>
          <span className="text-primary">
            <CategoryIcon iconKey={category.icon} size={24} />
          </span>
          <h5 className="mb-0 fw-bold">{category.name}</h5>
        </div>

        {/* Compact toolbar: search + filters + stats */}
        {entries.length > 0 && (
          <div className="mb-3">
            {/* Search + filter row */}
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <input
                type="text"
                className="form-control form-control-sm flex-grow-1"
                style={{ minWidth: "140px" }}
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="d-flex gap-1 flex-shrink-0">
                {STATUS_FILTERS.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    title={label}
                    className={`btn btn-sm d-inline-flex align-items-center gap-1 ${filter === value ? "btn-primary" : "btn-outline-secondary"
                      }`}
                    onClick={() => setFilter(value)}
                  >
                    {Icon ? <Icon size={14} stroke={2} /> : label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats badges row */}
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-secondary rounded-pill badge-padded text-white">{stats.total} total</span>
              {stats.completed > 0 && (
                <span className="badge bg-success rounded-pill badge-padded d-inline-flex align-items-center gap-1">
                  <IconCircleCheck size={11} stroke={2.5} /> {stats.completed} done
                </span>
              )}
              {stats.inProgress > 0 && (
                <span className="badge bg-warning text-dark rounded-pill badge-padded d-inline-flex align-items-center gap-1">
                  <IconPlayerPlay size={11} stroke={2.5} /> {stats.inProgress} watching
                </span>
              )}
              {stats.willWatch > 0 && (
                <span className="badge bg-secondary rounded-pill badge-padded d-inline-flex align-items-center gap-1">
                  <IconClock size={11} stroke={2.5} /> {stats.willWatch} queued
                </span>
              )}
              {avgRating && (
                <span className="badge bg-primary rounded-pill badge-padded d-inline-flex align-items-center gap-1">
                  <IconStarFilled size={11} /> {avgRating}/5 avg
                </span>
              )}
            </div>
          </div>
        )}

        {/* Entry list */}
        {filtered.length === 0 && entries.length === 0 ? (
          <div className="blankslate mt-4">
            <IconBookmark size={56} stroke={1.2} className="mb-3 text-muted" />
            <div className="blankslate-body">
              <h4 className="mb-2">Nothing here yet</h4>
              <p className="text-center text-muted">
                Tap <strong>+</strong> to add your first entry to <strong>{category.name}</strong>.
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted mt-4">No entries match your filter.</p>
        ) : (
          <ul className="list-group list-group-flush rounded-2 border">
            {filtered.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                categoryId={id}
                onUpdate={updateEntry}
                onDelete={deleteEntry}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Floating add button */}
      <div
        className="position-fixed start-50 translate-middle-x"
        style={{ bottom: "28px", zIndex: 1050 }}
      >
        <button
          id="add-entry-btn"
          className="btn btn-primary rounded-circle btn-lg p-0 d-flex align-items-center justify-content-center shadow-lg"
          style={{ width: "60px", height: "60px" }}
          onClick={() => setShowModal(true)}
          title="Add Entry"
        >
          <i className="fa-solid fa-plus fs-4"></i>
        </button>
      </div>

      {showModal && (
        <AddEntryModal
          onAdd={(entry) => addEntry(id, entry)}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
