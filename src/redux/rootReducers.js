const {combineReducers} = require('redux');
import GeneralReducer from './general/GeneralReducer';
import LoginReducer from './login/LoginReducer';
import OrderReducer from './orders/OrderReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducers = combineReducers({
  GeneralReducer,
  LoginReducer,
  OrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
export default persistedReducer;
