import React, { lazy, useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

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
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <section>
      <h2>{title}</h2>
      <div className="slider">
        {/* 왼쪽으로 슬라이드*/}
        <div className="slider__arrow-left">
          {/* scrollLeft = 요소의 수평 스크롤 바 위치*/}
          {/* 얼만큼씩 이동할 지는 만드는 사람 마음 => 지금은 window의 innerwidth - 80 만큼씩*/}
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>{" "}
          {/*브라켓에 안 넣으면 <, >는 에러 발생*/}
        </div>

        <div id={id} className="row__posters">
          {/*map을 사용해서 <img> 나열*/}
          {movies.map((movie) => (
            <img
              key="{movie.id}"
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              loading="lazy"
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>

        {/* 오른쪽으로 슬라이드*/}
        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
