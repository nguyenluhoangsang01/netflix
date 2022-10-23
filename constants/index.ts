import { Genre, Product } from "./../types";

export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/original";
export const BASE_URL_IMAGE_W500 = "https://image.tmdb.org/t/p/w500";
export const BASE_URL_YOUTUBE = "https://www.youtube.com/watch";
export const LOCAL_STORAGE_PLAN_KEY = "movie-plan";
export const LOCAL_STORAGE_SUBSCRIBE_TIME_KEY = "movie-subscribe-time";

export const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Basic",
    price: 7.99,
    videoQuality: "Good",
    resolution: "480p",
    portability: false,
    ads: true,
    ultraHD: false,
  },
  {
    id: 2,
    name: "Standard",
    price: 10.99,
    videoQuality: "Better",
    resolution: "1080p",
    portability: true,
    ads: true,
    ultraHD: false,
  },
  {
    id: 3,
    name: "Premium",
    price: 13.99,
    videoQuality: "Best",
    resolution: "4K+HDR",
    portability: true,
    ads: false,
    ultraHD: true,
  },
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
