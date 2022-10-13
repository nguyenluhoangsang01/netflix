import Head from "next/head";

interface Props {
  title?: string;
}

const Helmet = ({ title }: Props) => {
  return (
    <Head>
      <title>{title ? `${title} | Netflix` : "Netflix"}</title>

      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="keywords"
        content="watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies Vietnam, watch TV online, no download, full length movies"
      />
      <meta
        name="description"
        content="Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
      />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"
      />
      <meta
        name="apple-touch-icon"
        content="https://assets.nflxext.com/en_us/layout/ecweb/netflix-app-icon_152.jpg"
      />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
};

export default Helmet;
