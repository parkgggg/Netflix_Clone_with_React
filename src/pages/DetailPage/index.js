import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function DetailPage() {

  // 라우팅할 때 속성 값들 중 정의된 다이나믹 경로 세그먼트들을 넘겨받은 페이지에서 사용할 수 있게 해줌.
  // 간단하게 말하면 라우팅 시 :stlye 문법이 path 속성에서 사용되었다면 : 뒤의 값들을 파라미터로 넘겨받음
  //여기선 movieId (App.js의 <Route path=":movieId" element={<DetailePage/>}/>)
  //useParams()는 객체로 반환되기 때문에 여러 개의 값이 안에 들어있을 수 있음. So, "객체.파리미터명" 형태로 호출 (하나일 땐, 노 상관)
  const { movieId } = useParams();

  //선택된 영화 정보를 담는 state
  const [movies, setMovies] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      setMovies(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movies) return null;

  return (
    <section>
        <img 
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
        alt="modal__poster-img"
        />
    </section>
  )
}
