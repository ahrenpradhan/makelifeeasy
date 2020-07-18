import AuthReducer from './authreducer';
import RouteReducer from './routereducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	AuthReducer,
	// RouteReducer,
});

export default allReducers;
