import React from 'react';
import { Card } from './Card';

export const Home = () => {
  const [top, setTop] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', {
      method: 'GET',
      headers: {
        'X-API-KEY': '37a1397d-dfdd-4c55-a2bf-e6159b15350c',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.films);
        setTop(json.films);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="profile__watchlist">
        <h3>Топ фильмов</h3>
        <div className="cards">
          {!loading &&
            top.map((film) => <Card obj={film} rating={film.rating} filmId={film.filmId} />)}
        </div>
      </div>
    </>
  );
};
