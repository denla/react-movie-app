import React, { createContext, useContext, useState, useEffect } from "react";

const WatchContext = createContext();

export const WatchProvider = ({ children }) => {
  const [watchListStore, setWatchListStore] = useState(() => {
    const stored = localStorage.getItem("watchList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchListStore));
  }, [watchListStore]);

  const toggleFilm = (selectedFilm) => {
    setWatchListStore((prev) => {
      const exists = prev.some(
        (film) => film.kinopoiskId === selectedFilm.kinopoiskId
      );
      if (exists) {
        return prev.filter(
          (film) => film.kinopoiskId !== selectedFilm.kinopoiskId
        );
      }
      return [...prev, selectedFilm];
    });
  };

  const isInWatchList = (id) =>
    watchListStore.some((film) => film.kinopoiskId === id);

  return (
    <WatchContext.Provider
      value={{ watchListStore, toggleFilm, isInWatchList }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export const useWatch = () => useContext(WatchContext);
