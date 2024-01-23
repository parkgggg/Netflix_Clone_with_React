import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "3527c9140db2e25546a20a0d583bf0c8",
        language: "ko-KR"
    },
})

export default instance;