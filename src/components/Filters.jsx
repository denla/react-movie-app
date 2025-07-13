import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { filtersData } from "../data/filtersData";
import closeIcon from "../images/icon-close.svg";

const currentYear = new Date().getFullYear();

export const Filters = ({ visible, setVisible }) => {
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
  }, [visible]);

  const updateURLParams = (genres, rating, year) => {
    const params = new URLSearchParams();

    if (genres.length) params.set("genres", genres.join(","));
    if (rating[0] !== 0) params.set("ratingFrom", rating[0]);
    if (rating[1] !== 10) params.set("ratingTo", rating[1]);
    if (year[0] !== 1990) params.set("yearFrom", year[0]);
    if (year[1] !== currentYear) params.set("yearTo", year[1]);

    setSearchParams(params);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleRatingSlider = (e, newValue) => {
    setRatingRange(newValue);
  };

  const handleYearSlider = (e, newValue) => {
    setYearRange(newValue);
  };

  const applyFilters = () => {
    updateURLParams(selectedGenres, ratingRange, yearRange);
    setVisible(false);
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setRatingRange([0, 10]);
    setYearRange([1990, currentYear]);
    setSearchParams({});
    setVisible(false);
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
          sx={{ color: "#006aff" }}
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
          sx={{ color: "#006aff" }}
          disableSwap
        />

        <div className="modal-buttons" style={{ marginTop: "20px" }}>
          <button className="btn-main btn-wide" onClick={applyFilters}>
            Применить
          </button>
          <button className="btn-wide" onClick={resetFilters}>
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
