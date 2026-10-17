import { useState, useCallback } from "react";

const STORAGE_KEY = "chronowatch_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { categories: [], entries: {} };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function useWatchlist() {
  const [data, setData] = useState(loadData);

  const persist = useCallback((updater) => {
    setData((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const addCategory = useCallback(
    (name, icon = "📺") => {
      const id = Date.now().toString();
      persist((prev) => ({
        ...prev,
        categories: [...prev.categories, { id, name, icon, createdAt: Date.now() }],
        entries: { ...prev.entries, [id]: [] },
      }));
      return id;
    },
    [persist]
  );

  const deleteCategory = useCallback(
    (id) => {
      persist((prev) => {
        const categories = prev.categories.filter((c) => c.id !== id);
        const entries = { ...prev.entries };
        delete entries[id];
        return { ...prev, categories, entries };
      });
    },
    [persist]
  );

  const renameCategory = useCallback(
    (id, name) => {
      persist((prev) => ({
        ...prev,
        categories: prev.categories.map((c) => (c.id === id ? { ...c, name } : c)),
      }));
    },
    [persist]
  );

  const addEntry = useCallback(
    (categoryId, entry) => {
      const id = Date.now().toString();
      const newEntry = {
        id,
        title: entry.title,
        status: entry.status || "will-watch",
        rating: entry.rating || null,
        notes: entry.notes || "",
        createdAt: Date.now(),
      };
      persist((prev) => ({
        ...prev,
        entries: {
          ...prev.entries,
          [categoryId]: [...(prev.entries[categoryId] || []), newEntry],
        },
      }));
    },
    [persist]
  );

  const updateEntry = useCallback(
    (categoryId, entryId, changes) => {
      persist((prev) => ({
        ...prev,
        entries: {
          ...prev.entries,
          [categoryId]: prev.entries[categoryId].map((e) =>
            e.id === entryId ? { ...e, ...changes } : e
          ),
        },
      }));
    },
    [persist]
  );

  const deleteEntry = useCallback(
    (categoryId, entryId) => {
      persist((prev) => ({
        ...prev,
        entries: {
          ...prev.entries,
          [categoryId]: prev.entries[categoryId].filter((e) => e.id !== entryId),
        },
      }));
    },
    [persist]
  );

  const getEntries = useCallback(
    (categoryId) => data.entries[categoryId] || [],
    [data.entries]
  );

  const getCategoryById = useCallback(
    (id) => data.categories.find((c) => c.id === id) || null,
    [data.categories]
  );

  return {
    categories: data.categories,
    getCategoryById,
    getEntries,
    addCategory,
    deleteCategory,
    renameCategory,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
