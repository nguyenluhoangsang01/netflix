import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL_IMAGE_W500 } from "../constants";
import { Movie } from "../types";
import slugify from "../utils/slugify";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const title =
    movie?.title ||
    movie?.name ||
    movie?.original_title ||
    movie?.original_name;

  return (
    <div className="flex flex-col" title={title}>
      <div className="relative min-w-[180px] h-36 transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Link
          href={`movies/${
            slugify(movie.title) ||
            slugify(movie.original_title) ||
            slugify(movie.name) ||
            slugify(movie.original_name)
          }`}
        >
          <a>
            <div className="relative min-w-[180px] h-36">
              <Image
                src={`${BASE_URL_IMAGE_W500}/${
                  movie.backdrop_path || movie.poster_path
                }`}
                layout="fill"
                objectFit="cover"
                alt={movie.title || movie.original_title}
                className="rounded-sm object-cover md:rounded"
                loading="lazy"
              />
            </div>
          </a>
        </Link>
      </div>
      <h6 className="line-clamp-1 mt-1 text-white" title={title}>
        {title}
      </h6>
    </div>
  );
};

export default Thumbnail;
