const {
  SET_LOADING,
  SET_ERROR,
  SET_RESET,
  SET_ERROR_REQUEST,
  SET_SUCCESS,
} = require('../TypeActions');

const GeneralState = {
  isLoading: false,
  error: false,
  msg: null,
  errorRequest: false,
  success: false,
};

const GeneralReducer = (state = GeneralState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        msg: action.payload.msg,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        msg: action.payload.msg,
      };
    case SET_ERROR_REQUEST:
      return {
        ...state,
        errorRequest: action.payload.errorRequest,
        msg: action.payload.msg,
      };
    case SET_RESET:
      return {
        ...state,
        errorRequest: false,
        isLoading: false,
        error: false,
        msg: null,
      };
    default:
      return state;
  }
};

export default GeneralReducer;
