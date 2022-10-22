import axios from "axios";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { isPlanState } from "../atoms/planAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Helmet from "../components/Helmet";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import Row from "../components/Row";
import { LOCAL_STORAGE_PLAN_KEY } from "../constants";
import { Movie } from "../types";
import requests from "../utils/requests";

interface Props {
  trending: Movie[];
  netflixOriginals: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  trending,
  netflixOriginals,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const isShowModal = useRecoilValue(modalState);
  const isPlan = useRecoilValue(isPlanState);
  const check = !isPlan && !localStorage.getItem(LOCAL_STORAGE_PLAN_KEY);

  if (check) return <Plans />;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Helmet title="Home" />

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="space-y-14 md:space-y-32">
          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {isShowModal && <Modal />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const getTrending = await axios.get(requests.getTrending);
  const getNetflixOriginals = await axios.get(requests.getNetflixOriginals);
  const getTopRated = await axios.get(requests.getTopRated);
  const getActionMovies = await axios.get(requests.getActionMovies);
  const getComedyMovies = await axios.get(requests.getComedyMovies);
  const getHorrorMovies = await axios.get(requests.getHorrorMovies);
  const getRomanceMovies = await axios.get(requests.getRomanceMovies);
  const getDocumentaries = await axios.get(requests.getDocumentaries);

  return {
    props: {
      trending: getTrending.data.results,
      netflixOriginals: getNetflixOriginals.data.results,
      topRated: getTopRated.data.results,
      actionMovies: getActionMovies.data.results,
      comedyMovies: getComedyMovies.data.results,
      horrorMovies: getHorrorMovies.data.results,
      romanceMovies: getRomanceMovies.data.results,
      documentaries: getDocumentaries.data.results,
    },
  };
};

export default Home;
