import { useEffect, useState } from "react";
import React from "react";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Link } from "react-router";

import EmptyState from "../components/EmptyState";
import { isInWatchList } from "../hooks/useWatchList";

export const FavouritesPage = () => {
  const [watchList, setWatchList] = React.useState(null);

  useEffect(() => {
    // localStorage.removeItem("watchList");
    let res = localStorage.getItem("watchList");
    setWatchList(JSON.parse(res));

    console.log(res);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const confirmAddToWatchList = (e) => {
    e.preventDefault();

    let stored = localStorage.getItem("watchList");
    let watchList = [];

    try {
      watchList = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(watchList)) {
        watchList = [];
      }
    } catch (err) {
      console.error("Ошибка парсинга watchList:", err);
      watchList = [];
    }

    // Проверим, есть ли уже этот фильм
    const alreadyExists = isInWatchList(selectedFilm.kinopoiskId);

    if (!alreadyExists) {
      const updatedList = [...watchList, selectedFilm];
      localStorage.setItem("watchList", JSON.stringify(updatedList));
      console.log("Добавлен в список:", selectedFilm);
    } else {
      const updatedList = watchList.filter(
        (film) => film.kinopoiskId !== selectedFilm.kinopoiskId
      );
      localStorage.setItem("watchList", JSON.stringify(updatedList));
      console.log("Удаляем");
    }

    setShowModal(false);
  };

  const cancelAdd = (e) => {
    e.preventDefault();
    console.log("Added to watch list");
    setShowModal(false);
  };

  return (
    <>
      <div className="main">
        <div className="content">
          <h1>Избранное</h1>
          {watchList?.length ? (
            <div className="cards">
              {watchList.map((film) => (
                <Card
                  key={film.kinopoiskId}
                  obj={film}
                  rating={film.ratingKinopoisk}
                  filmId={film.kinopoiskId}
                  onAddClick={() => {
                    setSelectedFilm(film);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="В избранном ничего не найдено. Попробуйте вернуться   на главную и
          добавить фильм"
              emoji={"🔍"}
            />
          )}
          <Modal
            visible={showModal}
            currentFilm={selectedFilm}
            onConfirm={(e) => confirmAddToWatchList(e)}
            onCancel={(e) => cancelAdd(e)}
          />
        </div>
      </div>
    </>
  );
};
