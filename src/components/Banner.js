//axios 기본 제공 모듈이 아니라, 직접 정의한 것을 불러와야됨
import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../api/requests";

//Style Component => JS에서 CSS 처리가 가능하게 해주는 라이브러리
import styled from "styled-components"
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기(여러 영화) -
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request);
    const movieId =
      request.data.results[
        //Math.random => 0~1 사이의 무작위값, Math.floor => 내림 함수(작거나 같은 것 중 가장 큰 정수 반환)
        // 0~가져온 영화 수 사이의 랜덤 정수
        Math.floor(Math.random() * request.data.results.length)
      ].id;

      //더 상세한 영화 정보 가져오기 
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
    console.log(movie)
  };

  //문자열 길이가 n보다 길면 n+1부터는 ...으로 대체
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  //일반 배너 화면 (Play 버튼 클릭 안 되었을 때)
  console.log(movie)
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            {/* 버튼 두 개 (Play, Decription}*/}
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">
              <div className="space"></div> More Information
            </button>
          </div>
          {/* 요약 설명 */}
          <h1 className="banner__description">   
            { /* 100자 이상이면 뒤는 생략 */ }
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    //비디오 재생 화면 Play 버튼 클릭 되었을 때,
    return (
        <Container>
            <HomeContainer>
            {/*Iframe == Inline Frame, 다른 HTML 페이지를 현재 페이지에 포함시키는 중첩된 브라우저로, 제한없이 다른 페이지 삽입이 가능해짐*/}
            <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=$\${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
            </HomeContainer>
        </Container>
    )
  }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;