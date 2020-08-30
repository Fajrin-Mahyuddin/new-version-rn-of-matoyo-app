import {
  SET_ERROR,
  SET_LOADING,
  SET_RESET,
  SET_ERROR_REQUEST,
  SET_SUCCESS,
} from '../TypeActions';

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setSuccess = (payload) => ({
  type: SET_SUCCESS,
  payload,
});

export const getReset = () => ({
  type: SET_RESET,
});

export const setErrorRequest = (payload) => ({
  type: SET_ERROR_REQUEST,
  payload,
});

export const set_error = (data) => {
  return (dispatch) => {
    dispatch(setError(data));
    setTimeout(() => {
      dispatch(setError({msg: null, error: false}));
    }, 5000);
  };
};

export const set_success = (data) => {
  return (dispatch) => {
    dispatch(setSuccess(data));
    setTimeout(() => {
      dispatch(setSuccess({msg: null, success: false}));
    }, 5000);
  };
};
