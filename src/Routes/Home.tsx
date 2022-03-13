import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utilities";
import { useState } from "react";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
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

const Slider = styled(motion.div)`
  position: relative;
  top: -150px;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 100px;
  color: red;
`;

const rowVar = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      // this is for preventing double click
      if (leaving) return;
      toggleLeaving();
      // because we used one movie in the banner
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider onClick={increaseIndex}>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
