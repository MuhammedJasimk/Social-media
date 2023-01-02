import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://vibing.tk/api/',
    // baseURL: 'http://localhost:4000/api/',
    header:{
        "Content-Type":"application/json"
    }
});


const axios_two = axios.create({
    baseURL: 'https://vibing.tk/api/'
    // baseURL: 'http://localhost:4000/api/'
});



axiosInstance.interceptors.request.use(function (config) {
   let token = localStorage.getItem("token");
   config.headers["access-token"] =token;
   return config;
 });

// axiosInstance.defaults.headers.common['access-token'] = localStorage.getItem('token');

export {axiosInstance ,axios_two};  