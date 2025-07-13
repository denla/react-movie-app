import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Film } from "./pages/FilmPage";
import { Home } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { SearchPage } from "./pages/SearchPage";
import { Header } from "./components/Header";

import { WatchProvider } from "./context/WatchContext";

export const authContext = React.createContext({});

function App() {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [reviews, setReviews] = React.useState(null);

  return (
    <div className="App">
      <div className="container">
        <WatchProvider>
          <authContext.Provider
            value={{ loggedUser, setLoggedUser, reviews, setReviews }}
          >
            <Header />
            <Routes>
              <Route path="/film/:filmId" element={<Film />} />
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </authContext.Provider>
        </WatchProvider>
      </div>
    </div>
  );
}

export default App;
