import {createStore} from 'redux';
import AuthReducer from '../reducers/authreducer';

let AuthStore = createStore(AuthReducer)