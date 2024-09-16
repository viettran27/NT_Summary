import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.0.0.252:8000/'
});

instance.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


export default instance