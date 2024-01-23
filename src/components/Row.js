import React, { lazy, useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  //영화들 담을 State
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  //컴포넌트가 처음 렌더링 될 때 실행할 작업
  //(의존성 배열을 빈배열로 넣으면 처음 렌더링 할 때만, 렌더링 될 때마다 실행하고 싶으면 두 번째 인자를 아예 비워놓으면 된다.)
  useEffect(() => {
    // 새로 렌더링 되면 영화 데이터를 새로 가져온다
    fetchMovieData();
  }, []);

  // 비동기로 tmdb API를 사용해 영화 데이터 get
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    //가져온 데이터는 movies state로
    console.log("request", request);

    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <section>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        }}
      >
        <div id={id} className="row__posters">
          {/*map을 사용해서 <img> 나열*/}
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                loading="lazy"
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
