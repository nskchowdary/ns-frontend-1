import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://neobck.azurewebsites.net/'
});

export default axiosConfig
