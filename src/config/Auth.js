import {setTokenToAxios} from './AxiosMethod';
const {default: store} = require('../redux/store');

class Auth {
  constructor() {
    this.globalData = store.getState();
  }
  setTokenToHeaders = () => {
    console.log('auth jalan');
    setTokenToAxios();
  };
  getToken() {
    return store.getState().LoginReducer.token;
  }
  getStatusLogin() {
    return this.globalData.LoginReducer.isLogin;
  }
}
export default new Auth();
