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
