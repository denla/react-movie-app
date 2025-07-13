import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ratingIcon from "../images/icon-star-black.svg";
import key from "../config";

export const Film = () => {
  const { filmId } = useParams();
  const [currentFilm, setCurrentFilm] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
      method: "GET",
      headers: {
        "X-API-KEY": key,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCurrentFilm(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      <div className="content">
        <div className="content-header">
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>

        {!loading && (
          <div className="film">
            <div className="film__info">
              <div
                class="film__cover"
                style={{ background: `url("${currentFilm.posterUrl})` }}
              ></div>
            </div>
            <div className="film__desc">
              <h1 className="film__name">{currentFilm.nameRu}</h1>
              <h3 className="film__year">{currentFilm.year}</h3>

              <div className="film__rating">
                <img src={ratingIcon} />
                {currentFilm.ratingKinopoisk}
              </div>

              <div className="genre-options">
                {currentFilm.genres.map((genre) => (
                  <div className="chip">{genre.genre}</div>
                ))}
              </div>

              <div className="card-content">
                <h4>О фильме</h4>
                <p className="film__text text-grey">
                  {currentFilm.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
