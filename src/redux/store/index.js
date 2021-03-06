const {createStore, applyMiddleware} = require('redux');
// const {default: rootReducers} = require('../rootReducers');
import thunk from 'redux-thunk';
import persistReducer from '../rootReducers';
// import rootReducers from '../rootReducers';

const store = createStore(persistReducer, applyMiddleware(thunk));
export default store;
