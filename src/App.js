import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Film } from './components/Film';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Header } from './components/Header';

export const authContext = React.createContext({});

function App() {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [reviews, setReviews] = React.useState(null);

  return (
    <div className="App">
      <div className="container">
        <authContext.Provider value={{ loggedUser, setLoggedUser, reviews, setReviews }}>
          <Header />
          <Routes>
            <Route path="/film/:filmId" element={<Film />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </authContext.Provider>
      </div>
    </div>
  );
}

export default App;
