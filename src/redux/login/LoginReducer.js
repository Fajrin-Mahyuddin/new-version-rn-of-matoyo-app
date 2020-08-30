const {SET_TOKEN, SET_PROFILE, LOGOUT} = require('../TypeActions');

const globalState = {
  user: {
    id: 0,
    name: null,
    username: null,
    level: null,
    outlet: null,
  },
  token: null,
  isLogin: false,
};

const LoginReducer = (state = globalState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          username: action.payload.username,
          level: action.payload.level,
          outlet: action.payload.get_outlet,
        },
        isLogin: true,
      };
    case SET_TOKEN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          id: 0,
          name: null,
          username: null,
          level: null,
        },
      };

    default:
      return state;
  }
};

export default LoginReducer;
