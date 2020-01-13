import axios from 'axios'

const momAxios = axios.create({
    baseURL: 'http://localhost:8888'
});

export default momAxios;