import { AiOutlineCheck } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { isPlanState, planState } from "../atoms/planAtom";
import { LOCAL_STORAGE_PLAN_KEY } from "../constants";
import { Product } from "../types";
import Header from "./Header";
import Helmet from "./Helmet";
import Table from "./Table";

const benefits = [
  "Watch anywhere.",
  "Watch all you want. Ad-free.",
  "Recommendations just for you.",
  "Change or cancel your plan anytime.",
  "Unlimited movies, TV shows, and more.",
];

const products: Product[] = [
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

const Plans = () => {
  const [plan, setPlan] = useRecoilState(planState);
  const [_, setIsPlan] = useRecoilState(isPlanState);

  const handleSubscribe = () => {
    setIsPlan(true);

    localStorage.setItem(LOCAL_STORAGE_PLAN_KEY, plan);
  };

  return (
    <div className="h-screen">
      <Helmet />

      <Header />

      <main className="pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-2xl md:text-3xl font-medium">
          Choose the plan that's right for you
        </h1>

        <ul>
          {benefits.map((benefit, idx) => (
            <li
              className="flex items-center gap-x-2 text-base md:text-lg"
              key={idx}
            >
              <AiOutlineCheck className="h-5 w-5 md:h-6 md:w-6 text-[#E50914]" />{" "}
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="w-full flex items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className="planBox"
                onClick={() => setPlan(product.name)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} />

          <button
            className="mx-auto w-full rounded bg-[#e50914] py-2 text-lg shadow hover:opacity-80 md:w-[420px] !mt-14"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
