import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authContext } from '../App';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Add a second document with a generated ID.
import { addDoc, collection } from 'firebase/firestore';

import kinopoiskIcon from '../images/kinopoisk.svg';
import { useNavigate } from 'react-router-dom';

import key from '../config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCy0yljtdrb27cIoZEL8ABsGSGpiRsYzvI',
  authDomain: 'fir-films-8e7d0.firebaseapp.com',
  projectId: 'fir-films-8e7d0',
  storageBucket: 'fir-films-8e7d0.appspot.com',
  messagingSenderId: '923173656449',
  appId: '1:923173656449:web:9c2eccbe6a95305b26fa80',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Film = () => {
  const { loggedUser, setLoggedUser, reviews, setReviews } = React.useContext(authContext);
  const { filmId } = useParams();
  console.log('reviews');

  let isAdded;
  if (reviews) {
    isAdded = reviews.filter((obj) => obj.film.kinopoiskId == filmId).length;
  }

  const [currentFilm, setCurrentFilm] = React.useState();
  const [staff, setStaff] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'watchList'), {
        authorId: loggedUser.uid,
        film: currentFilm,
      });
      setReviews([...reviews, { authorId: loggedUser.uid, film: currentFilm }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': key,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCurrentFilm(json);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}&professionKey="ACTOR"`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setStaff(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentFilm]);

  const reviewFilm = () => {
    console.log({ comment, currentFilm });
  };

  return (
    <div className="container">
      <div>
        {!loading && (
          <div className="film">
            <div className="film__info">
              <div
                class="film__cover"
                style={{ background: 'url(' + currentFilm.posterUrl + ')' }}
              ></div>
            </div>
            <div className="film__desc">
              <h2 className="film__name">{currentFilm.nameRu}</h2>
              <h3 className="film__year">{currentFilm.year}</h3>
              <div className="film__rating">
                <img src={kinopoiskIcon} />
                {currentFilm.ratingKinopoisk}
              </div>
              {loggedUser ? (
                isAdded ? (
                  <button className="btn-wide">Добавлен в список</button>
                ) : (
                  <button className="btn-main btn-wide" onClick={addData}>
                    Посмотрю
                  </button>
                )
              ) : (
                <div className="film__alert">
                  Войдите, чтобы добавить этот фильм в свой список
                  <button className="btn-main btn-wide" onClick={() => navigate('/profile')}>
                    Войти
                  </button>
                </div>
              )}

              <h4>О фильме</h4>
              <p className="film__text text-grey">{currentFilm.description}</p>
              <h4>Актеры и съемочная группа</h4>
              <div className="staff">
                {staff &&
                  staff.map((obj) => (
                    <div className="staff__item">
                      <div
                        className="staff__avatar"
                        style={{ background: 'url(' + obj.posterUrl + ') 0 -20px' }}
                      ></div>
                      <p className="staff__name">{obj.nameRu}</p>
                      <p className="staff__subtitle text-grey">{obj.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
