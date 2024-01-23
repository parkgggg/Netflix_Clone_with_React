///검색창에 입력할 때, debouncing을 해주지 않으면 모든 타이핑 하나하나마다 쿼리를 요청하게 됨
///debounce 함수를 만들어 지정된 시간이 될 때까지 keyup 이벤트 처리를 지연시킴
//결과적으로 UI 부분의 코드가 모든 이벤트를 처리할 필요가 없어져, 서버에 전송되는 API 호출 수도
//크게 줄어듬(입력된 모든 문자를 처리할 필요x => 성능 저하 x, 백엔드 로드 수 down)

import {useState, useEffect} from 'react'

export const useDebounce = (value, delay) => {

    //디바운싱할 값(검색어)
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(
        () => {
            //delay 이후 디바운스 state 업데이트
            const handler = setTimeout(() =>{
                setDebounceValue(value);
            }, delay)
        
        return () => {//컴포넌트가 unmount 되거나
            //value, delay state가 변할 때, timeout을 취소시키고 재시작한다.
            clearTimeout(handler);
        }
    }, [value, delay])

    return debounceValue;
}