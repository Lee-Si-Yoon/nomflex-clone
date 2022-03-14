// https://developers.themoviedb.org/3/movies/get-now-playing

const API_KEY = "f14d2321ee3a9edcf3cd7ed9454c9614";
const BASE_PATH = "https://api.themoviedb.org/3/";

export function getMovies() {
  return fetch(`${BASE_PATH}movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getSearch(QUERY: string | null) {
  return fetch(
    `${BASE_PATH}search/multi?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=1`
  ).then((response) => response.json());
}

export function getTopRated() {
  return fetch(`${BASE_PATH}movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpcoming() {
  return fetch(`${BASE_PATH}movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getLatest() {
  return fetch(`${BASE_PATH}movie/latest?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
