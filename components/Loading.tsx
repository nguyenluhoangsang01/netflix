import { BiLoaderCircle } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <BiLoaderCircle className="animate-spin text-4xl" />
    </div>
  );
};

export default Loading;
