import axios from "axios";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineLike,
  AiOutlineLoading3Quarters,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  BsFullscreen,
  BsFullscreenExit,
  BsPauseFill,
  BsPlayFill,
} from "react-icons/bs";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import ReactPlayer from "react-player";
import { useRecoilState, useRecoilValue } from "recoil";
import screenfull from "screenfull";
import { modalState } from "../atoms/modalAtom";
import { movieState } from "../atoms/movieAtom";
import { BASE_URL_YOUTUBE, genres } from "../constants";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import { Video } from "../types";
import formatDate from "../utils/formatDate";
import { API_KEY, BASE_URL } from "../utils/requests";
import Loading from "./Loading";

const ModalFC = () => {
  const [_, setIsShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [actions, setActions] = useState({
    isPlaying: false,
    volume: 0.8,
    isMuted: false,
    isFullscreen: false,
  });
  const [isShowControl, setIsShowControl] = useState<Boolean>(false);
  const [isAddedToList, setIsAddedToList] = useState<Boolean>(false);
  const { user } = useAuth();
  const list = useList(user?.uid);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setIsAddedToList(list?.some((item) => item.id === movie?.id.toString()));
  }, [list, movie]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { results },
        } = await axios(
          `${BASE_URL}/${movie?.media_type === "tv" ? "tv" : "movie"}/${
            movie?.id
          }/videos?api_key=${API_KEY}&language=${movie?.original_language}`
        );

        if (results.length > 0) {
          setTrailer(
            results.filter(
              (video: Video) =>
                video.name !== "Now Streaming" &&
                (video.type === "Trailer" ||
                  video.type === "Teaser" ||
                  video.type === "Clip" ||
                  video.type === "Bloopers" ||
                  video.type === "Featurette" ||
                  video.type === "Behind the Scenes")
            )[0]
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movie]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShowModal(false);
        handleFullscreenExit();
      } else if (event.key === "f") {
        if (actions.isFullscreen) {
          handleFullscreenExit();
        } else {
          handleFullscreen();
        }
      } else if (event.key === "m") {
        if (actions.isMuted) {
          handleUnmute();
        } else {
          handleMute();
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [actions.isFullscreen, actions.isMuted]);

  useEffect(() => {
    if (actions.volume === 0) {
      setActions({
        ...actions,
        isMuted: true,
      });
    } else {
      setActions({
        ...actions,
        isMuted: false,
      });
    }
  }, [actions.volume]);

  const handleClickOutsideModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      setIsShowModal(false);
    }
  };

  const handlePlay = () => {
    setActions({ ...actions, isPlaying: true });
  };

  const handlePause = () => {
    setActions({ ...actions, isPlaying: false });
  };

  const handleMute = () => {
    setActions({ ...actions, isMuted: true, volume: 0 });
  };

  const handleUnmute = () => {
    setActions({ ...actions, isMuted: false, volume: 0.8 });
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActions({ ...actions, volume: parseFloat(event.target.value) });
  };

  const handleFullscreenExit = () => {
    if (screenfull.isEnabled) {
      screenfull.exit();

      setActions({ ...actions, isFullscreen: false });
    }
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      const player = document.querySelector("#player");

      if (player) {
        screenfull.request(player);

        setActions({ ...actions, isFullscreen: true });
      }
    }
  };

  const handleAddToList = async (title: string) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", user!.uid, "myList", movie?.id.toString()),
        {
          ...movie,
        }
      );
      toast(`${title} has been added to your list!`, {
        icon: <AiOutlineCheck className="text-[green]" />,
        duration: 5000,
      });

      setLoading(false);
      setIsAddedToList(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRemoveFromList = async (title: string) => {
    setLoading(true);
    try {
      await deleteDoc(
        doc(db, "users", user!.uid, "myList", movie?.id.toString())
      );

      toast(`${title} has been removed from your list!`, {
        icon: <AiOutlineClose className="text-[red]" />,
        duration: 5000,
      });

      setIsAddedToList(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center px-5 md:px-10"
      onClick={handleClickOutsideModal}
    >
      <Toaster />

      <button
        onClick={() => setIsShowModal(false)}
        className="absolute top-1 right-1 md:top-4 md:right-4"
      >
        <AiOutlineCloseCircle className="text-4xl transition hover:text-[#e50914]" />
      </button>

      <div
        className="bg-white overflow-y-scroll scrollbar-hide p-2 rounded-md shadow-lg md:max-w-5xl w-full h-4/5 relative"
        onMouseOver={() => setIsShowControl(true)}
        onMouseLeave={() => setIsShowControl(false)}
      >
        {trailer ? (
          <>
            <ReactPlayer
              id="player"
              width="100%"
              height="100%"
              url={`${BASE_URL_YOUTUBE}?v=${trailer?.key}`}
              playing={actions.isPlaying}
              volume={actions.volume}
              muted={actions.isMuted}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handlePause}
            />

            {isShowControl && (
              <div className="flex items-center justify-between w-full absolute -ml-2 bottom-4 px-4 sm:px-36 md:px-44">
                <div className="flex items-center space-x-4 md:space-x-8">
                  {actions.isPlaying ? (
                    <BsPauseFill
                      className="controlIcons"
                      onClick={handlePause}
                    />
                  ) : (
                    <BsPlayFill className="controlIcons" onClick={handlePlay} />
                  )}

                  <div className="flex items-center space-x-4 md:space-x-8">
                    {actions.isMuted ? (
                      <FiVolumeX
                        className="controlIcons"
                        onClick={handleUnmute}
                      />
                    ) : (
                      <FiVolume2
                        className="controlIcons"
                        onClick={handleMute}
                      />
                    )}

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={actions.volume}
                      onChange={handleVolumeChange}
                      className="rounded-lg overflow-hidden appearance-none bg-[#ccc] h-3 w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-8" title="(F)">
                  {actions.isFullscreen ? (
                    <BsFullscreenExit
                      className="cursor-pointer w-6 h-6"
                      onClick={handleFullscreenExit}
                    />
                  ) : (
                    <BsFullscreen
                      className="cursor-pointer w-6 h-6"
                      onClick={handleFullscreen}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}

        <div className="bg-black p-4 space-y-4 text-sm border-t-2 mt-2">
          <div className="flex items-center justify-between space-x-4 md:justify-start">
            <p className="font-semibold text-green-400">
              {movie?.vote_average * 10}% Match
            </p>
            <p className="font-light">
              {formatDate(movie?.release_date || movie?.first_air_date)}
            </p>
            {movie?.adult && (
              <p className="border border-white px-2 text-xs rounded">18+</p>
            )}
            <p className="border border-white px-2 text-xs rounded">HD</p>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl md:text-3xl">
              {movie?.title ||
                movie?.name ||
                movie?.original_title ||
                movie?.original_name}
            </h1>

            <div className="flex items-center gap-4">
              {loading ? (
                <div className="animate-spin">
                  <AiOutlineLoading3Quarters />
                </div>
              ) : isAddedToList ? (
                <AiOutlineCheck
                  className="controlIcons bg-[green] transition"
                  onClick={() =>
                    handleRemoveFromList(
                      movie?.title ||
                        movie?.name ||
                        movie?.original_title ||
                        movie?.original_name
                    )
                  }
                />
              ) : (
                <AiOutlinePlus
                  className="controlIcons"
                  onClick={() =>
                    handleAddToList(
                      movie?.title ||
                        movie?.name ||
                        movie?.original_title ||
                        movie?.original_name
                    )
                  }
                />
              )}

              <AiOutlineLike className="controlIcons" />
            </div>
          </div>

          <div className="space-y-4 md:flex md:justify-between md:gap-8">
            <p className="w-full text-justify md:w-4/6">{movie?.overview}</p>

            <div className="space-y-4 md:w-2/6 !mt-0 md:space-y-0 md:flex md:flex-col md:gap-2">
              <div>
                <span className="text-[gray]">Genres: </span>
                <span>
                  {movie?.genre_ids?.map((genre_id: number) => (
                    <span key={genre_id} className="comma">
                      {genres?.find((genre) => genre.id === genre_id)?.name}
                    </span>
                  ))}
                </span>
              </div>

              <div>
                <span className="text-[gray]">Original language: </span>
                <span className="uppercase">{movie?.original_language}</span>
              </div>

              <div>
                <span className="text-[gray]">
                  Total vote{movie?.vote_count > 1 ? "s" : ""}:{" "}
                </span>
                <span>{movie?.vote_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFC;
