import styled from "styled-components";
import {
  getProviders,
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from "next-auth/react";
import Login from "../components/Login";
import NavHeader from "../components/NavHeader";
import ImgSlider from "../components/ImgSlider";
import Viewrs from "../components/Viewrs";
import Recommends from "../components/Recommends";
import NewDisney from "../components/NewDisney";
import Original from "../components/Original";
import Trending from "../components/Trending";

export default function Home({
  providers,
  tempNewDisney,
  tempTrending,
  tempRecommends,
  tempOriginals,
}) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <>
      <NavHeader providers={providers} />
      <Container>
        <ImgSlider />
        <Viewrs />
        <Recommends recommends={tempRecommends} />
        <NewDisney newDisney={tempNewDisney} />
        <Original original={tempOriginals} />
        <Trending trending={tempTrending} />
      </Container>
    </>
  );
}
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  background: url("/images/home-background.png") center center / cover no-repeat
    fixed;
  /* &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  } */
`;

export async function getServerSideProps(context: GetSessionParams) {
  const providers = await getProviders();
  const session = await getSession(context);

  const url = "http://localhost:3000/";
  var tempRecommends: any[] = [];
  var tempNewDisney: any[] = [];
  var tempOriginals: any[] = [];
  var tempTrending: any[] = [];

  let response = await fetch(`${url}/api/movies`);
  // extract the data
  let movies = await response.json();

  movies.map((movie) => {
    switch (movie.type) {
      case "recommend":
        tempRecommends.push(movie);

        break;

      case "newDisney":
        tempNewDisney.push(movie);

        break;

      case "original":
        tempOriginals.push(movie);

        break;

      case "trending":
        tempTrending.push(movie);

        break;
    }
  });

  return {
    props: {
      providers,
      session,
      tempNewDisney,
      tempTrending,
      tempRecommends,
      tempOriginals,
    },
  };
}

//login lay out will have the provider
