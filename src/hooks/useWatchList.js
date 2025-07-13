// import { useState, useEffect } from "react";

// export const useWatchList = () => {
//   const [watchListStore, setWatchListStore] = useState([]);

//   // При монтировании загружаем из localStorage
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("watchList");
//       setWatchListStore(stored ? JSON.parse(stored) : []);
//     } catch {
//       setWatchListStore([]);
//     }
//   }, []);

//   // Синхронизируем localStorage при изменении watchList
//   useEffect(() => {
//     localStorage.setItem("watchList", JSON.stringify(watchListStore));
//   }, [watchListStore]);

//   // Проверяем, есть ли фильм в списке
//   const isInWatchList = (kinopoiskId) => {
//     return watchListStore.some((item) => item.kinopoiskId === kinopoiskId);
//   };

//   // Добавляем или удаляем фильм из списка
//   const toggleFilm = (selectedFilm) => {
//     setWatchListStore((prevList) => {
//       const exists = prevList.some(
//         (film) => film.kinopoiskId === selectedFilm.kinopoiskId
//       );
//       if (exists) {
//         return prevList.filter(
//           (film) => film.kinopoiskId !== selectedFilm.kinopoiskId
//         );
//       } else {
//         return [...prevList, selectedFilm];
//       }
//     });
//   };

//   return { watchListStore, toggleFilm, isInWatchList };
// };

export const isInWatchList = (kinopoiskId) => {
  try {
    const stored = localStorage.getItem("watchList");
    const list = stored ? JSON.parse(stored) : [];
    return list.some((item) => item.kinopoiskId === kinopoiskId);
  } catch {
    return false;
  }
};

export const toggleFilm = (selectedFilm) => {
  const watchList = JSON.parse(localStorage.getItem("watchList"));
  const alreadyExists = isInWatchList(selectedFilm.kinopoiskId);
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
  // return updatedList;
};
