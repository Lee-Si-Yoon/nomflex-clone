import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../../utilities";
import Modal from "./Modal";
import { IGetMovieResult, ITopRated, IUpcoming } from "../../interfaces";

const SliderWrapper = styled(motion.div)`
  width: 100%;
  position: relative;
  top: -220px;
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

interface ISlider {
  sliderName: string;
  data: IGetMovieResult | ITopRated | IUpcoming | undefined;
}

function Slider({ sliderName, data }: ISlider) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // https://velog.io/@ksmfou98/React-Router-v6-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%A0%95%EB%A6%AC
  const navigate = useNavigate();

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

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
      <>
        <SliderWrapper>
          <h2>{sliderName}</h2>

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
                .map((movie) => (
                  <Box
                    layoutId={movie.id + ""}
                    key={movie.id}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVar}
                    onClick={() => onBoxClick(movie.id)}
                    transition={{ type: "tween", duration: 0.5 }}
                    bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info variants={infoVar}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </SliderWrapper>
        <Modal></Modal>
      </>
    </>
  );
}

export default Slider;

/* 


*/
