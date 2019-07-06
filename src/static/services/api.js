import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rpg-app007.herokuapp.com/'
})

export default api;