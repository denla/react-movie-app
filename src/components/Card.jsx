import React from 'react';
import { Link } from 'react-router-dom';
import kinopoiskIcon from '../images/kinopoisk.svg';

export const Card = ({ obj, rating, filmId }) => {
  return (
    <Link to={`/film/${filmId}`}>
      <div className="card">
        <div className="card__cover" style={{ background: 'url(' + obj.posterUrl + '' }}>
          <div class="film__rating">
            <img src={kinopoiskIcon} />
            {rating}
          </div>
        </div>
        <p class="card__name">{obj.nameRu}</p>
        <p class="card__subtitle text-grey">{obj.genres[0].genre}</p>
      </div>
    </Link>
  );
};
