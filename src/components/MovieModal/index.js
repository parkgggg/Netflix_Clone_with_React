import React, { useRef } from "react";
import "./MovieModal.css"
import useOnClickOutside from "../../hooks/useOnClickOutside";

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  //원하는 DOM을 특정해서 조작하기 위해 useRef 훅 사용
  //JS의 기존 DOM selector들과 사용 목적은 같다.
  //useRef로 Ref객체를 생성해주고, 원하는 DOM(태그)에 ref 속성 값으로 객체를 넣어주면 끝
  //이후는 객체명.current이 해당 DOM을 가리킴
  const ref = useRef();

  
  useOnClickOutside(ref, () => {
    //모달 외부 클릭 시 호출될 함수로 setModalOpen(false) 전달
    setModalOpen(false);
  })

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          {/* x 누르면 모달 사라지도록 */}
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview"> {overview} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
