import React, { useContext } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authContext } from '../App';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Card } from './Card';

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

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Profile = () => {
  const { loggedUser, setLoggedUser, reviews, setReviews } = React.useContext(authContext);
  const [loading, setLoading] = React.useState(true);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setLoggedUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    setLoggedUser(null);
    setReviews(null);
  };

  React.useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'watchList'), where('authorId', '==', loggedUser.uid));

      const data = await getDocs(q);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getData();
  }, [loggedUser]);

  console.log(loggedUser);
  return (
    <div>
      {!loggedUser && (
        <div className="container">
          <div className="login">
            <h2 className="login__title">Смотрите. Не забывайте</h2>
            <p className="login__descr text-grey">
              Войдите, чтобы создать свой собственный список фильмов для просмотра
            </p>
            <button onClick={signIn} className="btn-wide">
              Login with Google
            </button>
          </div>
        </div>
      )}

      {loggedUser && (
        <div className="profile">
          <div
            class="profile__avatar"
            style={{ background: 'url(' + loggedUser.photoURL + ')' }}
          ></div>

          <h2>{loggedUser.displayName}</h2>
          <p className="text-grey">{loggedUser.email}</p>

          <button onClick={logOut} className="btn-wide">
            Log out
          </button>
        </div>
      )}

      <div className="profile__watchlist">
        {reviews && (
          <h3>
            Посмотрю позже<span className="count">{reviews.length}</span>
          </h3>
        )}
        <div className="cards">
          {!loading &&
            reviews &&
            reviews.map((obj) => (
              <Card
                obj={obj.film}
                rating={obj.film.ratingKinopoisk}
                filmId={obj.film.kinopoiskId}
                id={obj.id}
              />
            ))}
        </div>
      </div>
      {/* <button onClick={addData}>Add data</button> */}
    </div>
  );
};
