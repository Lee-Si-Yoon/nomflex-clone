import { useQuery } from "react-query";
import styled from "styled-components";
import { getLatest, getMovies, getTopRated, getUpcoming } from "../api";
import { IGetMovieResult, ITopRated, ILatest, IUpcoming } from "../interfaces";
import { makeImagePath } from "../utilities";
import Slider from "./Components/Slider";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h2`
  font-size: 48px;
  margin: 0 0 20px 0;
`;

const OverView = styled.p`
  font-size: 24px;
  width: 50%;
`;

/* const NEXFLIX_LOGO_URL =
'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

const backdropPath = movie.backdrop_path
? makeImagePath(movie.backdrop_path, 'w500')
: NEXFLIX_LOGO_URL; */

function Home() {
  const res_nowplayMovie = useQuery<IGetMovieResult>(["nowPlaying"], getMovies);
  //
  const res_topMovie = useQuery<ITopRated>(["topRated"], getTopRated);
  const res_latestMovie = useQuery<ILatest>(["latest"], getLatest);
  const res_upcoming = useQuery<IUpcoming>(["upcoming"], getUpcoming);
  return (
    <Wrapper>
      {res_nowplayMovie.isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              res_nowplayMovie.data?.results[0].backdrop_path || ""
            )}
          >
            <Title>{res_nowplayMovie.data?.results[0].title}</Title>
            <OverView>{res_nowplayMovie.data?.results[0].overview}</OverView>
          </Banner>
          <Slider
            sliderName="Now Playing"
            data={res_nowplayMovie.data}
          ></Slider>
          <Slider
            sliderName="Top Rated Movies"
            data={res_topMovie.data}
          ></Slider>
          <Slider
            sliderName="Upcoming Movies"
            data={res_upcoming.data}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
