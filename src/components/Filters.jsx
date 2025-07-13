import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { filtersData } from "../data/filtersData";
import closeIcon from "../images/icon-close.svg";

const currentYear = new Date().getFullYear();

export const Filters = ({ visible, setVisible, onFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [yearRange, setYearRange] = useState([1990, currentYear]);

  useEffect(() => {
    const genres = searchParams.get("genres")?.split(",").map(Number) || [];
    const ratingFrom = parseFloat(searchParams.get("ratingFrom") || "0");
    const ratingTo = parseFloat(searchParams.get("ratingTo") || "10");
    const yearFrom = parseInt(searchParams.get("yearFrom") || "1990");
    const yearTo = parseInt(searchParams.get("yearTo") || currentYear);

    setSelectedGenres(genres);
    setRatingRange([ratingFrom, ratingTo]);
    setYearRange([yearFrom, yearTo]);

    onFilter({
      genres,
      ratingRange: [ratingFrom, ratingTo],
      yearRange: [yearFrom, yearTo],
    });
  }, []);

  const updateURLParams = (genres, rating, year) => {
    const params = new URLSearchParams();

    if (genres.length) params.set("genres", genres.join(","));
    if (rating[0] !== 0) params.set("ratingFrom", rating[0]);
    if (rating[1] !== 10) params.set("ratingTo", rating[1]);
    if (year[0] !== 1990) params.set("yearFrom", year[0]);
    if (year[1] !== currentYear) params.set("yearTo", year[1]);

    setSearchParams(params);
    onFilter({ genres, ratingRange: rating, yearRange: year });
  };

  const toggleGenre = (genre) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newGenres);
    updateURLParams(newGenres, ratingRange, yearRange);
  };

  const handleRatingSlider = (e, newValue) => {
    setRatingRange(newValue);
    updateURLParams(selectedGenres, newValue, yearRange);
  };

  const handleYearSlider = (e, newValue) => {
    setYearRange(newValue);
    updateURLParams(selectedGenres, ratingRange, newValue);
  };

  return (
    <div
      className={`modal-overlay ${!visible && "modal-hidden"}`}
      onClick={() => setVisible(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-round modal-close"
          onClick={() => setVisible(false)}
        >
          <img src={closeIcon} />
        </button>
        <h3>Жанры</h3>
        <div className="genre-options">
          {filtersData.genres.slice(0, 10).map((genre) => (
            <div
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`chip ${
                selectedGenres.includes(genre.id) ? "active" : ""
              }`}
            >
              {genre.genre}
            </div>
          ))}
        </div>

        <h3>Рейтинг</h3>
        <Slider
          getAriaLabel={() => "Рейтинг"}
          value={ratingRange}
          onChange={handleRatingSlider}
          valueLabelDisplay="auto"
          step={0.1}
          min={0}
          max={10}
          size="small"
          sx={(t) => ({
            color: "#006aff",
          })}
          disableSwap
        />

        <h3>Год</h3>
        <Slider
          getAriaLabel={() => "Год выпуска"}
          value={yearRange}
          onChange={handleYearSlider}
          valueLabelDisplay="auto"
          step={1}
          min={1990}
          max={currentYear}
          size="small"
          sx={(t) => ({
            color: "#006aff",
          })}
          disableSwap
        />
      </div>
    </div>
  );
};
