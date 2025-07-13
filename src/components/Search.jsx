import React from "react";
import { SearchCard } from "./SearchCard";

export const Search = ({ searchText, setSearchText, top }) => {
  return (
    <div className="search-container">
      <input
        className="input-search"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      {searchText && (
        <div className="search-results">
          {top.map((film) => (
            <SearchCard obj={film} rating={film.rating} filmId={film.filmId} />
          ))}
        </div>
      )}
    </div>
  );
};
