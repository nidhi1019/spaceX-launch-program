import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://api.spaceXdata.com/v3/launches'
});
axiosInstance.defaults.params = {limit: 100};
export default axiosInstance;