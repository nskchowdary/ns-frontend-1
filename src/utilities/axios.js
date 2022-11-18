import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://neonodemongo-env.eba-kn38mu2w.us-east-2.elasticbeanstalk.com/api/'
});

export default axiosConfig