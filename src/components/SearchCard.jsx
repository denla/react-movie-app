import React from "react";
import { Link } from "react-router-dom";
import kinopoiskIcon from "../images/kinopoisk.svg";

import { doc, deleteDoc } from "firebase/firestore";
import { authContext } from "../App";
import { useLocation } from "react-router-dom";

export const SearchCard = ({ obj, rating, filmId, id, size }) => {
  const location = useLocation();
  return (
    <Link to={`/film/${filmId}`}>
      <div className={`search_card`}>
        <div
          className="card__cover"
          style={{ background: "url(" + obj.posterUrl + "" }}
        >
          <div class="film__rating">
            <img src={kinopoiskIcon} />
            {rating}
          </div>

          {location.pathname == "/profile" && (
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

        <div className="card__info">
          <p class="card__name">{obj.nameRu}</p>
          <p class="card__subtitle text-grey">{obj.year}</p>
        </div>
        {/* {obj.genres[0].genre} */}
      </div>
    </Link>
  );
};
