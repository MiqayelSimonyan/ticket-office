import {SET_ERROR, DELETE_ERROR, DELETE_ERRORS} from '../actions';

export default function Errors(state = [], action) {	
	switch(action.type) {
		case SET_ERROR:
			return [
				...state,
				action.error
			]
		case DELETE_ERROR:
			return state.filter(error => error.id != action.id);
		case DELETE_ERRORS:
			return []
	}

	return state;
}