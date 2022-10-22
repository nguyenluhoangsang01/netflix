import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { movieState } from "../atoms/movieAtom";
import { BASE_URL_IMAGE } from "../constants";
import { Movie } from "../types";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [_, setIsShowModal] = useRecoilState(modalState);
  const [__, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length - 1)]
    );
  }, [netflixOriginals]);

  if (!movie) return null;

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 w-screen h-[95vh] -z-10">
        <Image
          src={`${BASE_URL_IMAGE}/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          layout="fill"
          alt={`Banner of ${movie?.title}`}
          objectFit="cover"
          priority
        />
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-7xl text-white">
        {movie?.title || movie?.original_title}
      </h1>
      <p
        className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md line-clamp-3"
        title={movie?.overview}
      >
        {movie?.overview}
      </p>

      <div className="flex items-center space-x-3 !mt-10">
        <button type="button" className="bannerButton bg-white text-black">
          <FaPlay className="w-4 h-4 text-black md:w-5 md:h-5" />
          <span>Play</span>
        </button>

        <button
          type="button"
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setIsShowModal(true);
          }}
        >
          <span>More Info</span>
          <HiInformationCircle className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
