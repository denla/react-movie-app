import React, { createContext, useContext, useEffect, useState } from "react";

const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchList");
    if (stored) setWatchList(JSON.parse(stored));
  }, []);

  const updateWatchList = (newList) => {
    setWatchList(newList);
    localStorage.setItem("watchList", JSON.stringify(newList));
  };

  const toggleFilm = (film) => {
    const exists = watchList.some((item) => item.filmId === film.filmId);
    const updated = exists
      ? watchList.filter((item) => item.filmId !== film.filmId)
      : [...watchList, film];

    updateWatchList(updated);
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, updateWatchList, toggleFilm }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

// Хук для быстрого доступа
export const useWatchList = () => useContext(WatchListContext);
