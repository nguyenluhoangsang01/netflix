import Image from "next/image";
import Link from "next/link";
import { BASE_URL_IMAGE_W500 } from "../constants/movie";
import { Movie } from "../types";
import slugify from "../utils/slugify";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const title =
    movie.title || movie.original_title
      ? movie.title || movie.original_title
      : "*Movie title has not been updated yet";

  return (
    <div className="flex flex-col" title={title}>
      <div className="relative h-28 min-w-[180px] transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Link
          href={`movies/${
            slugify(movie.title) || slugify(movie.original_title) || movie.id
          }`}
        >
          <a>
            <Image
              src={`${BASE_URL_IMAGE_W500}/${
                movie.backdrop_path || movie.poster_path
              }`}
              layout="fill"
              alt={movie.title || movie.original_title}
              className="rounded-sm object-cover md:rounded"
              loading="lazy"
              unoptimized
            />
          </a>
        </Link>
      </div>
      <h6 className="line-clamp-1 mt-1" title={title}>
        {title}
      </h6>
    </div>
  );
};

export default Thumbnail;
