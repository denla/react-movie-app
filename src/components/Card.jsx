import React from 'react';
import { Link } from 'react-router-dom';
import kinopoiskIcon from '../images/kinopoisk.svg';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { doc, deleteDoc } from 'firebase/firestore';
import { authContext } from '../App';
import { useLocation } from 'react-router-dom';

const firebaseConfig = {
  apiKey: 'AIzaSyCy0yljtdrb27cIoZEL8ABsGSGpiRsYzvI',
  authDomain: 'fir-films-8e7d0.firebaseapp.com',
  projectId: 'fir-films-8e7d0',
  storageBucket: 'fir-films-8e7d0.appspot.com',
  messagingSenderId: '923173656449',
  appId: '1:923173656449:web:9c2eccbe6a95305b26fa80',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Card = ({ obj, rating, filmId, id }) => {
  const location = useLocation();
  const { loggedUser, setLoggedUser, reviews, setReviews } = React.useContext(authContext);

  const removeItem = async (e) => {
    e.preventDefault();
    await deleteDoc(doc(db, 'watchList', id));
    setReviews(reviews.filter((obj) => obj.id != id));
  };

  return (
    <Link to={`/film/${filmId}`}>
      <div className="card">
        <div className="card__cover" style={{ background: 'url(' + obj.posterUrl + '' }}>
          <div class="film__rating">
            <img src={kinopoiskIcon} />
            {rating}
          </div>

          {location.pathname == '/profile' && (
            <div className="card__remove" onClick={removeItem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
                <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
              </svg>
            </div>
          )}
        </div>
        <p class="card__name">{obj.nameRu}</p>
        <p class="card__subtitle text-grey">{obj.genres[0].genre}</p>
      </div>
    </Link>
  );
};
