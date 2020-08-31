import {SET_TOKEN, SET_PROFILE, LOGOUT} from '../TypeActions';
import {getRequest, postRequest} from '../../config/AxiosMethod';
import {setLoading, set_error, setErrorRequest} from '../general/GeneralAction';

export const logout = () => ({
  type: LOGOUT,
});

export const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const login_post = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    postRequest(`post`, data)
      .then((res) => {
        if (res.data.level !== 'kasir') {
          dispatch(setToken({token: null, isLogin: false}));
          dispatch(setLoading(false));
          dispatch(
            set_error({
              msg: 'Maaf anda tidak memilik akses login',
              error: true,
            }),
          );
        } else {
          dispatch(setToken({token: res.data.token, isLogin: true}));
          dispatch(get_profile());
        }
      })
      .catch((err) => {
        console.log('ERROR LOGIN', err.request);
        if (err.request.status === 401) {
          dispatch(set_error({msg: 'Anda tidak terdaftar', error: true}));
        } else {
          dispatch(
            setErrorRequest({
              msg: 'Periksa Koneksi !',
              errorRequest: true,
            }),
          );
        }
        dispatch(setLoading(false));
      });
  };
};

export const get_profile = () => {
  return (dispatch) => {
    getRequest('user')
      .then((res) => {
        dispatch(setProfile(res.data));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log('ERROR SET PROFILE', err);
        dispatch(set_error({msg: 'Error get profle', error: true}));
      });
  };
};

export const get_logout = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getRequest('logout')
      .then((res) => {
        dispatch(logout());
        dispatch(setToken({token: null, isLogin: false}));
      })
      .catch((err) => {
        console.log('ERROR LOGOUT', err);
        dispatch(setLoading(false));
        dispatch(set_error({msg: 'Error Logout', error: true}));
      });
  };
};
