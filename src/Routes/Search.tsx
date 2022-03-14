import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import { makeImagePath } from "../utilities";
import { ISearchResult } from "../interfaces";

const SliderWrapper = styled(motion.div)`
  width: 100%;

  margin: 130px 0 0 20px;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 120%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 100px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
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

const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

function Search() {
  const location = useLocation();
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<ISearchResult>(
    ["search", "searchResult"],
    () => getSearch(keyword)
  );

  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const toggleLeaving = () => setLeaving((prev) => !prev);
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

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {data && (
            <>
              <SliderWrapper>
                <h2>Tv Shows</h2>
                <button onClick={increaseIndex}>click</button>
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
                      .filter((movie) => movie.media_type === "tv")
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVar}
                          transition={{ type: "tween", duration: 0.5 }}
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          {/* seperate the image and info tab */}
                          <Info variants={infoVar}>
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </SliderWrapper>
              <SliderWrapper>
                <h2>Movies</h2>
                <button onClick={increaseIndex}>click</button>
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
                      .filter((movie) => movie.media_type === "movie")
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVar}
                          transition={{ type: "tween", duration: 0.5 }}
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                          {/* seperate the image and info tab */}
                          <Info variants={infoVar}>
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </SliderWrapper>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Search;
