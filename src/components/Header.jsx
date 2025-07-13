import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

import homeIcon from "../images/icon-home.svg";
import favIcon from "../images/icon-fav.svg";
import filterIcon from "../images/icon-filter.svg";

import { Filters } from "./Filters";

const tabs = [
  { to: "/", icon: homeIcon, label: "Главная" },
  { to: "/favourites", icon: favIcon, label: "Избранное" },
];

export const Header = () => {
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();

  return (
    <>
      <Filters visible={showFilters} setVisible={setShowFilters} />
      <div className="nav-container">
        <div className="nav-tabs">
          {tabs.map(({ to, icon, label }) => (
            <Link to={to} key={to}>
              <div
                className={`nav-tab__item ${
                  location.pathname === to ? "nav-tab__item--active" : ""
                }`}
              >
                <img src={icon} alt={label} />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        {location.pathname === "/" && (
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
      </div>
    </>
  );
};
