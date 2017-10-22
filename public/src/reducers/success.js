import {SET_SUCCESS, DELETE_SUCCESS} from '../actions';

export default function Success(state = [], action) {	
	switch(action.type) {		
		case SET_SUCCESS:
			return [
				...state,
				action.success
			]
		case DELETE_SUCCESS:
			return state.filter(success => success.id != action.id);
	}

	return state;
}