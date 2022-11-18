import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://neobck.azurewebsites.net/api/'
});

export default axiosConfig
