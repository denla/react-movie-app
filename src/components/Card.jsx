import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import starIcon from "../images/icon-star.svg";
// import { isInWatchList } from "../hooks/isInWatchList";

import CoverLoader from "./skeletons/CoverLoader";

import { useWatchList } from "../hooks/useWatchList";

export const Card = ({ obj, rating, filmId, onAddClick }) => {
  const location = useLocation();
  const { isInWatchList, toggleFilm } = useWatchList();

  const [isCoverLoading, setIsCoverLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `${obj.posterUrl}`;
    img.onload = () => {
      setIsCoverLoading(false);
    };
  }, []);

  return (
    <>
      <Link to={`/film/${filmId}`}>
        <div className={`card`}>
          {isCoverLoading ? (
            <CoverLoader />
          ) : (
            <div
              className="card__cover"
              style={{ background: `url(${obj.posterUrl})` }}
            >
              <div className="film__rating">
                <img src={starIcon} />
                {rating}
              </div>

              {location.pathname === "/profile" && (
                <div className="card__remove">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                  </svg>
                </div>
              )}
            </div>
          )}

          <div className="card__info">
            <span className="card__name">{obj.nameRu}</span>
            <span className="card__subtitle">{obj.year}</span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onAddClick();
            }}
          >
            {isInWatchList(filmId) ? "Удалить" : "Посмотрю"}
          </button>
        </div>
      </Link>
    </>
  );
};
