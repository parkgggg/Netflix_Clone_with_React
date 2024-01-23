import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

///라우팅 구현을 위해 MainPage, DetailePage, SearchPage로 나누면서, 원래 App.js에 있던 JSX 코드를 MainPage

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="No"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Treding Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </div>
  );
}
