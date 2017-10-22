import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import Admins from './admin';
import Auth from './auth';
import Movies from './movie';
import Halls from './hall';
import Cashiers from './cashier';
import Success from './success';
import Errors from './error';

export default combineReducers({	
	Admins,
	Auth,
	Movies,
	Halls,
	Cashiers,
	Success,
	Errors,	
	routing: routeReducer
});