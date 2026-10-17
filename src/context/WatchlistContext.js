import React, { createContext, useContext } from "react";
import useWatchlist from "../hooks/useWatchlist";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const watchlist = useWatchlist();
  return (
    <WatchlistContext.Provider value={watchlist}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlistContext must be used inside WatchlistProvider");
  return ctx;
}
