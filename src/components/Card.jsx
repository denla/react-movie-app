import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import starIcon from "../images/icon-star.svg";
import { useWatch } from "../context/WatchContext";
import CoverLoader from "./skeletons/CoverLoader";

const RemoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" />
  </svg>
);

export const Card = ({
  obj: { posterUrl, nameRu, year },
  rating,
  filmId,
  onAddClick,
}) => {
  const location = useLocation();
  const [isCoverLoading, setIsCoverLoading] = useState(true);
  const { isInWatchList } = useWatch();

  useEffect(() => {
    setIsCoverLoading(true);
    const img = new Image();
    img.src = posterUrl;
    img.onload = () => setIsCoverLoading(false);
  }, [posterUrl]);

  return (
    <div className="card">
      <Link to={`/film/${filmId}`}>
        {isCoverLoading ? (
          <CoverLoader />
        ) : (
          <div
            className="card__cover"
            style={{ backgroundImage: `url(${posterUrl})` }}
          >
            <div className="film__rating">
              <img src={starIcon} alt="Рейтинг" />
              {rating}
            </div>
            {location.pathname === "/profile" && (
              <div className="card__remove">
                <RemoveIcon />
              </div>
            )}
          </div>
        )}
        <div className="card__info">
          <span className="card__name">{nameRu}</span>
          <span className="card__subtitle">{year}</span>
        </div>
      </Link>
      <button
        aria-label={
          isInWatchList(filmId) ? "Удалить из списка" : "Добавить в список"
        }
        onClick={(e) => {
          e.preventDefault();
          onAddClick(filmId);
        }}
      >
        {isInWatchList(filmId) ? "Удалить" : "Посмотрю"}
      </button>
    </div>
  );
};
