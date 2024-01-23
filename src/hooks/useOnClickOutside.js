//모달 외부를 클릭하면 모달 창 사라지게 하는 hook
//순서 -> 
//1. 모달 창 밖을 클릭하는 지, 내부를 클릭하는지 구분
//# useOnClickOutside hooks를 생성
//2. 모달 창 밖을 클릭하면 CallBack 함수를 호출하는 Event 등록
//3. Callback 함수 안에서 모달 닫아주기

import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    //이벤트 리스너 선언(이벤트 종류는 리스너 할당 코드 위에 있음)
    const listener = (event) => {
        // DOM이 생성되지 않았거나(모달 창이 떠있지 않거나),
        // 이벤트 발생 위치가 모달 창 내부일 때(모달 창 내부 클릭/터치 했을 떄)
        // 나띵 해픈
      if (!ref.current || ref.current.contains(event.target)) return;
      //위와 반대 상황(모달 창 떠있고, 외부 클릭)일 때는, 핸들러 호출
      handler(event);
    };


    //엘리멘트 위에서 마우스를 누르는 이벤트 & 모바일에서 해당 엘리멘트를 터치하는 이벤트 
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
    //컴포넌트 unmount시 이벤트 리스너 제거
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
