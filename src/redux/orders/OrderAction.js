import {
  CREATE_ORDER,
  DEL_MENU_ORDER,
  UPDATE_ORDER,
  EMPTY_ORDER,
} from '../TypeActions';
import {postRequest} from '../../config/AxiosMethod';
import {setLoading, set_error, set_success} from '../general/GeneralAction';

export const createOrder = (payload) => ({
  type: CREATE_ORDER,
  payload,
});

export const EmptyOrder = () => ({
  type: EMPTY_ORDER,
});

export const updateOrder = (payload) => ({
  type: UPDATE_ORDER,
  payload,
});

export const delMenuOrder = (payload) => ({
  type: DEL_MENU_ORDER,
  payload,
});

export const prosesOrder = (dataOrder) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    console.log('data Order kirim', dataOrder);
    return await postRequest(`daftar-pesanan/proses`, dataOrder)
      .then((res) => {
        dispatch(setLoading(false));
        console.log('berhasil di proses', res);
        dispatch(EmptyOrder());
        dispatch(set_success({success: true, msg: 'Berhasil !'}));
        return new Promise((resolve, reject) => {
          res.data && resolve(true);
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(set_error({error: true, msg: `${err.response.data.status}`}));
        console.log('ERROR PROSES', err);
        console.log('ERROR PROSES REQUEST', err.request);
        console.log('ERROR PROSES RESPONSE', err.response);
        return new Promise((resolve, reject) => {
          err && reject(true);
        });
      });
  };
};
export const updateMenu = (menu) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    return await postRequest(`daftar-pesanan/update`, menu)
      .then((res) => {
        dispatch(setLoading(false));
        console.log('berhasil di proses menu', res);
        dispatch(set_success({success: true, msg: 'Berhasil !'}));
        return new Promise((resolve, reject) => {
          res.data ? resolve(true) : reject(false);
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(set_error({error: true, msg: 'gagal menyimpan !'}));
        return new Promise((resolve, reject) => {
          err && reject(err);
        });
        console.log('ERROR PROSES', err);
        console.log('ERROR PROSES REQUEST', err.request);
        console.log('ERROR PROSES RESPONSE', err.response);
      });
  };
};
