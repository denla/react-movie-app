import { useState } from "react";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import EmptyState from "../components/EmptyState";
import { useWatch } from "../context/WatchContext";

export const FavouritesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const { toggleFilm, watchListStore: watchList } = useWatch();

  const handleRemove = () => {
    toggleFilm(selectedFilm);
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
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
            emoji="🔍"
          />
        )}
        <Modal
          visible={showModal}
          currentFilm={selectedFilm}
          onConfirm={handleRemove}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};
