import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashNavBar from "../../../components/DashNavBar";
import UpdateCinema from "../../../components/UpdateCinema";
import { fetchCinema, Remove, selectCinema } from "../../../slice/cinema-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface Props {}

const CinemaList = ({ movies }) => {
  const [loading, setloading] = useState(false);

  const select = useAppSelector(selectCinema);
  const dispatch = useAppDispatch();
  const { FETCH_URL } = process.env;

  const onDelete = async (movieId) => {
    setloading(true);

    try {
      // Delete post
      await fetch("/api/movies", {
        method: "DELETE",
        body: movieId,
      });
      dispatch(Remove({ _id: movieId }));
      setloading(false);
      alert("Movie Deleted");
      // return router.push(router.asPath);
    } catch (error) {
      // stop deleting state
      alert(`${error}`);

      return setloading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCinema());
  }, []);

  return (
    <>
      <DashNavBar />
      <Container>
        <Content>
          {select.cinemaList &&
            select.cinemaList.map((movie) => (
              <WrapContent key={movie._id}>
                <Wrap key={movie._id}>
                  <Image layout="fill" src={`${movie.cardImg}`} alt="image" />
                </Wrap>
                <UpdateCinema
                  Id={movie._id}
                  titleProp={movie.title}
                  descriptionProp={movie.description}
                  titleImgProp={movie.titleImg}
                  subTitleProp={movie.subTitle}
                  backgroundImgProp={movie.backgroundImg}
                  cardImgProp={movie.cardImg}
                  typeProp={movie.type}
                />
                <Button
                  onClick={() => {
                    onDelete(movie._id);
                  }}
                >
                  Delete
                </Button>
              </WrapContent>
            ))}
        </Content>
      </Container>
    </>
  );
};

const WrapContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
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
const Button = styled.button`
  margin-top: 10px;
  background-color: #f9f9f9;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-color: transparent;
  }
`;
export default CinemaList;

// export async function getServerSideProps(ctx) {
//   const { FETCH_URL } = process.env;

//   let response = await fetch(`${FETCH_URL}/movies`);
//   // extract the data
//   let movies = await response.json();

//   return {
//     props: {
//       movies,
//     },
//   };
// }
