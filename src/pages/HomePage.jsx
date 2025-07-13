import { useState, useEffect, useCallback } from "react";
import { Card } from "../components/Card";
import { Search } from "../components/Search";
import { useSearchParams } from "react-router-dom";
import { filmsData } from "../data/filmsData";
import key from "../config";

import { Modal } from "../components/Modal";
import CardLoader from "../components/skeletons/CardLoader";

// import { toggleFilm } from "../hooks/useWatchList";
import { useWatch } from "../context/WatchContext";

export const Home = () => {
  const [top, setTop] = useState(filmsData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchParams] = useSearchParams();

  const genres = searchParams.get("genres");
  const ratingFrom = searchParams.get("ratingFrom");
  const ratingTo = searchParams.get("ratingTo");
  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");

  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const { toggleFilm } = useWatch();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (genres) params.append("genres", genres[0]);
    if (ratingFrom) params.append("ratingFrom", ratingFrom);
    if (ratingTo) params.append("ratingTo", ratingTo);
    if (yearFrom) params.append("yearFrom", yearFrom);
    if (yearTo) params.append("yearTo", yearTo);
    params.append("page", page);

    fetch(
      `shttps://kinopoiskapiunofficial.tech/api/v2.2/films?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (page === 1) {
          setTop(json.items || []);
        } else {
          setTop((prev) => [...prev, ...(json.items || [])]);
        }
        setHasMore(json.items && json.items.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTop(filmsData);
        setLoading(false);
        // setLoading(true);
      });
  }, [genres, ratingFrom, ratingTo, yearFrom, yearTo, page]);

  // Modal
  const confirmAddToWatchList = (e) => {
    e.preventDefault();
    toggleFilm(selectedFilm);

    setShowModal(false);
  };

  const cancelAdd = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  // Lazy load
  const handleScroll = useCallback(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 150;

    if (nearBottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setTop([]);
    setPage(1);
  }, [genres, ratingFrom, ratingTo, yearFrom, yearTo]);

  return (
    <>
      <Search searchText={searchText} setSearchText={setSearchText} top={top} />
      <div className="main">
        <div className="content">
          <h1>Популярно сейчас</h1>
          <div className="cards">
            {top &&
              top.map((film) => (
                <Card
                  key={film.kinopoiskId}
                  obj={film}
                  rating={film.ratingKinopoisk}
                  filmId={film.kinopoiskId}
                  onAddClick={() => {
                    setSelectedFilm(film);
                    setShowModal(true);
                  }}
                />
              ))}
            {loading &&
              Array.from({ length: 10 }).map((el, i) => <CardLoader key={i} />)}
            <Modal
              visible={showModal}
              currentFilm={selectedFilm}
              onConfirm={(e) => confirmAddToWatchList(e)}
              onCancel={(e) => cancelAdd(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
