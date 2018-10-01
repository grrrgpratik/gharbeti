import { combineReducers } from 'redux';
import auth from './auth_reducer';
import rooms from './rooms'


export default combineReducers({
    rooms,
});