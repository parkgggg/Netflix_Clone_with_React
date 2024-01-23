import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css"
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 담을 state
  const navigate = useNavigate();

  const useQuery = () => {
    //쿼리 스트링 조작용 객체 함수 => useLocation()(=현재 페이지 위치 정보).search(=현재 페이지 url의 쿼리 스트링))
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  //const searchTerm = query.get("q");
  //검색어에 디바운싱 적용
  const debouncedSearchTerm = useDebounce(query.get("q"), 500)
  
  useEffect(() => {
    //searchTerm state가 업데이트 되면 실행
    if (debouncedSearchTerm) {
      //검색하려는 값이 존재하면
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    //searchTerm에 대한 영화 정보를 요청
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      setSearchResults(request.data.results); //가져온 영화 정보 searchResults에 저장, 정보 없으면 에러 출력
      console.log(searchResults)
    } catch (e) {
      console.log("error", e);
    }
  };

  //검색 결과 존재 유무에 따라서 다른 JSX 반환
  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => { // 검색한 결과들로부터 이미지(back_drop) 가져오기 (media_type = person은 인물 정보 데이터를 이야기하는 듯)
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;

            return (
              <div className="movie" key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)} className="movie__column-poster">
                  <img src={movieImageUrl} alt="" className="movie_poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
            <p>
                Your search for "{debouncedSearchTerm}" did not have any matches.
            </p>
            <p>
                Suggestion:
            </p>
            <ul>
                <li>
                    Try different keywords
                </li>
            </ul>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
