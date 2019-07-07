import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rpg-backend.herokuapp.com/'
})

export default api;