import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    //검색창에 입력된 값으로 searchValue 변경 =>
    setSearchValue(e.target.value);
    //?q=~~~ 는 쿼리 스트링
    // "/search?q={검색창에 입력된 값}" 형태로 url navigate => SearchPage 컴포넌트로 이동
    navigate(`/search?q=${e.target.value}`)
  }

  return (
    <nav className={`nav ${show && "nav__black"}`}>

      {/* 넷플릭스 로고(좌상단) */}
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />

      {/* 검색창 */}
      <input 
      value={searchValue}
      onChange={handleChange}
      className="nav__input"
      type="text"
      placeholder="영화를 검색해주세요"/>

      {/*유저 프로필 이미지 (우상단)*/}
      <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        className="nav__avatar"
      />
    </nav>
  );
}
