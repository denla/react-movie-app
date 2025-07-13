import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

import homeIcon from "../images/icon-home.svg";
import favIcon from "../images/icon-fav.svg";
import filterIcon from "../images/icon-filter.svg";
import searchIcon from "../images/icon-search.svg";

import { Filters } from "./Filters";

export const Header = () => {
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  console.log("Location", location.pathname);

  const handleFilterChange = () => {
    console.log("test");
  };

  return (
    <>
      <Filters
        visible={showFilters}
        setVisible={setShowFilters}
        onFilter={handleFilterChange}
      />
      <div className="nav-container">
        <div className="nav-tabs">
          <Link to="/">
            <div
              className={`nav-tab__item ${
                location.pathname == "/" && "nav-tab__item--active"
              }`}
            >
              <img src={homeIcon} />
              <span>Главная</span>
            </div>
          </Link>
          {/* <Link to="/search">
            <div
              className={`nav-tab__item ${
                location.pathname == "/search" && "nav-tab__item--active"
              }`}
            >
              <img src={searchIcon} />
              <span>Поиск</span>
            </div>
          </Link> */}
          <Link to="/favourites">
            <div
              className={`nav-tab__item ${
                location.pathname == "/favourites" && "nav-tab__item--active"
              }`}
            >
              <img src={favIcon} />
              <span>Избранное</span>
            </div>
          </Link>
        </div>

        {location.pathname == "/" && (
          <div className="nav-tabs">
            <div
              className="nav-tab__item nav-tab__item--filter"
              onClick={() => setShowFilters(!showFilters)}
            >
              <img src={filterIcon} />
              <span>Фильтры</span>
            </div>
          </div>
        )}

        {/* {showFilters && <Filters onFilter={handleFilterChange} />} */}
      </div>
    </>
  );
};
