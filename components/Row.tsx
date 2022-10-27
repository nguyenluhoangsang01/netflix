import { DocumentData } from "firebase/firestore";
import { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Movie } from "../types";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
  const [isMoved, setIsMoved] = useState<Boolean>(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMove = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-40 space-y-1 md:space-y-3">
      <h2 className="text-md font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="relative group">
        <BsChevronLeft
          className={`absolute top-1/4 bg-[#dc2626] p-2 rounded-full left-2 z-40 m-auto w-8 h-8 opacity-0 transition hover:scale-125 active:scale-100 group-hover:opacity-100 cursor-pointer ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleMove("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center overflow-x-scroll space-x-4 scrollbar-hide pb-12"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <BsChevronRight
          className="absolute top-1/4 bg-[#dc2626] p-2 rounded-full right-10 z-40 m-auto w-8 h-8 opacity-0 transition hover:scale-125 active:scale-100 group-hover:opacity-100 cursor-pointer"
          onClick={() => handleMove("right")}
        />
      </div>
    </div>
  );
};

export default Row;
