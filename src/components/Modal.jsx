import React from "react";
import closeIcon from "../images/icon-close.svg";

//import custom hook
// import { isInWatchList } from "../hooks/useWatchList";

import { useWatchList } from "../hooks/useWatchList";

export const Modal = ({ visible, currentFilm, onConfirm, onCancel }) => {
  //   if (!visible) return null;
  const { isInWatchList, toggleFilm } = useWatchList();

  return (
    <div
      className={`modal-overlay ${!visible && `modal-hidden`} `}
      onClick={onCancel}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-round modal-close" onClick={onCancel}>
          <img src={closeIcon} />
        </button>

        {currentFilm && (
          <>
            <div className="modal-title">
              {isInWatchList(currentFilm.kinopoiskId) ? (
                <span>Удалить из избранного?</span>
              ) : (
                <span>Добавить в избранное?</span>
              )}
              <div className="modal-film">
                <div
                  className="card__cover"
                  style={{ background: `url(${currentFilm.posterUrl})` }}
                ></div>
                <div className="card__info">
                  <span className="card__name">{currentFilm.nameRu}</span>
                  <span className="card__subtitle">{currentFilm.year}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-main btn-wide">
            Да
          </button>
          <button onClick={onCancel} className="btn-wide">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
