import axios from 'axios';

const apiBackendEducativo= axios.create({
    baseURL:'http://localhost:7072/api',
    headers:{
        'Content-Type': 'application/json'
    }
});

apiBackendEducativo.interceptors.request.use((config) => {
    const token = localStorage.getItem('mi_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default apiBackendEducativo;