import { useState, useEffect, useCallback } from "react";
import { Card } from "../components/Card";
import { Search } from "../components/Search";
import { useLocation, useSearchParams } from "react-router-dom";
import { filmsData } from "../data/filmsData";
import key from "../config";

import { Modal } from "../components/Modal";
import CardLoader from "../components/skeletons/CardLoader";

import { useWatchList } from "../hooks/useWatchList";

export const Home = () => {
  const [top, setTop] = useState(filmsData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const genres = searchParams.get("genres");
  const ratingFrom = searchParams.get("ratingFrom");
  const ratingTo = searchParams.get("ratingTo");
  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");

  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    console.log("New page is loading", page);
    setLoading(true);

    const params = new URLSearchParams();
    if (genres) params.append("genres", genres[0]);
    if (ratingFrom) params.append("ratingFrom", ratingFrom);
    if (ratingTo) params.append("ratingTo", ratingTo);
    if (yearFrom) params.append("yearFrom", yearFrom);
    if (yearTo) params.append("yearTo", yearTo);
    params.append("page", page); // добавляем страницу в параметры

    fetch(
      `shttps://kinopoiskapiunofficial.tech/api/v2.2/films?${params.toString()}`, // исправил typo "hhttps"
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

  const handleScroll = useCallback(() => {
    console.log("HANDLE SCROLL FUNCTION");

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 150;

    if (nearBottom && hasMore && !loading) {
      console.log("TRIGGERING NEXT PAGE LOAD");
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    console.log("ATTACHING SCROLL HANDLER");
    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("REMOVING SCROLL HANDLER");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setTop([]);
    setPage(1);
  }, [genres, ratingFrom, ratingTo, yearFrom, yearTo]);

  const confirmAddToWatchList = (e) => {
    e.preventDefault();

    let stored = localStorage.getItem("watchList");
    let watchList = [];

    try {
      watchList = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(watchList)) {
        watchList = [];
      }
    } catch (err) {
      console.error("Ошибка парсинга watchList:", err);
      watchList = [];
    }

    const alreadyExists = watchList.some(
      (film) => film.kinopoiskId === selectedFilm.kinopoiskId
    );

    if (!alreadyExists) {
      const updatedList = [...watchList, selectedFilm];
      localStorage.setItem("watchList", JSON.stringify(updatedList));
      console.log("Добавлен в список:", selectedFilm);
    } else {
      const updatedList = watchList.filter(
        (film) => film.kinopoiskId !== selectedFilm.kinopoiskId
      );
      localStorage.setItem("watchList", JSON.stringify(updatedList));
      console.log("Удаляем");
    }

    setShowModal(false);
  };

  const cancelAdd = (e) => {
    e.preventDefault();
    console.log("Отмена добавления");
    setShowModal(false);
  };

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
