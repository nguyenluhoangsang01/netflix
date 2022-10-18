export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  getTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  getNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  getTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  getActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  getComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  getHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  getRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  getDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
