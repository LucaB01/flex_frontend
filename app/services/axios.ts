/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../helpers/Config';

const baseUrl = Config.API_URL;
console.log(baseUrl);
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(config => {
  return new Promise(resolve => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token && config.headers) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          config.headers.Authorization = 'Bearer ' + token;
        }
        resolve(config);
      })
      .catch(err => {
        console.log(err);
        resolve(config);
      });
  });
});

export default instance;
