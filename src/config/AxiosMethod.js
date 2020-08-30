import store from '../redux/store';
import Auth from './Auth';

const {default: Axios} = require('axios');

// export const MainUrl = 'http://192.168.43.124/pabalu_api/public/api/';
// export const FileUrl = 'http://192.168.43.124/pabalu_api/public/';

// export const MainUrl = 'http://matoyo.elektro-untad.com/public/api/';
// export const FileUrl = 'http://matoyo.elektro-untad.com/public/';

export const MainUrl = 'http://192.168.43.156/pabalu_api/public/api/';
export const FileUrl = 'http://192.168.43.156/pabalu_api/public/';
const instance = Axios.create({
  baseURL: MainUrl,
  timeout: 9000,
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json',
  },
});

// let tokenOut = store.getState().LoginReducer.token;

export const setTokenToAxios = () => {
  let token = store.getState().LoginReducer.token;
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // tokenOut = token;
  return store.getState().LoginReducer.isLogin;
};

// instance.defaults.headers.common['Authorization'] = `Bearer ${tokenOut}`;
// console.log('set Token awal', tokenOut);

export const getRequest = (url) => {
  setTokenToAxios();
  return instance.get(url);
};

export const postRequest = (url, data) => {
  setTokenToAxios();
  return instance.post(url, data);
};
